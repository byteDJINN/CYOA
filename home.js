

function set_cookie(cname, cvalue, exdays) {
    var d = new Date();

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    var expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

function get_cookie(cname) {

    var name = cname + "=";

    var decodedCookie = decodeURIComponent(document.cookie);

    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];

        while (c.charAt(0) == ' ') {

            c = c.substring(1);

        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);

        }

    }

    return "";

}

function check_cookie(x, backup) {

    if (get_cookie(x) == "") {

        set_cookie(x, backup, 365);

    }
}

function select_cyoa(filename) {
    set_cookie("file", filename);
    set_cookie("id", 'start');
    window.location.href = "cyoa.html";
}

function get_achievements() {
    var achievements = get_cookie("achievements").split(",");
    for (var i = 0; i < achievements.length; i++) {
        var story = achievements[i].split("*")[0];
        document.getElementById(story + "_progress").innerHTML = (Number(document.getElementById(story + "_progress").innerHTML.split("/")[0]) + 1) +"/"+ document.getElementById(story + "_progress").innerHTML.split("/")[1];
    }
    if (document.getElementById(story + "_progress").innerHTML.split("/")[0] == document.getElementById(story + "_progress").innerHTML.split("/")[1]) {
        document.getElementById(story + "_progress").style.color = "green";
    }
}