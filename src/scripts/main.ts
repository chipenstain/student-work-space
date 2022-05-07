enum VIEWS {
	HOME = "home",
	STUDENT_CLIENT = "student_client",
	TEACHER_CLIENT = "teacher_client"
};

enum THEMES {
	DARK = "dark",
	LIGHT = "light"
};

let title : JQuery<HTMLTitleElement>;
let copyright : JQuery<HTMLSpanElement>;
let themeHolder : JQuery<HTMLLinkElement>;
let viewThemeHolder : JQuery<HTMLLinkElement>;

let header : JQuery<HTMLElement>;
let footer : JQuery<HTMLElement>;

let loadBar : JQuery<HTMLDivElement>
let appContainer : JQuery<HTMLDivElement>;

let views : any;
let currentView : VIEWS;

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

function ChangeView(view : VIEWS) {
	SetLoad(true);
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
			$(views[0]).css("display", "flex");
			header.css("display", "flex");
			footer.css("display", "flex");
			title.text("SWS | Student Work Space");
			break;
		case VIEWS.STUDENT_CLIENT:
			$(views[1]).show();
			header.hide();
			footer.hide();
			title.text("SWS | Student client");
			break;
		case VIEWS.TEACHER_CLIENT:
			$(views[2]).show();
			header.hide();
			footer.hide();
			title.text("SWS | Teacher client");
			break;
	}

	ApplyViewTheme(view);
	currentView = view;
	SetLoad(false);
}

function ApplyViewTheme(view : VIEWS) {
	viewThemeHolder.attr("href", "styles/" + view + ".min.css");
}

function ChangeTheme(theme : THEMES) {
	themeHolder.attr("href", "styles/themes/" + theme + ".min.css");
}

function SetLoad(active : boolean){
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