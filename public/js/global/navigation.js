function openNav() {
	$('body').addClass('_nav-open');
}

function closeNav() {
	$('body').removeClass('_nav-open');
}

$('.menu').on('click', function() {
	openNav();
});

$('.close-nav').on('click', function() {
	closeNav();
});