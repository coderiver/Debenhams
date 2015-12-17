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
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000
	});
	$(".js-akce").slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		slide: '.akce__item',
		nextArrow: $('.akce__next'),
		prevArrow: $('.akce__prev'),
		arrows: true,
		autoplay: true
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



	$('.header__down').click(function(event) {
		target = $('.pages');
		stopall();
		$('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
	});
	if($('body').hasClass('is-home')){
		$(window).scroll(function(event) {
			st = $(window).scrollTop();
			wh = $(window).height();
			h = $('.header');
			if(st>wh-75){
				h.addClass('is-header');
				stopall();
			}
			else{
				h.removeClass('is-header');
			}
		});
	}
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
	$('.events__more,.events__less').click(function(event) {
		$('.events').toggleClass("is-wide").find('.is-hidden').toggle();
		$('.gallery__pics').toggle();
		$('.events__more').toggle();
		return false;
	});
	$('.gallery__slides a').click(function(event) {
		$('.popup').show();

			$(".js-popup").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				slide: '.popup__slide',
				nextArrow: $('.popup__next'),
				prevArrow: $('.popup__prev'),
				arrows: true
			});

		
		$('.popup__slide').height($(window).height()-190);

		return false;
	});
	$(window).resize(function(event) {
			$('.popup__slide').height($(window).height()-190);
		});
	$('.popup__close').click(function(event) {
		$('.popup').hide();
		$(".js-popup").slick("unslick");
	});

});