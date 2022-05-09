// @ts-ignore
const firestore = firebase.firestore();

let videoState : boolean = false; //webcam state
let video2State : boolean = false; //second camera state
let audioState : boolean = false; //mic state

let videoStream : MediaStream; //webcam stream
let video2Stream : MediaStream; //second camera/screen stream
let audioStream : MediaStream; //mic stream

let videoSender : RTCRtpSender | null; //webcam sender
let video2Sender : RTCRtpSender | null; //second camera/screen sender
let audioSender : RTCRtpSender | null; //mic sender

const servers = {
	iceServers: [
	  {
		urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
	  },
	],
	iceCandidatePoolSize: 10,
  };

let PeerConnection = new RTCPeerConnection(servers);