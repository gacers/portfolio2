(function(){
	var $button = $('form button'),
		$captcha = $('.captcha');

	function enableSubmit() {
		$captcha.attr('readonly', 'readonly');

		$button.removeAttr('disabled');
	}

	function disableSubmit() {
		var attr = $button.attr('disabled');

		if (typeof attr !== typeof undefined && attr !== false) {
			$button.attr('disabled', 'disabled');
		}
	}

	$captcha.on('input', function() {
	    var text = $(this).val();

	    if (text === 'scooter') {
	    	enableSubmit();
	    } else {
	    	disableSubmit();
	    }
	});
}).call(this);