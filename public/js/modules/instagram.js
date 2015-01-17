var ig = require('../../../node_modules/instagram-node').instagram();

module.exports = {
	pullPhotos: function(callback) {
		ig.use({ access_token: '304004.cf3c3bf.9fd3039b2e194e7a9bcef331f50a2cc0', client_id: 'cf3c3bf128624c9f8ef626c25a9006fa', client_secret: '21081de2963244d08ca154931e3f52c3' });

		ig.user_self_media_recent({count: 6}, function(err, medias, pagination, remaining, limit) {

			if (err) {

			}

			if(medias) {
				callback(null, medias)
			}
		});
	}
}