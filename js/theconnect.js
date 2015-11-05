//---Global Variables
var url;//EMPTY VARIABLE TO BE DEFINED THROUGH THE SEARCH
var CheckFullScreen = true;




//SETTING UP NEWSOURCE OBJECT FOR MAIN FEEDS

function newssource(feedcontainer, feedurl, feedlimit, rssoutput) {
    this.feedcontainer = feedcontainer;
    this.feedurl = feedurl;
    this.feedlimit = feedlimit;
    this.rssoutput = rssoutput;
}


var CBC = new newssource(document.getElementById("cbcFeed"), "http://rss.cbc.ca/lineup/politics.xml", 10, "<h2 style='text-align: center'>&nbsp; Top Political News Stories From The CBC</h2><ul>");

var Macleans = new newssource(document.getElementById("macFeed"), "http://www.macleans.ca/politics/feed/", 10, "<h2 style='text-align: center'>&nbsp;Top Political News Stories From Maclean\'s</h2><ul>");

var Globeandmail = new newssource(document.getElementById("globeandmailFeed"), "http://www.theglobeandmail.com/news/politics/globe-politics-insider/?service=rss", 10, "<h2 style='text-align: center'>&nbsp; Top Political News Stories From The Globe And Mail</h2><ul>");

var CTV = new newssource(document.getElementById("ctvFeed"), "http://www.ctvnews.ca/rss/politics/ctvnews-ca-politics-public-rss-1.822302", 10, "<h2 style='text-align: center'>&nbsp; Top Political News Stories From CTV News </h2><ul>");

var Showresults = new newssource(document.getElementById("searchresults"), url, 10, "<h2 style='text-align: center'>&nbsp; Your search returned these articles:</h2><ul>");



//--------CODE ADAPTED FROM http://www.javascriptkit.com/dhtmltutors/googleajaxfeed.shtml and Google Feeds API

function resultsdisplayfeed(result) {
    if (!result.error) {
        var thefeeds = result.feed.entries;
        for (var i = 0; i < thefeeds.length; i++)
        Showresults.rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
        Showresults.rssoutput += "</ul>";
        Showresults.feedcontainer.innerHTML = Showresults.rssoutput;
    } else
        console.log("Error fetching feeds!");
}
function resultsrssfeedsetup() {
    var feedpointer = new google.feeds.Feed(Showresults.url);
    feedpointer.setNumEntries(Showresults.feedlimit);
    feedpointer.load(resultsdisplayfeed);

}




google.load("feeds", "1");

function searching() {
    function OnLoad() {
        var newschoice = $("#select-choice").val();
        var searchinput = $("#searchinput").val();
        console.log(searchinput);
        var query = "'site:" + newschoice + " " + searchinput + "'";
        google.feeds.findFeeds(query, findDone);

        console.log(query);
    }


    function findDone(result) {
        
        if (!result.error) {
            var content = document.getElementById('searchresults');
            var html = '<h2 style="text-align: center"> Your search returned these RSS links</h2><p>Press one to access its articles</p>';
            
            for (var i = 0; i < 5; i++) {
                var entry = result.entries[i];
//THIS IS WHERE I GIVE THAT PESKY GLOBAL VARIBALE A DEFINITION
                Showresults.url = entry.url;

                html += "<button class='ui-btn ui-shadow ui-corner-all' onclick='resultsrssfeedsetup()'>" + entry.title + "</button>";

            }
            content.innerHTML = html;
        } else {
            console.log('error');
        }

    }

    google.setOnLoadCallback(OnLoad());

}
//----------------------------------------

//RSS FEED PAGE SUBMIT BUTTON
$('#searchsubmit').click(function () {
    var searchinput = $("#searchinput").val();

    console.log(searchinput);
    searching();

});



//SET UP FOR MAIN FEEDS

function cbcdisplayfeed(result) {
    if (!result.error) {
        var thefeeds = result.feed.entries;
        for (var i = 0; i < thefeeds.length; i++)
            CBC.rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
        CBC.rssoutput += "</ul>";
        CBC.feedcontainer.innerHTML = CBC.rssoutput;
    } else
        alert("Error fetching feeds!");
}
function cbcrssfeedsetup() {
    var feedpointer = new google.feeds.Feed(CBC.feedurl);
    feedpointer.setNumEntries(CBC.feedlimit);
    feedpointer.load(cbcdisplayfeed);

}


function macleansdisplayfeed(result) {
    if (!result.error) {
        var thefeeds = result.feed.entries;
        for (var i = 0; i < thefeeds.length; i++)
            Macleans.rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
        Macleans.rssoutput += "</ul>";
        Macleans.feedcontainer.innerHTML = Macleans.rssoutput;
    } else
        alert("Error fetching feeds!");
}

function macleansrssfeedsetup() {
    var feedpointer = new google.feeds.Feed(Macleans.feedurl);
    feedpointer.setNumEntries(Macleans.feedlimit);
    feedpointer.load(macleansdisplayfeed);

}


function globeandmaildisplayfeed(result) {
    if (!result.error) {
        var thefeeds = result.feed.entries;
        for (var i = 0; i < thefeeds.length; i++)
            Globeandmail.rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
        Globeandmail.rssoutput += "</ul>";
        Globeandmail.feedcontainer.innerHTML = Globeandmail.rssoutput;
    } else
        alert("Error fetching feeds!");
}
function globeandmailrssfeedsetup() {
    var feedpointer = new google.feeds.Feed(Globeandmail.feedurl);
    feedpointer.setNumEntries(Globeandmail.feedlimit);
    feedpointer.load(globeandmaildisplayfeed);

}


