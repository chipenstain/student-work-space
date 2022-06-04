let studentViewport: JQuery<HTMLDivElement>;
let sendTaskView: JQuery<HTMLDivElement>;
let filesView: JQuery<HTMLDivElement>;

let fileInput: JQuery<HTMLInputElement>;

let tasksHolder: JQuery<HTMLDivElement>;
let linksHolder: JQuery<HTMLDivElement>;
let filesHolder: JQuery<HTMLDivElement>;

$(function () {
	studentViewport = $("div#student_client.content div.main-panel div.general-panel");
	sendTaskView = $("div#student_client.content div#sendtask-container");
	filesView = $("div#student_client.content div#files-container");
	fileInput = $("div#student_client.content input#sendtaskinput");

	tasksHolder = $("div#student_client.content div.query-list.tasks div.tasks");
	linksHolder = $("div#student_client.content div#files-container div.links");
	filesHolder = $("div#student_client.content div#files-container div.files");

	$("div#student_client div.end-call-btn").on("click", async async => {
		Disconnect(ClientType.STUDENT);
	});

	$("div#student_client div.video-btn").on("click", () => {

	});

	$("div#student_client div.mic-btn").on("click", () => {

	});

	$("div#student_client div.ask").on("click", () => {
		roomDoc.collection("query").doc(clientDoc.id).set({ name: clientName, file: "" });
	});

	$("div#student_client div.files").on("click", () => {
		filesView.css("display", "flex").show();
	});

	$("div#student_client div.send").on("click", () => {
		sendTaskView.css("display", "flex").show();
	});

	$("div#student_client div#sendtask-container div.btn").on("click", () => {
		sendTaskView.hide();
	});

	$("div#student_client div#files-container div.btn").on("click", () => {
		filesView.hide();
	});

	fileInput.on("change", () => {
		const file = fileInput[0].files![0];
		console.log(`Loaded file is ${[file.name, file.size, file.type, file.lastModified].join(' ')}`);

		let queryDoc = roomDoc.collection("query").doc();
		queryDoc.set({ name: clientName, file: file.name });

		const fileReader: FileReader = new FileReader();

		fileReader.onload = ((e)=>{
			var arr = new Uint8Array(e.target!.result as ArrayBuffer);
			// @ts-ignore
    		var data = String.fromCharCode.apply(String, arr);
			queryDoc.collection("data").doc().set({ data });

			offset += (e.target!.result as ArrayBuffer).byteLength;
			if (offset < file.size) {
			  readSlice(offset);
			}
		});

		let offset = 0;

		const readSlice = (o: number) => {
			fileReader.readAsArrayBuffer(file.slice(offset, o + 16384));
		};
		readSlice(0);
	});
});

function CreateTeacherView(name: string) {
	let viewport: JQuery<HTMLDivElement> = $("<div class='viewport'>");
	studentViewport.append(viewport);

	let screenContainer: JQuery<HTMLDivElement> = $("<div class='screen'>");
	viewport.append(screenContainer);

	let screen: JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	screenContainer.append(screen);

	let cameraContainer: JQuery<HTMLDivElement> = $("<div class='camera'>");
	screenContainer.append(cameraContainer);

	let camera: JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	cameraContainer.append(camera);

	let mic: JQuery<HTMLVideoElement> = $("<audio autoplay>");
	viewport.append(mic);

	let nameHolder: JQuery<HTMLDivElement> = $("<div class='name'>");
	nameHolder.text(name);
	viewport.append(nameHolder);

	return { container: viewport, mic: mic[0], camera: camera[0], screen: screen[0] };
}

function CreateTaskElement(task: string) {
	const taskElement: JQuery<HTMLSpanElement> = $("<span class='btn'>");
	taskElement.text(task);
	tasksHolder.append(taskElement);
}

function CreateLinkElement(link: string) {
	const linkElement: JQuery<HTMLElement> = $("<a class='btn' target='_blank'>");
	linkElement.text(link);
	linkElement.attr("href", link);
	linksHolder.append(linkElement);
}

function CreateFileElement(fileName: string, fileData: string) {
	const fileElement: JQuery<HTMLElement> = $("<a class='btn'>");
	filesHolder.append(fileElement);
}