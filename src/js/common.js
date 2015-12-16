$(document).ready(function() {

	var i = null;
	$(".top").mousemove(function() {
	    clearTimeout(i);
	    $("body").removeClass('is-hidemenu');  
	    i = setTimeout(function () {
	        $("body").addClass('is-hidemenu');  
	    }, 3000);
	}).mouseleave(function() {
	    // clearTimeout(i);
	    $("body").removeClass('is-hidemenu');  
	});

	$(".js-gallery").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: '.gallery__slide',
		nextArrow: $('.gallery__next'),
		prevArrow: $('.gallery__prev'),
		arrows: true
	});
	
	$(".js-slider").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: '.top__slide',
		nextArrow: $('.player__next'),
		prevArrow: $('.player__prev'),
		arrows: true
	});
	$('.js-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  stopall();
	  newvid = $("[data-slick-index='"+nextSlide+"']").find('video')[0];
	  $('.js-play').addClass('is-paused');
	  newvid.play();
	});

	// firstvid = $('.slick-current').find('video')[0].play();

	$('video').each(function(index, el) {
		$(this).on('ended', function(event) {
			stopall();
			$(".js-slider").slick('slickNext');
		});
	});

	function loadvid(el){

	}

	$('.header__down').click(function(event) {
		target = $('.pages');
		stopall();
		$('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
	});
	$(window).scroll(function(event) {
		st = $(window).scrollTop();
		wh = $(window).height();
		h = $('.header');
		if(st>wh-75){
			h.addClass('is-header');
		}
		else{
			h.removeClass('is-header');
		}
	});
	function stopall(){
		// stop all videos
		$('video').each(function(index, el) {
			$(this)[0].pause();
			$('.js-play').removeClass('is-paused');
		});
	}


	$('.js-play').click(function(event) {
		var video = $('.slick-current').find('video')[0];
		if (video.paused) {
			video.play();
			$(this).toggleClass('is-paused');
		} else {
			video.pause();
			$(this).toggleClass('is-paused');
		}
		return false;
	});

});