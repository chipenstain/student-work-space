let teacherName: JQuery<HTMLInputElement>;
let studentName: JQuery<HTMLInputElement>;
let roomId: JQuery<HTMLInputElement>;

$(function () {
	teacherName = $("#teacher-name");
	studentName = $("#student-name");
	roomId = $("#roomid");

	$("div#teacher-mode").on("click", async () => {
		SetLoad(true);

		// @ts-ignore
		const firestore = firebase.firestore();

		// @ts-ignore
		const roomDoc = firestore.collection('rooms').doc();
		const teacherCandidates = roomDoc.collection('teacherCandidates');
		const studentCandidates = roomDoc.collection('studentCandidates');

		remoteStackStreams = new MediaStream();
		videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
		PeerConnection.addTrack(videoStream.getVideoTracks()[0], videoStream);
		video2Stream = await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: true
		});
		PeerConnection.addTrack(video2Stream.getVideoTracks()[0], videoStream);
		audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		PeerConnection.addTrack(audioStream.getAudioTracks()[0], audioStream);

		PeerConnection.onicecandidate = event => {
			if (!event.candidate) {
				console.log('Got final candidate!');
				return;
			}
			else {
				console.log('Got candidate: ', event.candidate);
				teacherCandidates.add(event.candidate.toJSON());
			}
		};

		const offerDescription = await PeerConnection.createOffer();

		PeerConnection.setLocalDescription(offerDescription);

		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		await roomDoc.set({ offer });
		console.log(`New room created with SDP offer. Room ID: ${roomDoc.id}`);

		PeerConnection.ontrack = (event) => {
			console.log('Got remote track:', event.streams[0]);
			event.streams[0].getTracks().forEach((track) => {
				CreateStudentView();
				remoteStackStreams.addTrack(track);
			});
		};

		roomDoc.onSnapshot(async (snapshot: { data: () => any; }) => {
			const data = snapshot.data();
			if (!PeerConnection.currentRemoteDescription && data?.answer) {
				console.log('Got remote description: ', data.answer);
				const answerDescription = new RTCSessionDescription(data.answer);
				PeerConnection.setRemoteDescription(answerDescription);
			}
		});

		studentCandidates.onSnapshot((snapshot: { docChanges: () => any[]; }) => {
			snapshot.docChanges().forEach(async change => {
				if (change.type === 'added') {
					console.log(`Got new remote ICE candidate: ${JSON.stringify(change.doc.data)}`);
					PeerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
				}
			});
		});

		ChangeView(VIEWS.TEACHER_CLIENT);
	});

	$("div#student-mode").on("click", async () => {
		SetLoad(true);

		// @ts-ignore
		const firestore = firebase.firestore();

		const roomID = roomId.val();
		// @ts-ignore
		const roomDoc = firestore.collection('rooms').doc(roomID);
		const teacherCandidates = roomDoc.collection('teacherCandidates');
		const studentCandidates = roomDoc.collection('studentCandidates');

		remoteStackStreams = new MediaStream();
		videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
		PeerConnection.addTrack(videoStream.getVideoTracks()[0], videoStream);
		video2Stream = await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: true
		});
		PeerConnection.addTrack(video2Stream.getVideoTracks()[0], videoStream);
		audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		PeerConnection.addTrack(audioStream.getAudioTracks()[0], audioStream);

		PeerConnection.onicecandidate = event => {
			if (!event.candidate) {
				console.log('Got final candidate!');
				return;
			}
			else {
				console.log('Got candidate: ', event.candidate);
				studentCandidates.add(event.candidate.toJSON());
			}
		};

		const roomData = (await roomDoc.get()).data();
		console.log('Got room');

		const offerDescription = roomData.offer;
		await PeerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

		const answerDescription = await PeerConnection.createAnswer();
		await PeerConnection.setLocalDescription(answerDescription);

		const answer = {
			sdp: answerDescription.sdp,
			type: answerDescription.type
		};

		await roomDoc.update({ answer });

		PeerConnection.ontrack = (event) => {
			console.log('Got remote track:', event.streams[0]);
			event.streams[0].getTracks().forEach((track) => {
				CreateStudentView();
				remoteStackStreams.addTrack(track);
			});
		};

		teacherCandidates.onSnapshot((snapshot: { docChanges: () => any[]; }) => {
			snapshot.docChanges().forEach((change: { type: string; doc: { data: () => any; }; }) => {
				if (change.type === 'added') {
					let data = change.doc.data();
					PeerConnection.addIceCandidate(new RTCIceCandidate(data));
				}
			})
		})

		ChangeView(VIEWS.STUDENT_CLIENT);
	});
});