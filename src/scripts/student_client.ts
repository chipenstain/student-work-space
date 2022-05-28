let studentViewport: JQuery<HTMLDivElement>

let endCallStudentBtn: JQuery<HTMLDivElement>;
let videoStudentBtn: JQuery<HTMLDivElement>;
let audioStudentBtn: JQuery<HTMLDivElement>;

$(function () {
	studentViewport = $("div#student_client.content div.main-panel div.general-panel");

	endCallStudentBtn = $("div#student_client div.end-call-btn");
	videoStudentBtn = $("div#student_client div.video-btn");
	audioStudentBtn = $("div#student_client div.mic-btn");

	endCallStudentBtn.on("click", async function () {
		SetLoad(true);

		PeerConnection.close();

		if (roomID != "") {
			// @ts-ignore
			const firestore = firebase.firestore();
			const roomDoc = firestore.collection('rooms').doc(roomId);
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

	remoteStackStreams = new MediaStream();
	videoStudentBtn.on("click", async async => {
		videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
		PeerConnection.addTrack(videoStream.getVideoTracks()[0], videoStream);
	});

	audioStudentBtn.on("click", async async => {
		audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		PeerConnection.addTrack(audioStream.getAudioTracks()[0], audioStream);
	});
});

function CreateTeacherView() {
	let camera: JQuery<HTMLVideoElement> = $("<video width=360px height=240px>");
	let camera2: JQuery<HTMLVideoElement> = $("<video width=360px height=240px>");
	let mic: JQuery<HTMLVideoElement> = $("<audio>");
	studentViewport.append(camera);
	studentViewport.append(camera2);
	studentViewport.append(mic);
}