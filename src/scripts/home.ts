let teacherNameInput: JQuery<HTMLInputElement>;
let studentNameInput: JQuery<HTMLInputElement>;
let roomIdInput: JQuery<HTMLInputElement>;

$(function () {
	teacherNameInput = $("#teacher-name");
	studentNameInput = $("#student-name");
	roomIdInput = $("#roomid");

	$("div#teacher-mode").on("click", () => {
		if (teacherNameInput.val() !== "") {
			SetLoad(true);

			clientName = teacherNameInput.val();
			roomDoc = firestore.collection("rooms").doc();
			roomDoc.set({ theme: "" });
			roomID = roomDoc.id;

			$("div#teacher_client span.current-room").text(roomID as string);
			$("div#teacher_client span.current-room").on("click", ()=>{
				navigator.clipboard.writeText($("div#teacher_client span.current-room").text());
			});

			clientDoc = roomDoc.collection("teacher").doc();

			const peerRef = new Peer(ClientType.TEACHER);

			roomDoc.collection("students").onSnapshot(async (snapshot: { [x: string]: any; data: () => any; }) => {
				snapshot.docChanges().forEach(async (change: { type: string; doc: { data: () => { (): any; new(): any; desc: RTCSessionDescriptionInit; }; id: string; }; }) => {
					if (change.type === "added" || change.type === "modified") {
						const peer: Peer = peers[peers.length - 1];
						if (!peer.connection.currentRemoteDescription && change.doc.data()?.desc) {
							await peer.SetRemoteDescription(change.doc.data().desc, change.doc.data().name);
							peer.id = change.doc.id;

							peers.forEach((peer: Peer) => {
								if (peers.length <= 1) {
									peer.viewport?.container.addClass("size1");
									if (peer.viewport?.container.hasClass("size2")) {
										peer.viewport?.container.removeClass("size2");
									}
									else {
										peer.viewport?.container.removeClass("size3");
									}
								}
								else if (peers.length <= 4) {
									peer.viewport?.container.addClass("size2");
									if (peer.viewport?.container.hasClass("size1")) {
										peer.viewport?.container.removeClass("size1");
									}
									else {
										peer.viewport?.container.removeClass("size3");
									}
								}
								else {
									peer.viewport?.container.addClass("size3");
									if (peer.viewport?.container.hasClass("size1")) {
										peer.viewport?.container.removeClass("size1");
									}
									else {
										peer.viewport?.container.removeClass("size2");
									}
								}
							})

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
					else if (change.type === "removed") {
						const peer = peers.splice(peers.findIndex(x => x.id == change.doc.id), 1)[0];

						if (peer.connection) {
							peer.connection.close();
						}

						peer.micStream.getTracks().forEach((track) => {
							track.stop();
						});
						peer.cameraStream.getTracks().forEach((track) => {
							track.stop();
						});
						peer.screenStream.getTracks().forEach((track) => {
							track.stop();
						});
						peer.viewport?.container.remove();

						firestore.collection("rooms/" + roomID + "/students/" + change.doc.id + "/candidates").onSnapshot(() => { });
					}
				});
			});

			roomDoc.collection("query").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						let data: Array<string> = new Array();
						if (change.doc.data().file !== "")
						{
							change.doc.ref.collection("data").get().then((snapshot: any[]) => {
								snapshot.forEach((doc) => {
									data.push(doc.data().data);
								});
								CreateQueryElement(change.doc.data().name, change.doc.id, (change.doc.data().file !== ""), change.doc.data().file, data);
							});
						}
						else {
							CreateQueryElement(change.doc.data().name, change.doc.id, (change.doc.data().file !== ""), change.doc.data().file);
						}
					}
				});
			});

			peers.push(peerRef);

			teacherNameInput.val("");
			studentNameInput.val("");
			roomIdInput.val("");

			setTimeout(() => {
				ChangeView(VIEWS.TEACHER_CLIENT);
			}, 3000);
		}
	});

	$("div#student-mode").on("click", () => {
		if (studentNameInput.val() !== "" && roomIdInput.val() !== "") {

			roomID = roomIdInput.val();
			clientName = studentNameInput.val();
			roomDoc = firestore.collection("rooms").doc(roomID);

			roomDoc.get().then(async (doc: { exists: any; }) => {
				if (doc.exists) {
					SetLoad(true);

					$("div#student_client span.current-room").text(roomID as string);
					$("div#teacher_client span.current-room").on("click", ()=>{
						navigator.clipboard.writeText($("div#teacher_client span.current-room").text());
					});
					$("div#student_client div.theme div.theme").text((await (roomDoc.get())).data().theme);

					clientDoc = roomDoc.collection("students").doc();

					roomDoc.onSnapshot((snapshot: { exists: any; data: () => { (): any; new(): any; theme: string | number | boolean | ((this: HTMLElement, index: number, text: string) => string | number | boolean); }; }) => {
						if (snapshot.exists) {
							$("div#student_client div.theme div.theme").text(snapshot.data().theme);
						}
					});

					firestore.collection("rooms").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
						snapshot.docChanges().forEach((change) => {
							if (change.type === "removed") {
								if (change.doc.id === roomID) {
									Disconnect(ClientType.STUDENT);
								}
							}
						});
					});

					roomDoc.collection("tasks").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
						snapshot.docChanges().forEach((change) => {
							if (change.type === "added") {
								CreateTaskElement(change.doc.data().data);
							}
							else if (change.type === "removed") {

							}
						});
					});

					roomDoc.collection("files").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
						snapshot.docChanges().forEach((change) => {
							if (change.type === "added") {
								CreateFileElement(change.doc.data().data, change.doc.data().data);
							}
							else if (change.type === "removed") {

							}
						});
					});

					roomDoc.collection("links").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
						snapshot.docChanges().forEach((change) => {
							if (change.type === "added") {
								CreateLinkElement(change.doc.data().data);
							}
							else if (change.type === "removed") {

							}
						});
					});

					peers.push(new Peer(ClientType.STUDENT));

					teacherNameInput.val("");
					studentNameInput.val("");
					roomIdInput.val("");

					setTimeout(() => {
						ChangeView(VIEWS.STUDENT_CLIENT);
					}, 3000);
				} else {
					roomID = undefined;
					roomDoc = null;

					roomIdInput.val("not valid");
				}
			});
		}
	});
});