let teacherNameInput : JQuery<HTMLInputElement>;
let studentNameInput : JQuery<HTMLInputElement>;
let roomIdInput : JQuery<HTMLInputElement>;

$(function () {
	teacherNameInput = $("#teacher-name");
	studentNameInput = $("#student-name");
	roomIdInput = $("#roomid");

	$("div#teacher-mode").on("click", () => {
		SetLoad(true);

		peers.push(new Peer(1, ClientType.TEACHER));

		ChangeView(VIEWS.TEACHER_CLIENT);
	});

	$("div#student-mode").on("click", () => {
		SetLoad(true);
		roomID = roomIdInput.val();

		peers.push(new Peer(1, ClientType.STUDENT));

		ChangeView(VIEWS.STUDENT_CLIENT);
	});
});