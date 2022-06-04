let teacherViewport: JQuery<HTMLDivElement>
let tasksView: JQuery<HTMLDivElement>
let queryContainer: JQuery<HTMLDivElement>

$(function () {
	teacherViewport = $("div#teacher_client.content div.main-panel div.general-panel");
	tasksView = $("div#teacher_client.content div#tasks-container");
	queryContainer = $("div#teacher_client.content div.main-panel div.sub-panel div.query-list div.container");

	$("div#teacher_client div.end-call-btn").on("click", async async => {
		Disconnect(ClientType.TEACHER);
	});

	$("div#teacher_client div.video-btn").on("click", () => {

	});

	$("div#teacher_client div.mic-btn").on("click", () => {

	});

	$("div#teacher_client div.standart-mode").on("click", () => {
		peers.forEach(async (peer: Peer) => {
			peer.micStream.getTracks().forEach((track) => {
				track.enabled = false;
			});
			peer.cameraStream.getTracks().forEach((track) => {
				track.enabled = false;
			});
			peer.screenStream.getTracks().forEach((track) => {
				track.enabled = false;
			});
			peer.viewport?.container.css("display", "flex").show();

			if (peers.length <= 2) {
				peer.viewport?.container.addClass("size1");
				if (peer.viewport?.container.hasClass("size2")) {
					peer.viewport?.container.removeClass("size2");
				}
				else {
					peer.viewport?.container.removeClass("size3");
				}
			}
			else if (peers.length <= 5) {
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
		});
	});

	$("div#teacher_client div.lection-mode").on("click", () => {
		peers.forEach(async (peer: Peer) => {
			peer.micStream.getTracks().forEach((track) => {
				track.enabled = true;
			});
			peer.cameraStream.getTracks().forEach((track) => {
				track.enabled = true;
			});
			peer.screenStream.getTracks().forEach((track) => {
				track.enabled = true;
			});
			peer.viewport?.container.css("display", "flex").show();

			if (peers.length <= 2) {
				peer.viewport?.container.addClass("size1");
				if (peer.viewport?.container.hasClass("size2")) {
					peer.viewport?.container.removeClass("size2");
				}
				else {
					peer.viewport?.container.removeClass("size3");
				}
			}
			else if (peers.length <= 5) {
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
		});
	});

	$("div#teacher_client div.tasks").on("click", () => {
		tasksView.css("display", "flex").show();
	});

	$("div#teacher_client div#tasks-container div.btn.enabled-btn").on("click", () => {
		roomDoc.update({ theme: $("div#teacher_client div#tasks-container div.theme a input").val() });
		tasksView.hide();
	});

	$("div#teacher_client div#tasks-container div.btn.tasks").on("click", () => {
		$("div#teacher_client div#tasks-container div.tasks-container").css("display", "flex").show();
		$("div#teacher_client div#tasks-container div.files-container").hide();
		$("div#teacher_client div#tasks-container div.links-container").hide();
	});

	$("div#teacher_client div#tasks-container div.btn.files").on("click", () => {
		$("div#teacher_client div#tasks-container div.files-container").css("display", "flex").show();
		$("div#teacher_client div#tasks-container div.tasks-container").hide();
		$("div#teacher_client div#tasks-container div.links-container").hide();
	});

	$("div#teacher_client div#tasks-container div.btn.links").on("click", () => {
		$("div#teacher_client div#tasks-container div.links-container").css("display", "flex").show();
		$("div#teacher_client div#tasks-container div.tasks-container").hide();
		$("div#teacher_client div#tasks-container div.files-container").hide();
	});

	$("div#teacher_client div#tasks-container div.tasks-container div.control button").on("click", () => {
		const doc = roomDoc.collection("tasks").doc();
		doc.set({ data: ($("div#teacher_client div#tasks-container div.tasks-container div.control input").val())});

		let task = $("<div class='control'>");
		$("div#teacher_client div#tasks-container div.tasks-container div.content").append(task);
		let label = $("<span class='btn'>");
		label.text($("div#teacher_client div#tasks-container div.tasks-container div.control input").val() as string);
		task.append(label);
		let button = $("<button class='btn'>");
		button.text("X");
		button.on("click", ()=>{
			doc.delete();
			task.remove();
		})
		task.append(button);
	});

	$("div#teacher_client div#tasks-container div.files-container div.control button").on("click", () => {
		const doc = roomDoc.collection("files").doc();
		doc.set({ data: ($("div#teacher_client div#tasks-container div.files-container div.control input")[0] as HTMLInputElement).files![0].name as string});

		let file = $("<div class='control'>");
		$("div#teacher_client div#tasks-container div.files-container div.content").append(file);
		let label = $("<span class='btn'>");
		label.text(($("div#teacher_client div#tasks-container div.files-container div.control input")[0] as HTMLInputElement).files![0].name as string);
		file.append(label);
		let button = $("<button class='btn'>");
		button.text("X");
		button.on("click", ()=>{
			doc.delete();
			file.remove();
		});
		file.append(button);
	});

	$("div#teacher_client div#tasks-container div.links-container div.control button").on("click", () => {
		const doc = roomDoc.collection("links").doc();
		doc.set({ data: ($("div#teacher_client div#tasks-container div.links-container div.control input").val())});

		let link = $("<div class='control'>");
		$("div#teacher_client div#tasks-container div.links-container div.content").append(link);
		let label = $("<span class='btn'>");
		label.text($("div#teacher_client div#tasks-container div.links-container div.control input").val() as string);
		link.append(label);
		let button = $("<button class='btn'>");
		button.text("X");
		button.on("click", ()=>{
			doc.delete();
			link.remove();
		});
		link.append(button);
	});
});

function CreateStudentView(name: string) {
	const viewport: JQuery<HTMLDivElement> = $("<div class='viewport'>");
	teacherViewport.append(viewport);

	const screenContainer: JQuery<HTMLDivElement> = $("<div class='screen'>");
	viewport.append(screenContainer);

	const screen: JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	screenContainer.append(screen);

	const cameraContainer: JQuery<HTMLDivElement> = $("<div class='camera'>");
	screenContainer.append(cameraContainer);

	const camera: JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	cameraContainer.append(camera);

	const mic: JQuery<HTMLVideoElement> = $("<audio autoplay>");
	viewport.append(mic);

	const nameHolder: JQuery<HTMLDivElement> = $("<div class='name'>");
	nameHolder.text(name);
	viewport.append(nameHolder);

	return { container: viewport, mic: mic[0], camera: camera[0], screen: screen[0] };
}

function CreateQueryElement(name: string, id: string, hasFiles: boolean, fileName: string, fileData?: Array<string>) {
	const queryElement: JQuery<HTMLDivElement> = $("<div class='query-element'>");
	queryContainer.append(queryElement);

	const nameHolder: JQuery<HTMLSpanElement> = $("<span class='title'>");
	nameHolder.text(name);
	queryElement.append(nameHolder);

	const btnsContainer: JQuery<HTMLSpanElement> = $("<div>");
	queryElement.append(btnsContainer);

	const btnAnswer: JQuery<HTMLButtonElement> = $("<button class='btn'>");
	btnAnswer.text("Answer");
	btnAnswer.on("click", () => {
		peers.forEach(async (peer: Peer) => {
			if (peer.id == id) {
				peer.micStream.getTracks().forEach((track) => {
					track.enabled = true;
				});
				peer.cameraStream.getTracks().forEach((track) => {
					track.enabled = true;
				});
				peer.screenStream.getTracks().forEach((track) => {
					track.enabled = true;
				});
				peer.viewport?.container.css("display", "flex").show();

				peer.viewport?.container.addClass("size1");
				if (peer.viewport?.container.hasClass("size2")) {
					peer.viewport?.container.removeClass("size2");
				}
			}
			else {
				peer.micStream.getTracks().forEach((track) => {
					track.enabled = false;
				});
				peer.cameraStream.getTracks().forEach((track) => {
					track.enabled = false;
				});
				peer.screenStream.getTracks().forEach((track) => {
					track.enabled = false;
				});
				peer.viewport?.container.hide();
			}
		});
		roomDoc.collection("query").doc(id).delete();
		queryElement.remove();
	});
	btnsContainer.append(btnAnswer);

	if (hasFiles) {
		const fileLink: JQuery<HTMLElement> = $("<a>");

		let data: string = "";
		for (let i = 0; i < (fileData!).length; i++) {
			data += fileData![i];
		}

		var arr = new Uint8Array(data.length);
		for(var i=data.length; i--; ) {
			arr[i] = data.charCodeAt(i);
		}

		// @ts-ignore
		const received = new Blob(arr);

		fileLink.attr("download", fileName);
		fileLink.attr("href", URL.createObjectURL(received));
		fileLink.on("click", () => {
			roomDoc.collection("query").doc(id).delete();
			queryElement.remove();
		});
		btnsContainer.append(fileLink);

		const btnFile: JQuery<HTMLButtonElement> = $("<button class='btn'>");
		btnFile.text("File");
		fileLink.append(btnFile);
	}
}