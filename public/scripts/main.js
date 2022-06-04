"use strict";

var VIEWS, THEMES, windowTitle, copyrightLabel, themeHolder, viewThemeHolder, header, footer, about, help, loadBar, appContainer, views, currentView, currentTheme;

function ChangeView(view) {
    ApplyView(view), setTimeout(function() {
        switch (SetLoad(!1), view) {
          case VIEWS.HOME:
            $(views[0]).css("display", "flex").show(), header.css("display", "flex").show(), 
            footer.css("display", "flex").show(), windowTitle.text("SWS | Student Work Space");
            break;

          case VIEWS.STUDENT_CLIENT:
            $(views[1]).css("display", "flex").show(), header.hide(), footer.hide(), 
            windowTitle.text("SWS | Student client");
            break;

          case VIEWS.TEACHER_CLIENT:
            $(views[2]).css("display", "flex").show(), header.hide(), footer.hide(), 
            windowTitle.text("SWS | Teacher client");
        }
        currentView = view;
    }, 500);
}

function ApplyView(view) {
    viewThemeHolder.attr("href", "styles/" + view + ".css");
}

function ChangeTheme(theme) {
    themeHolder.attr("href", "styles/themes/" + theme + ".css");
}

function SetLoad(active) {
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
        }
        loadBar.show();
    } else loadBar.hide();
}

function SetCopyright() {
    new Date().getFullYear();
    copyrightLabel.html("&#169;chipenstain 2022");
}

!function(VIEWS) {
    VIEWS.HOME = "home", VIEWS.STUDENT_CLIENT = "student_client", VIEWS.TEACHER_CLIENT = "teacher_client";
}(VIEWS = VIEWS || {}), function(THEMES) {
    THEMES.DARK = "dark", THEMES.LIGHT = "light";
}(THEMES = THEMES || {}), $(function() {
    windowTitle = $("title"), copyrightLabel = $("span#copyright"), themeHolder = $("link#theme-holder"), 
    viewThemeHolder = $("link#view-theme-holder"), header = $("header"), footer = $("footer"), 
    about = $("div#about-container"), help = $("div#help-container"), $("div#about").on("click", function() {
        about.css("display", "flex").show();
    }), $("div#help").on("click", function() {
        help.css("display", "flex").show();
    }), $("button.btn.inf").on("click", function() {
        about.hide(), help.hide();
    }), $("div#theme").on("click", function() {
        currentTheme = currentTheme === THEMES.LIGHT ? (ChangeTheme(THEMES.DARK), 
        THEMES.DARK) : (ChangeTheme(THEMES.LIGHT), THEMES.LIGHT);
    }), loadBar = $("div#loading-bar"), appContainer = $("div#app-container"), views = $("div.content"), 
    SetCopyright(), ChangeView(VIEWS.HOME);
});