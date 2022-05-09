
const firebaseConfig = {
apiKey: "AIzaSyB7mBXTD7lY7s-cRBBfixAjSp5zBSrlDl8",
authDomain: "studentworkspace-21fb2.firebaseapp.com",
projectId: "studentworkspace-21fb2",
storageBucket: "studentworkspace-21fb2.appspot.com",
messagingSenderId: "771149651600",
appId: "1:771149651600:web:e575c23e589687d44dc215"
};

firebase.initializeApp(firebaseConfig);


const firestore =  firebase.firestore();
var videoState = false;
var video2State = false;
var audioState = false;
var videoStream;
var video2Stream;
var audioStream;
var videoSender;
var video2Sender;
var audioSender;
var servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};
var PeerConnection = new RTCPeerConnection(servers);


var VIEWS;
(function (VIEWS) {
    VIEWS["HOME"] = "home";
    VIEWS["STUDENT_CLIENT"] = "student_client";
    VIEWS["TEACHER_CLIENT"] = "teacher_client";
})(VIEWS || (VIEWS = {}));
;
var THEMES;
(function (THEMES) {
    THEMES["DARK"] = "dark";
    THEMES["LIGHT"] = "light";
})(THEMES || (THEMES = {}));
;

let title;
let copyright;
let themeHolder;
let viewThemeHolder;

let header;
let footer;

let loadBar;
let appContainer;

let views;
let currentView;

$(function() {
	title = $("title");
	copyright = $("span#copyright");
	themeHolder = $("link#theme-holder");
	viewThemeHolder = $("link#view-theme-holder");

	header = $("header");
	footer = $("footer");

	loadBar = $("div#loading-bar");
	appContainer = $("div#app-container");

	views = $("div.content");

	SetCopyright();
	ChangeView(VIEWS.HOME);
});

function ChangeView(view) {
	switch (currentView) {
		case VIEWS.HOME:
			$(views[0]).hide();
			break;
		case VIEWS.STUDENT_CLIENT:
			$(views[1]).hide();
			break;
		case VIEWS.TEACHER_CLIENT:
			$(views[2]).hide();
			break;
	}

	switch (view) {
		case VIEWS.HOME:
			$(views[0]).css("display", "flex").show();
			header.css("display", "flex").show();;
			footer.css("display", "flex").show();
			title.text("SWS | Student Work Space");
			break;
		case VIEWS.STUDENT_CLIENT:
			$(views[1]).css("display", "flex").show();
			header.hide();
			footer.hide();
			title.text("SWS | Student client");
			break;
		case VIEWS.TEACHER_CLIENT:
			$(views[2]).css("display", "flex").show();
			header.hide();
			footer.hide();
			title.text("SWS | Teacher client");
			break;
	}

	ApplyViewTheme(view);
	currentView = view;
	SetLoad(false);
}

function ApplyViewTheme(view) {
	viewThemeHolder.attr("href", "styles/" + view + ".min.css");
}

function ChangeTheme(theme) {
	themeHolder.attr("href", "styles/themes/" + theme + ".min.css");
}

function SetLoad(active){
	if (active) {
		loadBar.show();
	}
	else {
		loadBar.hide();
	}
}

function SetCopyright()
{
	let currentYear = new Date().getFullYear();
	let copyTxt = "&#169;chipenstain 2022" + ((currentYear = 2022) ? "" : (" - " + currentYear.toString()));
	copyright.html(copyTxt);
}





$(function(){
	$("div#teacher-mode").on("click", async ()=>{
		SetLoad(true);

		// @ts-ignore
		const roomDoc = firestore.collection('rooms').doc();
		const teacherCandidates = roomDoc.collection('teacherCandidates');
		const studentCandidates = roomDoc.collection('studentCandidates');

		alert(roomDoc.id);

		PeerConnection.onicecandidate = event => {
			event.candidate && teacherCandidates.add(event.candidate.toJSON());
		};

		const offerDescription = await PeerConnection.createOffer();

		PeerConnection.setLocalDescription(offerDescription);

		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		await roomDoc.set({offer});

		roomDoc.onSnapshot((snapshot) => {
			const data = snapshot.data();
			if (!PeerConnection.currentRemoteDescription && data?.answer) {
				const answerDescription = new RTCSessionDescription(data.answer);
				PeerConnection.setRemoteDescription(answerDescription);
			}
		});

		studentCandidates.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					const candidate = new RTCIceCandidate(change.doc.data());
					PeerConnection.addIceCandidate(candidate);
				}
			});
		});

		ChangeView(VIEWS.TEACHER_CLIENT);
	});
	$("div#student-mode").on("click", async () => {
		SetLoad(true);

		const roomID = $("#call-key").val();
		const roomDoc = firestore.collection('rooms').doc(roomID);
		const teacherCandidates = roomDoc.collection('teacherCandidates');
		const studentCandidates = roomDoc.collection('studentCandidates');

		PeerConnection.onicecandidate = event => {
			event.candidate && studentCandidates.add(event.candidate.toJSON());
		};

		const roomData = (await roomDoc.get()).data();

		const offerDescription = roomData.offer;
		await PeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

		const answerDescription = await PeerConnection.createAnswer();
		await PeerConnection.setLocalDescription(answerDescription);

		const answer = {
			type: answerDescription.type,
			sdp: answerDescription.sdp,
		};

		await roomDoc.update({ answer });

		teacherCandidates.onSnapshot((snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					let data = change.doc.data();
					PeerConnection.addIceCandidate(new RTCIceCandidate(data));
				}
			})
		})

		ChangeView(VIEWS.STUDENT_CLIENT);
	});
});




let endCallTeacherBtn;
let videoTeacherBtn;
let audioTeacherBtn;

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

function CreateStudnetView(name, stream) {

}




let endCallStudentBtn;
let videoStudentBtn;
let audioStudentBtn;

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
			PeerConnection.removeTrack(videoSender);
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
			PeerConnection.removeTrack(audioSender);
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