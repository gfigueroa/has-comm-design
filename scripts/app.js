var PROJECT1_DIR = "journals/";
var PROJECT1_PREFIX = "Journal_";
var PROJECT2_DIR = "school-portfolios/";
var PROJECT2_PREFIX = "SchoolPortfolio_";
var HOMEPAGE_NAMES = ["index.html", "home.html", "Home.html", "journal.html", "Journal.html", "homepage.html"];

/**
 * Finds a GET parameter from the URL and returns it.
 * @param {String} parameterName
 * @return {String} the parameter's value
 */
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

/**
 * Find whether a given url exists or not in the root folder
 * @param {String} url
 * @return {String} true if url exists, false otherwise
 */
function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

/**
 * Loads student name from the parameters and places it 
 * in corresponding HTML elements.
 */
function loadStudent() {
	var student = findGetParameter("student");
	var studentName = student.split(/(?=[A-Z])/).join(" ");
	
	document.title += " - " + studentName;
	
	// Change header text
	// jQuery:
	$('#student-header').text("Projects - " + studentName);
	// Vanilla JS equivalent:
	// document.getElementById('student-header').innerHTML = studentName;
	
	var project1File = "";
	for (var i = 0; i < HOMEPAGE_NAMES.length; i++) {
		project1File = PROJECT1_DIR + PROJECT1_PREFIX + student + "/" + HOMEPAGE_NAMES[i];
		if (urlExists(project1File)) {
			break;
		}
	}
	
	var project2File = "";
	for (var i = 0; i < HOMEPAGE_NAMES.length; i++) {
		project2File = PROJECT2_DIR + PROJECT2_PREFIX + student + "/" + HOMEPAGE_NAMES[i];
		if (urlExists(project2File)) {
			break;
		}
	}
	
	console.log(project1File);
	console.log(project2File);

	// Change links
	$('#project1-link').attr('href', project1File);
	$('#project2-link').attr('href', project2File);
}

$(document).ready(loadStudent);