function ctvdisplayfeed(result) {
    if (!result.error) {
        var thefeeds = result.feed.entries;
        for (var i = 0; i < thefeeds.length; i++)
            CTV.rssoutput += "<li><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></li>";
        CTV.rssoutput += "</ul>";
        CTV.feedcontainer.innerHTML = CTV.rssoutput;
    } else
        alert("Error fetching feeds!");
}
function ctvrssfeedsetup() {
    var feedpointer = new google.feeds.Feed(CTV.feedurl);
    feedpointer.setNumEntries(CTV.feedlimit);
    feedpointer.load(ctvdisplayfeed);

}



//LOAD FEEDS ON PAGE INITIATION
$(document).on('pageinit', '#page03', function () {

    cbcrssfeedsetup();
});

$(document).on('pageinit', '#page04', function () {

    macleansrssfeedsetup();
});

$(document).on('pageinit', '#page05', function () {

    globeandmailrssfeedsetup();
});

$(document).on('pageinit', '#page06', function () {

    ctvrssfeedsetup();
});


//-------------ADAPTED FROM TOM BARKER
function fullScreen() {

    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);

    } else {
        cancelFullScreen.call(doc);

    }
}
//-------------------------


//CHANGES THE BUTTON TEXT DEPENDING ON FULLSCREEN STATUS
$("#button1").click(function () {
    var toggle = document.getElementById("button1");
    if (CheckFullScreen === true) {
        toggle.innerHTML = "EXIT FULLSCREEN"; 
        CheckFullScreen = false;
    } else {
        toggle.innerHTML = "FULLSCREEN";
        CheckFullScreen = true;
    }
});


//            RESIZE VIDEO WINDOW TO FIT SCREEN
$("iframe").css('height', $(window).height() + 'px');



//---PAGE  07 FORM FUNCTIONS
function formresults() {
    var enivroparty;
    var hairparty;
    var enviroslidervalue = document.getElementById("enviro-range").value;
    var hairslidervalue = document.getElementById("hair-range").value;


    //READ SLIDER VALUES AND CONVERT TO PARTY NAMES    
    if (enviroslidervalue <= 2) {
        enviroparty = "Conservative";
    } else if (enviroslidervalue > 2 && enviroslidervalue <= 5) {
        enviroparty = "Liberal";
    } else if (enviroslidervalue > 5 && enviroslidervalue <= 7) {
        enviroparty = "NDP";
    } else {
        enviroparty = "Green";
    }

    if (hairslidervalue <= 2) {
        hairparty = "Conservative";
    } else if (hairslidervalue > 2 && hairslidervalue <= 5) {
        hairparty = "NDP";
    } else if (hairslidervalue > 5 && hairslidervalue <= 7) {
        hairparty = "Green";
    } else {
        hairparty = "Liberal";
    }


    //OBJECT CONTAINING ASSOCIATED Q & A
    var formanswers = {
        arts: $("input[name=arts-choice]:checked", 'form').val(),
        environment: enviroparty,
        drugs: $("input[name=marijuana-choice]:checked", 'form').val(),
        economy: $("input[name=economy-choice]:checked", 'form').val(),
        hair: hairparty

    };

    //SETTING UP AN ARRY TO HOLD THE ANSWERS
    var choices = [formanswers.arts, formanswers.environment, formanswers.drugs, formanswers.economy, formanswers.hair];

    var Liberal = 0;
    var NDP = 0;
    var Conservative = 0;
    var Green = 0;

    //SCAN THROUGH ARRAY AND SET UP RESULTS
    for (var i = 0; i < choices.length; i++) {
        switch (choices[i]) {
        case "Liberal":
            Liberal += 1;
            break;
        case "NDP":
            NDP += 1;
            break;
        case "Conservative":
            Conservative += 1;
            break;
        case "Green":
            Green += 1;
            break;


        }
    }
    

    //UPDATES UI TO SHOW RESULTS
    if (Liberal > NDP && Liberal > Conservative && Liberal > Green) {
        $("#showpartyresults").html("and the result is...<span style='font-size: 1.2em; color:#BE1824'> Liberal!</span>");
        $("#results").hide();
    } else if (Conservative > Liberal && Conservative > NDP && Conservative > Green) {
        $("#showpartyresults").html("and the result is...<span style='font-size: 1.2em; color:#2126C2'>Conservative!</span>");
        $("#results").hide();
    } else if (NDP > Liberal && NDP > Conservative && NDP > Green) {
        $("#showpartyresults").html("and the result is...<span style='font-size: 1.2em; color:#E13408'>NDP!</span>");
        $("#results").hide();
    } else if (Green > Conservative && Green > Liberal && Green > Conservative) {
        $("#showpartyresults").html("and the result is...<span style='font-size: 1.2em; color:#2F8E22'>Green!</span>");
        $("#results").hide();
    } else {
        $("#showpartyresults").html("and the result is...<span style='font-size: 1.2em; color:black'>inconclusive!</span>....try again!");
    }

    

}