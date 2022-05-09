$(function(){
	$("div#teacher-mode").on("click", async ()=>{
		SetLoad(true);

		// @ts-ignore
		const roomDoc = firestore.collection('rooms').doc();
		const teacherCandidates = roomDoc.collection('teacherCandidates');
		const studentCandidates = roomDoc.collection('studentCandidates');

		PeerConnection.onicecandidate = event => {
			event.candidate && teacherCandidates.add(event.candidate.toJSON());
		};

		const offerDescription = await PeerConnection.createOffer();

		PeerConnection.setLocalDescription(offerDescription);

		const offer = {
			sdp: offerDescription.sdp,
			type: offerDescription.type
		};

		await roomDoc.set(offer);

		roomDoc.onSnapshot((snapshot: { data: () => any; }) => {
			const data = snapshot.data();
			if (!PeerConnection.currentRemoteDescription && data?.answer) {
				const answerDescription = new RTCSessionDescription(data.answer);
				PeerConnection.setRemoteDescription(answerDescription);
			}
		});

		studentCandidates.onSnapshot((snapshot: { docChanges: () => any[]; }) => {
			snapshot.docChanges().forEach((change: { type: string; doc: { data: () => RTCIceCandidateInit | undefined; }; }) => {
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

		const roomID = "";
		// @ts-ignore
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
			sdp: answerDescription.sdp,
			type: answerDescription.type
		};

		await roomDoc.update({ answer });

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