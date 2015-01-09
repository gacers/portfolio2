var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry'),
	twitter = require('../../public/js/modules/twitter');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function(next) {

		var newEnquiry = new Enquiry.model(),
			updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});

	});

	view.render('contact', {
		script_url: [
			'http://maps.googleapis.com/maps/api/js?key=AIzaSyC0DEEwBKXXz1Ra-oTnqeBpGMe_P-NMuT8&sensor=true',
			'/js/custom/contact.js'
		],
		google_maps: 1
	});

};