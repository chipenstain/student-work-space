enum VIEWS {
	HOME = "home",
	STUDENT_CLIENT = "student_client",
	TEACHER_CLIENT = "teacher_client"
};

enum THEMES {
	DARK = "dark",
	LIGHT = "light"
};

let windowTitle: JQuery<HTMLTitleElement>;
let copyrightLabel: JQuery<HTMLSpanElement>;
let themeHolder: JQuery<HTMLLinkElement>;
let viewThemeHolder: JQuery<HTMLLinkElement>;

let header: JQuery<HTMLElement>;
let footer: JQuery<HTMLElement>;
let about: JQuery<HTMLDivElement>;
let help: JQuery<HTMLDivElement>;

let loadBar: JQuery<HTMLDivElement>
let appContainer: JQuery<HTMLDivElement>;

let views: JQuery<HTMLDivElement>;
let currentView: VIEWS;
let currentTheme: THEMES;

$(function () {
	windowTitle = $("title");
	copyrightLabel = $("span#copyright");
	themeHolder = $("link#theme-holder");
	viewThemeHolder = $("link#view-theme-holder");

	header = $("header");
	footer = $("footer");
	about = $("div#about-container");
	help = $("div#help-container");

	$("div#about").on("click", () => {
		about.css("display", "flex").show();
	});
	$("div#help").on("click", () => {
		help.css("display", "flex").show();
	});
	$("button.btn.inf").on("click", () => {
		about.hide();
		help.hide();
	})

	$("div#theme").on("click", () => {
		if (currentTheme === THEMES.LIGHT) {
			ChangeTheme(THEMES.DARK);
			currentTheme = THEMES.DARK;
		}
		else {
			ChangeTheme(THEMES.LIGHT);
			currentTheme = THEMES.LIGHT;
		}
	});

	loadBar = $("div#loading-bar");
	appContainer = $("div#app-container");

	views = $("div.content");

	SetCopyright();
	ChangeView(VIEWS.HOME);
});

function ChangeView(view: VIEWS) {
	ApplyView(view);
	setTimeout(() => {
		SetLoad(false);
		switch (view) {
			case VIEWS.HOME:
				$(views[0]).css("display", "flex").show();
				header.css("display", "flex").show();;
				footer.css("display", "flex").show();
				windowTitle.text("SWS | Student Work Space");
				break;
			case VIEWS.STUDENT_CLIENT:
				$(views[1]).css("display", "flex").show();
				header.hide();
				footer.hide();
				windowTitle.text("SWS | Student client");
				break;
			case VIEWS.TEACHER_CLIENT:
				$(views[2]).css("display", "flex").show();
				header.hide();
				footer.hide();
				windowTitle.text("SWS | Teacher client");
				break;
		}
		currentView = view;
	}, 500);
};

function ApplyView(view: VIEWS) {
	viewThemeHolder.attr("href", "styles/" + view + ".css");
}

function ChangeTheme(theme: THEMES) {
	themeHolder.attr("href", "styles/themes/" + theme + ".css");
}

function SetLoad(active: boolean) {
	if (active) {
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
		loadBar.show();
	}
	else {
		loadBar.hide();
	}
}

function SetCopyright() {
	let currentYear = new Date().getFullYear();
	let copyTxt = "&#169;chipenstain 2022" + ((currentYear = 2022) ? "" : (" - " + currentYear.toString()));
	copyrightLabel.html(copyTxt);
}