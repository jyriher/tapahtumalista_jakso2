var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

$(document).ready(function () {


	var proxyosoite = 'http://users.metropolia.fi/~jyriher/newsfeed/proxy.php?url=';

	//using local proxy to prevent CORS-issues infront of the xml-address:

	var feed = proxyosoite + "https://www.metropolia.fi/ajankohtaista/tapahtumat/?type=100&tx_ttnews%5Bcat%5D=135%2C134%2C133%2C132&cHash=9adf1714c65e662e9b1eef82120dbcbc";


	//using ajax to call xml-file:

	$.ajax(feed, {
		accepts: {
			xml: "application/rss+xml"
		},
		dataType: "xml",
		success: function (data) {

			$(data).find("entry").each(function () {
				var el = $(this);

				var list = { title: el.find("title").text(), description: el.find("summary").text() }

				//created loop so that all wanted values would arrive

				$.each(list, function (index, value) {

					//using regex rules to get rid of wrong looking umlauts:

					var umlaut = value.replace(/\&auml;/g, "ä");


					umlaut = umlaut.replace(/\&ouml;/g, "ö");
					umlaut = umlaut.replace(/\&nbsp;/g, " ");
					umlaut = umlaut.replace(/\&amp;/g, "&");
					umlaut = umlaut.replace(/<br\s*[\/]?>/gi, "\n");


					//appending the result to class

					$('<div/>', {
						text: umlaut.replace(/<(?:.|\n)*?>/gm, '\n'),
						class: 'className'
					}).appendTo('.content');


					//adding class to every other value (so that css rules would affect just on them):

					$(".className:even").addClass("titles");


				});

			});

		}
	});

});

//setting values to jQuerys marquee plugin:
$('.marquee').marquee({
	duration: 20000,
	gap: 1080,
	delayBeforeStart: 0,
	direction: 'up',
	duplicated: false
});

//updating page every 15 minutes:
setTimeout(function () {
	location.reload();
}, 15 * 60 * 1000);

function updateClock() {

	$(".clock").html(new Date().toLocaleTimeString('it-IT'));

	setTimeout(updateClock, 1000);

};

updateClock();

$(".date").html(dd + '.' + mm + '.' + yyyy);