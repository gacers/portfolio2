var $html = $('html');

function isTouchDevice() {
    return typeof window.ontouchstart !== 'undefined';
}

function addTouchClass() {
	if ( isTouchDevice() != true ) {
		$html.addClass('_no-touch');
	} else {
		$html.addClass('_touch');
	}
}

addTouchClass();