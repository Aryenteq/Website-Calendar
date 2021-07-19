$(document).ready(function() {
    if (window.location.href.indexOf("emptyinputlog") != -1){
        signup();
        return;
    }
    if (window.location.href.indexOf("wronglogin") != -1){
        signup();
        return;
    }
    if (window.location.href.indexOf("emptyinputsign") != -1){
        signup();
        changetosign();
        return;
    }
    if (window.location.href.indexOf("invalidemail") != -1){
        signup();
        changetosign();
        return;
    }
    if (window.location.href.indexOf("passwordsdontmatch") != -1){
        signup();
        changetosign();
        return;
    }
    if (window.location.href.indexOf("stmtfailed") != -1){
        signup();
        changetosign();
        return;
    }
    if (window.location.href.indexOf("usernametaken") != -1){
        signup();
        changetosign();
    }
});

