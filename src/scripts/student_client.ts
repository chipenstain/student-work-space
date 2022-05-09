let endCallStudentBtn : JQuery<HTMLDivElement>;
let videoStudentBtn : JQuery<HTMLDivElement>;
let audioStudentBtn : JQuery<HTMLDivElement>;

$(function(){
	endCallStudentBtn =  $("div#student_client div.end-call-btn");
	videoStudentBtn =  $("div#student_client div.video-btn");
	audioStudentBtn =  $("div#student_client div.mic-btn");

	endCallStudentBtn.on("click", function(){
		ChangeView(VIEWS.HOME);
	});

	videoStudentBtn.on("click", async ()=>{
		if (!videoState) {
			videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
			videoSender = PeerConnection.addTrack(videoStream.getVideoTracks()[0]);
		}
		else {
			PeerConnection.removeTrack(videoSender as RTCRtpSender);
			videoSender = null;
		}
		videoState = !videoState;
	});

	audioStudentBtn.on("click", async ()=>{
		if (!audioState) {
				audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
				audioSender = PeerConnection.addTrack(audioStream.getAudioTracks()[0]);
		}
		else {
			PeerConnection.removeTrack(audioSender as RTCRtpSender);
			audioSender = null;
		}
		audioState = !audioState;
	});

	PeerConnection.ontrack = (event) => {
		event.streams.forEach((stream)=>{
			stream.getTracks().forEach((track) => {
				//TODO: create teacher view
			});
		})
	  };
});