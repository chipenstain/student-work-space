const firebaseConfig = {
	apiKey: "AIzaSyB7mBXTD7lY7s-cRBBfixAjSp5zBSrlDl8",
	authDomain: "studentworkspace-21fb2.firebaseapp.com",
	projectId: "studentworkspace-21fb2",
	storageBucket: "studentworkspace-21fb2.appspot.com",
	messagingSenderId: "771149651600",
	appId: "1:771149651600:web:e575c23e589687d44dc215"
};

const servers = {
	iceServers: [
		{
			urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
		},
	],
	iceCandidatePoolSize: 10,
};

let roomID: string;

let videoState: boolean = false; //webcam state
let video2State: boolean = false; //second camera state
let audioState: boolean = false; //mic state

let videoStream: MediaStream; //webcam stream
let video2Stream: MediaStream; //second camera/screen stream
let audioStream: MediaStream; //mic stream

let remoteStackStreams: MediaStream;

let videoSender: RTCRtpSender | null; //webcam sender
let video2Sender: RTCRtpSender | null; //second camera/screen sender
let audioSender: RTCRtpSender | null; //mic sender

let PeerConnection: RTCPeerConnection;
//let PeerConnections : Array<RTCPeerConnection>;

$(function () {
	// @ts-ignore
	firebase.initializeApp(firebaseConfig);
	PeerConnection = new RTCPeerConnection(servers);
});