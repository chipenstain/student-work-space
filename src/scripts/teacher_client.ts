let teacherViewport: JQuery<HTMLDivElement>
let tasksView: JQuery<HTMLDivElement>

$(function () {
	teacherViewport = $("div#teacher_client.content div.main-panel div.general-panel");
	tasksView = $("div#teacher_client.content div#tasks-container");

	$("div#teacher_client div.end-call-btn").on("click", async async => {
		Disconnect(ClientType.TEACHER);
	});

	$("div#teacher_client div.video-btn").on("click", () => {

	});

	$("div#teacher_client div.mic-btn").on("click", () => {

	});

	$("div#teacher_client div.standart-mode").on("click", () => {

	});

	$("div#teacher_client div.lection-mode").on("click", () => {

	});

	$("div#teacher_client div.tasks").on("click", () => {
		tasksView.css("display", "flex").show();
	});

	$("div#teacher_client div#tasks-container div.btn.enabled-btn").on("click", () => {
		roomDoc.update({ theme: $("div#teacher_client div#tasks-container div.theme a input").val() });
		tasksView.hide();
	});
});

function CreateStudentView(name: string) {
	let viewport: JQuery<HTMLDivElement> = $("<div class='viewport'>");
	teacherViewport.append(viewport);

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