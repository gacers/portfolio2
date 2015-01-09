var Twitter = require('../../../node_modules/twitter/lib/twitter'),
	client = new Twitter({
	    consumer_key: 'ZkAItv28orv8eqlVKmmsxA',
	    consumer_secret: 'r952TeFIftT3xsemYOEm1CCwAVvDwK4DKZrNmP4Hs',
	    access_token_key: '16936683-zv2hDLUlMclYaoZLrcpUlNPe0OR6wE6WNa0ImFjhb',
	    access_token_secret: '0ieTPpJ5bOVDFMZ65PsSzLwBIZIgsRSVroBoYqk'
	});

function formatDate(tweetDate) {
	var postDate = new Date(tweetDate),
		monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
 		daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		year = postDate.getFullYear(),
		month = monthsList[postDate.getDay()],
		day = daysList[postDate.getDay()],
		date = postDate.getDate(),
		hourMilitary = postDate.getHours(),
		hour = hourMilitary > 12 ? hourMilitary - 12 : hourMilitary == 0 ? 12 : hourMilitary,
		ampm = hourMilitary < 12 ? 'am' : 'pm',
		min = postDate.getMinutes(),
		minutes = formatMinutes(min);

	return day + ', ' + month + ' ' + date + ', ' + year + ' ' + hour + ':' + minutes + ampm;
}

function formatMessage(tweetMessage) {
	var urlRegex = /(https?:\/\/[^\s]+)/g;

    return tweetMessage.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
}

function formatMinutes(min) {
	if (min < 10) {
	   return min = '0' + min;
	} else {
		return min;
	}
}

function parseData(body) {
	var tweetMessage = body[0].text,
	    tweetDate = body[0].created_at,
	    tweetHTML = formatMessage(tweetMessage),
	    tweetDateFormat = formatDate(tweetDate);

    return {
    	tweetHTML : tweetHTML,
    	tweetDateFormat : tweetDateFormat
    }
}

module.exports = {
	pullTweets: function(callback) {
		client.get('statuses/user_timeline', function(error, body, response) {
			if (error) {
		        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
		    }

		    if (body) {
		    	callback(parseData(body));
		    }
		});
	}
};