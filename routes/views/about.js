var keystone = require('keystone'),
	twitter = require('../../public/js/modules/twitter'),
	instagram = require('../../public/js/modules/instagram'),
	lastfm = require('../../public/js/modules/lastfm'),
	async = require('async');







exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';

	async.parallel({
	    twitter: function(callback) {
	        twitter.pullTweets(function(body){
	        	callback(body);
	        });
	    },
	    instagram: function(callback) {
	        instagram.pullPhotos(function(medias){
	        	callback(medias);
	        });
	    },
	    lastfm: function(callback) {
	    	lastfm.pullMusic(function(track){
	    		callback(track);
	    	});
	    }
	}, function(err, results) {
	    // results is now equals to: {one: 'abc\n', two: 'xyz\n'}
	    console.log(results)
	});





		view.render('about', {
			// song: track
		});
};

// instagram.pullPhotos(function(medias){
// 	view.render('about', {
// 		images: medias
// 	});
// });
//
