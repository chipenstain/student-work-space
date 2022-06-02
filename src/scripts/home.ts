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

			let peerRef = new Peer(1, ClientType.TEACHER);
			peerRef.roomDoc.collection("students").onSnapshot(async (snapshot: { [x: string]: any; data: () => any; }) => {
				snapshot.docChanges().forEach(async (change: { type: string; doc: { data: () => { (): any; new(): any; desc: any; }; }; }) => {
					if (change.type === "added") {
						if (!peers[peers.length - 1].connection.currentRemoteDescription && change.doc.data()?.desc) {
							await peers[peers.length - 1].SetRemoteDescription(change.doc.data().desc, change.doc);
						}
						peers.push(new Peer(peers.length, ClientType.TEACHER));
					}
				});
			});

			peers.push(peerRef);
			setTimeout(() => {
				ChangeView(VIEWS.TEACHER_CLIENT);
			}, 400);
		}
	});

	$("div#student-mode").on("click", () => {
		if (studentNameInput.val() !== "" && roomIdInput.val() !== "")
		{
			SetLoad(true);
			roomID = roomIdInput.val();

			peers.push(new Peer(1, ClientType.STUDENT));

			setTimeout(() => {
				ChangeView(VIEWS.STUDENT_CLIENT);
			}, 400);
		}
	});
});