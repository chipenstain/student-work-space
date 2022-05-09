let endCallTeacherBtn : JQuery<HTMLDivElement>;
let videoTeacherBtn : JQuery<HTMLDivElement>;
let audioTeacherBtn : JQuery<HTMLDivElement>;

$(function(){
	endCallTeacherBtn =  $("div#teacher_client div.end-call-btn");
	videoTeacherBtn =  $("div#teacher_client div.video-btn");
	audioTeacherBtn =  $("div#teacher_client div.mic-btn");

	endCallTeacherBtn.on("click", function(){
		ChangeView(VIEWS.HOME);
	});

	PeerConnection.ontrack = (event) => {
		event.streams.forEach((stream)=>{
			stream.getTracks().forEach((track) => {
				//TODO: create student view on each stream
			});
		})
	  };
});

function CreateStudnetView(name:string, stream: MediaStream) {

}