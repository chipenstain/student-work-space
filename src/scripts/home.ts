let teacherNameInput: JQuery<HTMLInputElement>;
let studentNameInput: JQuery<HTMLInputElement>;
let roomIdInput: JQuery<HTMLInputElement>;

$(function () {
	teacherNameInput = $("#teacher-name");
	studentNameInput = $("#student-name");
	roomIdInput = $("#roomid");

	$("div#teacher-mode").on("click", () => {
		if (teacherNameInput.val() !== "")
		{
			SetLoad(true);

			roomDoc = firestore.collection("rooms").doc();
			roomID = roomDoc.id;

			clientDoc = roomDoc.collection("teacher").doc();

			let peerRef = new Peer(ClientType.TEACHER);

			roomDoc.collection("students").onSnapshot(async (snapshot: { [x: string]: any; data: () => any; }) => {
				snapshot.docChanges().forEach(async (change: { type: string; doc: { data: () => { (): any; new(): any; desc: RTCSessionDescriptionInit; }; id: string; }; }) => {
					if (change.type === "added" || change.type === "modified") {
						let peer: Peer = peers[peers.length - 1];
						if (!peer.connection.currentRemoteDescription && change.doc.data()?.desc) {
							await peer.SetRemoteDescription(change.doc.data().desc, change.doc);

							firestore.collection("rooms/" + roomID + "/students/" + change.doc.id + "/candidates").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
								snapshot.docChanges().forEach((change: { type: string; doc: { data: () => any; }; }) => {
									if (change.type === "added") {
										console.log("Got Remote ICE");
										peer.connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
									}
								});
							});
							console.log("Got new connect");
							peers.push(new Peer(ClientType.TEACHER));
						}
					}
				});
			});

			peers.push(peerRef);
			setTimeout(() => {
				ChangeView(VIEWS.TEACHER_CLIENT);
			}, 3000);
		}
	});

	$("div#student-mode").on("click", () => {
		if (studentNameInput.val() !== "" && roomIdInput.val() !== "")
		{
			SetLoad(true);

			roomID = roomIdInput.val();
			roomDoc = firestore.collection("rooms").doc(roomID);

			clientDoc = roomDoc.collection("students").doc();

			peers.push(new Peer(ClientType.STUDENT));

			setTimeout(() => {
				ChangeView(VIEWS.STUDENT_CLIENT);
			}, 3000);
		}
	});
});