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

	async.parallel([
	    function(callback) {
	        twitter.pullTweets(callback);
	    },
	    function(callback) {
	        instagram.pullPhotos(callback);
	    },
	    function(callback) {
	    	lastfm.pullMusic(callback);
	    }
    ], function(err, results) {
	    view.render('about', {
				song: results[2],
				tweet: results[0],
				images: results[1]
			});
		});
};
