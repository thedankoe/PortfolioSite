$(document).ready(function() {

	//NAV SCROLL ANIM
	$(window).on("scroll", function() {
		if($(document).scrollTop() > 550) {
			$("nav").addClass("navBlack");
		} else {
			$("nav").removeClass("navBlack");
		}
	});

	//ABOUT ME SCROLL ANIM
	$("a[href^='#']").on("click", function(event) {
		event.preventDefault();

		var target = this.hash;
		var $target = $(target);

		//SCROLL AND SHOW HASH
		$("html, body").animate( {
			"scrollTop": $target.offset().top
		}, 700, "swing", function() {
			window.location.hash = target;
		});
	});

	$(window).on("scroll", function() {
		if ($(window).width() <= 549){
	    if($(document).scrollTop() > 1180){
	        skillbarAnimation();
	    }
		} else if ($(window).width() > 549 && $(window).width() <= 991) {
	    if ($(document).scrollTop() > 790) {
	        skillbarAnimation();
	    }
		} else {
	    if ($(document).scrollTop() > 760) {
	        skillbarAnimation();
	    }
	}
	});

	// skillbar animation
	var skillbarAnimation = function() {
		$('.skillbar').each(function() {
		$(this).find('.skillbar-bar').animate( {
			width:$(this).attr('data-percent')
		}, 2500);
	});
}

	// Listen for form submit
	document.getElementById('contact-form').addEventListener('submit', submitForm);

	// Submit form
	function submitForm(event) {
		// Show alert
		document.querySelector('.alert').style.display = 'block';

		// Hide alert after 3 seconds
		setTimeout(function() {
			document.querySelector('.alert').style.display = 'none';
		}, 3000);

		// Clear form
		document.getElementById('contact-form').reset();
	}

});
