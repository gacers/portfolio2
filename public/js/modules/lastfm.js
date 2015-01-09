var LastFmNode = require('../../../node_modules/lastfm/lib/lastfm/index').LastFmNode,
	lastfm = new LastFmNode({
		api_key: '5c5861ee5c425e343b6ebd82b8cf58ea',    // sign-up for a key at http://www.last.fm/api
		secret: '366ad5f245bbb91b7e5fe1fd89d02a19'
	}),
	trackStream = lastfm.stream('gacers');



function getInfo(track) {
	var artist = track.artist['#text'],
		album = track.album['#text'],
		title = track.name,
		cover = track.image[3]['#text'];

	return {
		artist : artist,
		album : album,
		title : title,
		cover : cover
	}
}

module.exports = {
	pullMusic: function(callback) {
		lastfm.request('user.getRecentTracks', {
			user: 'gacers',
		    handlers: {
		        success: function(data) {
		        	var track = data.recenttracks.track[0];
		        	callback(getInfo(track));
		        },
		        error: function(error) {
		            console.log("Error: " + error.message);
		        }
		    }
		});

	}

	// getSimilar: function(artist, callback) {
	// 	lastfm.request("artist.getInfo", {
	// 	    artist: artist,
	// 	    handlers: {
	// 	        success: function(data) {
	// 	            return data.artist.similar;
	// 	        },
	// 	        error: function(error) {
	// 	            console.log("Error: " + error.message);
	// 	        }
	// 	    }
	// 	});
	// }
}


// { artist:
//    [ { name: 'Neon Indian',
//        url: 'http://www.last.fm/music/Neon+Indian',
//        image: [Object] },
//      { name: 'Toro y Moi',
//        url: 'http://www.last.fm/music/Toro+y+Moi',
//        image: [Object] },
//      { name: 'Small Black',
//        url: 'http://www.last.fm/music/Small+Black',
//        image: [Object] },
//      { name: 'Teen Daze',
//        url: 'http://www.last.fm/music/Teen+Daze',
//        image: [Object] },
//      { name: 'Wild Nothing',
//        url: 'http://www.last.fm/music/Wild+Nothing',
//        image: [Object] } ] }