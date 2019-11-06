

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

function get_adventure() {
    var file = prompt("Enter Filename: ", "tutorial.txt");
    set_cookie("file", file);
    window.location.href = "cyoa.html";

}
