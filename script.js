


// FUNCTIONS
function read_file() {
    var oFrame = document.getElementById("file");
    var raw_text = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (raw_text.indexOf("\r") >= 0) {
        raw_text = raw_text.replace("\r", "");
    }
    return raw_text;
}

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
function generate_html() {
    
    check_cookie("id", "start");
    check_cookie("file", "journey_under_the_sea.txt");
    check_cookie("achievements", "");

    // VARIABLES
    var TITLE = "";
    var TEXT = "";
    var CHOICES = [] // text, destination id




    // GET THE DATA FOR THIS LOCATION
    var lines = read_file().split("\n");
    for (var i = 0; i < lines.length; i++) {
        //lines[i] = lines[i].replace("\n", "");
        if (lines[i] == "*" + get_cookie("id")) {
            TITLE = lines[i + 1];
            var c = 2;
            while (lines[i + c][0] == "^") {
                var choice = ["", ""];

                choice[0] = lines[i + c].split(",")[0].slice(1,);
                choice[1] = lines[i + c].split(",")[1];
                CHOICES.push(choice);
                c++;
            }
            while (lines[i + c][0] != "*") {
                TEXT = TEXT + " "+ lines[i + c];
                c++;
            }
            break;
        }
    }
    // GENERATE HTML
    document.getElementById("title").innerHTML = TITLE;
    document.getElementById("text").innerHTML = TEXT;
    var choice_div = document.getElementById("choices");
    for (var i = 0; i < CHOICES.length; i++) {
        //var choice_item = document.createElement("div");
        //choice_item.appendChild(document.createTextNode(CHOICES[i][0]));
        var button = document.createElement("button");
        button.appendChild(document.createTextNode(CHOICES[i][0]));

        eval("var btn_func = function () {set_cookie('id', CHOICES["+i+"][1]);location.reload();};");
        button.addEventListener("click", btn_func);
        choice_div.appendChild(button);
        choice_div.appendChild(document.createElement("br"));
    }
    if (TEXT.includes("The End") && !get_cookie("achievements").split(",").includes(get_cookie("file") + '*' + get_cookie("id"))) {
        alert("You got an achievement for reaching an end!!!");
        if (get_cookie("achievements") == "") {
            set_cookie("achievements", get_cookie("file") + "*" + get_cookie("id"));
        }
        else {
            set_cookie("achievements", get_cookie("achievements") + "," + get_cookie("file") + "*" + get_cookie("id"));
        }
    } 


}