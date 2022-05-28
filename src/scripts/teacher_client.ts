let teacherViewport : JQuery<HTMLDivElement>

let endCallTeacherBtn : JQuery<HTMLDivElement>;
let videoTeacherBtn : JQuery<HTMLDivElement>;
let audioTeacherBtn : JQuery<HTMLDivElement>;

$(function(){
	teacherViewport = $("div#teacher_client.content div.main-panel div.general-panel");

	endCallTeacherBtn =  $("div#teacher_client div.end-call-btn");
	videoTeacherBtn =  $("div#teacher_client div.video-btn");
	audioTeacherBtn =  $("div#teacher_client div.mic-btn");

	endCallTeacherBtn.on("click", async function(){
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
	videoTeacherBtn.on("click", async async => {
		videoStream = await navigator.mediaDevices.getUserMedia({ video: true});
		PeerConnection.addTrack(videoStream.getVideoTracks()[0], videoStream);
	});

	audioTeacherBtn.on("click", async async => {
		audioStream = await navigator.mediaDevices.getUserMedia({ audio: true});
		PeerConnection.addTrack(audioStream.getAudioTracks()[0], audioStream);
	});
});

function CreateStudentView() {
	let camera : JQuery<HTMLVideoElement> = $("<video width=360px height=240px>");
	let screen : JQuery<HTMLVideoElement> = $("<video width=360px height=240px>");
	let mic : JQuery<HTMLVideoElement> = $("<audio>");
	teacherViewport.append(camera);
	teacherViewport.append(screen);
	teacherViewport.append(mic);
}