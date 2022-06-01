let teacherViewport : JQuery<HTMLDivElement>

let endCallTeacherBtn : JQuery<HTMLDivElement>;
let videoTeacherBtn : JQuery<HTMLDivElement>;
let audioTeacherBtn : JQuery<HTMLDivElement>;

$(function () {
	teacherViewport = $("div#teacher_client.content div.main-panel div.general-panel");

	endCallTeacherBtn = $("div#teacher_client div.end-call-btn");
	videoTeacherBtn = $("div#teacher_client div.video-btn");
	audioTeacherBtn = $("div#teacher_client div.mic-btn");

	endCallTeacherBtn.on("click", async function () {
		SetLoad(true);

		if (roomID != "") {
			// @ts-ignore
			const roomDoc = firestore.collection('rooms').doc(roomIdInput);
			const calleeCandidates = await roomDoc.collection('calleeCandidates').get();
			calleeCandidates.forEach(async (candidate: { ref: { delete: () => any; }; }) => {
				await candidate.ref.delete();
			});
			const callerCandidates = await roomDoc.collection('callerCandidates').get();
			callerCandidates.forEach(async (candidate: { ref: { delete: () => any; }; }) => {
				await candidate.ref.delete();
			});
			await roomDoc.delete();
		}

		ChangeView(VIEWS.HOME);
	});
});

function CreateStudentView() {
	let viewport : JQuery<HTMLDivElement> = $("<div class='viewport'>");
	teacherViewport.append(viewport);

	let screenContainer : JQuery<HTMLDivElement> = $("<div class='screen'>");
	viewport.append(screenContainer);

	let screen : JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	screenContainer.append(screen);

	let cameraContainer : JQuery<HTMLDivElement> = $("<div class='camera'>");
	screenContainer.append(cameraContainer);

	let camera : JQuery<HTMLVideoElement> = $("<video autoplay playsinline>");
	cameraContainer.append(camera);

	let mic : JQuery<HTMLVideoElement> = $("<audio autoplay>");
	viewport.append(mic);

	return {mic: mic[0], camera: camera[0], screen: screen[0] };
}