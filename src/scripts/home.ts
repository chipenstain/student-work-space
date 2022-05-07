$(function(){
	$("button#teacher-mode").on("click", function(){
		ChangeView(VIEWS.TEACHER_CLIENT);
	});
	$("button#student-mode").on("click", function(){
		ChangeView(VIEWS.STUDENT_CLIENT);
	});
});