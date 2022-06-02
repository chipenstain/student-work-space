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
			urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
		},
	],
	iceCandidatePoolSize: 10,
};

// @ts-ignore
let firestore: any;

let roomID: string | number | string[] | undefined;
let roomDoc: any;
let clientDoc: any;

let peers: Array<Peer> = new Array();

interface Viewport {
	mic: HTMLAudioElement;
	camera: HTMLVideoElement;
	screen: HTMLVideoElement;
}

enum ClientType {
	TEACHER = "teacher",
	STUDENT = "student"
};

class Peer {
	remoteID: string | undefined;
	type: ClientType;

	viewport: Viewport | null;
	streamCount: number;

	connection!: RTCPeerConnection;

	micStream: MediaStream;
	cameraStream: MediaStream;
	screenStream: MediaStream;
	remoteMicStream: MediaStream;
	remoteCameraStream: MediaStream;
	remoteScreenStream: MediaStream;

	constructor(type: ClientType) {
		this.type = type;

		this.viewport = null;
		this.streamCount = 0;

		this.micStream = new MediaStream();
		this.cameraStream = new MediaStream();
		this.screenStream = new MediaStream();
		this.remoteMicStream = new MediaStream();
		this.remoteCameraStream = new MediaStream();
		this.remoteScreenStream = new MediaStream();

		this.GetUserMedia().then(async () => {
			this.connection = new RTCPeerConnection(servers);

			this.connection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
				if (!event.candidate) {
					console.log("Got finale candidate");
					return;
				}
				else {
					console.log("Got candidate: ", event.candidate);
					clientDoc.collection("candidates").add(event.candidate.toJSON());
				}
			};

			this.micStream.getAudioTracks().forEach((track: MediaStreamTrack) => {
				this.connection.addTrack(track, this.micStream);
			});
			this.cameraStream.getVideoTracks().forEach((track: MediaStreamTrack) => {
				this.connection.addTrack(track, this.cameraStream);
			});
			this.screenStream.getTracks().forEach((track: MediaStreamTrack) => {
				this.connection.addTrack(track, this.screenStream);
			});

			// @ts-ignore
			this.connection.ontrack = (event: RTCTrackEvent) => {
				if (this.streamCount === 0) {
					event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
						this.remoteMicStream.addTrack(track);
					});
					this.viewport!.mic.srcObject = this.remoteMicStream;
				}
				else if (this.streamCount === 1) {
					event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
						this.remoteCameraStream.addTrack(track);
					});
					this.viewport!.camera.srcObject = this.remoteCameraStream;
				}
				else if (this.streamCount === 2) {
					event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
						this.remoteScreenStream.addTrack(track);
					});
					this.viewport!.screen.srcObject = this.remoteScreenStream;
				}
				this.streamCount++;
			};

			if (type === ClientType.STUDENT) {
				this.viewport = CreateTeacherView();
				const teacherData = (await (roomDoc.collection("teacher").get())).docs[0].data();
				await this.SetRemoteDescription(teacherData.desc);
				this.connection.createAnswer().then(async (desc) => {
					await this.connection.setLocalDescription(desc);
					await clientDoc.set({ name: studentNameInput.val() });
					await clientDoc.update({ desc: { sdp: desc.sdp, type: desc.type } });
					console.log("Got room");
				});
			}
			else if (type === ClientType.TEACHER) {
				this.connection.createOffer().then(async (desc) => {
					await this.connection.setLocalDescription(desc);
					await clientDoc.set({ name: teacherNameInput.val() });
					await clientDoc.update({ desc: { sdp: desc.sdp, type: desc.type } });
					console.log(`New room created with SDP offer. Room ID: ${roomDoc.id}`);
				});
			}

			if (type === ClientType.STUDENT) {
				firestore.collection("rooms/" + roomID + "/teacher/" + this.GetRemoteID() + "/candidates").onSnapshot((snapshot: { docChanges: () => any[]; }) => {
					snapshot.docChanges().forEach((change: { type: string; doc: { data: () => any; }; }) => {
						if (change.type === "added") {
							this.connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
						}
					});
				});
			}
		});
	};

	SetRemoteDescription(description: RTCSessionDescriptionInit, connectDoc?: any) {
		this.connection.setRemoteDescription(new RTCSessionDescription(description));

		if (this.type === ClientType.TEACHER) {
			this.viewport = CreateStudentView();

/*			connectDoc.onSnapshot = ((snapshot: { docChanges: () => any[]; }) => {
				snapshot.docChanges().forEach(async change => {
					if (change.type === "added") {
						this.connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
					}
				});
			});*/
		}
	}

	async GetUserMedia() {
		// Mic initialize
		await navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
			s.getAudioTracks().forEach(track => {
				this.micStream.addTrack(track);
			});
		});

		// WebCam initialize
		await navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
			s.getVideoTracks().forEach(track => {
				this.cameraStream.addTrack(track);
			});
		});

		if (this.type === ClientType.STUDENT) {
			// Screen Initialize
			await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(s => {
				s.getTracks().forEach(track => {
					this.screenStream.addTrack(track);
				});
			});
		}
		else if (this.type === ClientType.TEACHER) {
			// SecondCam initialize
			/*
			navigator.mediaDevices.enumerateDevices().then(function(devices) {
				if (devices[6].kind === "videoinput") {
					navigator.mediaDevices.getUserMedia({ video: {deviceId: {exact: devices[1].deviceId}}, audio: true }).then(s => {
						s.getTracks().forEach(track => {
							this.screenStream.addTrack(track);
						});
					});
				}
			});*/
		}
	}

	async GetRemoteID() {
		return (await (roomDoc.collection("teacher").get())).docs[0].id;
	}
}

$(function () {
	// @ts-ignore
	firebase.initializeApp(firebaseConfig);
	// @ts-ignore
	firestore = firebase.firestore();
});