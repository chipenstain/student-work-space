let studentViewport: JQuery<HTMLDivElement>

$(function () {
	studentViewport = $("div#student_client.content div.main-panel div.general-panel");

	$("div#student_client div.end-call-btn").on("click", async async => {
		SetLoad(true);

		peers.forEach((peer: Peer) => {
			peer.connection.close();
			peer.micStream.getTracks().forEach((track) => {
				track.stop();
			});
			peer.cameraStream.getTracks().forEach((track) => {
				track.stop();
			});
			peer.screenStream.getTracks().forEach((track) => {
				track.stop();
			});
		});
		peers = [];

		await clientDoc.delete();

		ChangeView(VIEWS.HOME);
	});

	$("div#student_client div.video-btn").on("click", () => {

	});

	$("div#student_client div.mic-btn").on("click", () => {

	});

	$("div#student_client div.ask").on("click", () => {

	});

	$("div#student_client div.files").on("click", () => {

	});

	$("div#student_client div.send").on("click", () => {

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

	return { mic: mic[0], camera: camera[0], screen: screen[0] };
}