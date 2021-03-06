$(document).ready(function() {


	var i = null;
	i = setTimeout(function () {
	    $("body").addClass('is-hidemenu');
	}, 3000);
	$(".top").mousemove(function(event) {
	    clearTimeout(i);
	    $("body").removeClass('is-hidemenu');
			// console.log($(window).height() - event.pageY);
			if($('.top').height() - event.pageY >100){
				i = setTimeout(function () {
		        $("body").addClass('is-hidemenu');
		    }, 3000);
			}

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


	if($('.akce__item').size()>2){
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
	}
	else{
		$('.akce').addClass('lessitems');
	}

	if($(window).width()>800){
		$(".js-slider").slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.top__slide',
			nextArrow: $('.player__next'),
			prevArrow: $('.player__prev'),
			arrows: true
		});
	}
	else{
		$(".js-slider").slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			slide: '.top__slide',
			nextArrow: $('.player__next'),
			prevArrow: $('.player__prev'),
			arrows: true,
			autoplay: true,
		  autoplaySpeed: 3000
		});
	}




	$('.js-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	  stopall();
	  vv = $("[data-slick-index='"+nextSlide+"']").find('.top__video').data('video');
	  $('.top__video').html('');
	  $("[data-slick-index='"+nextSlide+"']").find('.top__video').html(videos[vv]);
	  newvid = $("[data-slick-index='"+nextSlide+"']").find('video')[0];
	  $('.js-play').addClass('is-paused');
	  $(newvid).on('ended', function(event) {
			stopall();
			$(".js-slider").slick('slickNext');
		});
	  setTimeout(function(){
	  	newvid.play();

	  },100)
	});
	if($('.slick-current').find('video').size()>0){
		$('.slick-current').find('video')[0].play();
		$('.js-play').addClass("is-paused");
	}


	$('video').each(function(index, el) {
		$(this).on('ended', function(event) {
			stopall();
			$(".js-slider").slick('slickNext');
		});
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

	if($('body').hasClass("is-home")){
		if(window.location.hash=='#pages') {
		     var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		     		target = $('.header-placeholder');
		     		stopall();
		     		$('html,body').animate({
		               scrollTop: target.offset().top
		             }, 500);

		 } else {
		     // No hash found
		 }
	}



	$('.header__down').click(function(event) {
		target = $('.header-placeholder');
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

	//booking
	function loadbooklist(){
		year = $('.years .is-active').text();
		month = $('.monthes li a.is-active').parent().index();
		month = month + 1;
		if(year=='2015' && month!='12'){
			month = 12;
			$('.monthes a').removeClass('is-active');
			$('.monthes li:last-child a').addClass('is-active');
		}
		if(month<10){month = '0'+month;}

		$('.booklist').hide();
		$('#'+year+''+month).show();
	}
	loadbooklist();
	$('.years a').click(function(event) {
		$(this).siblings().removeClass('is-active');
		$(this).addClass('is-active');
		loadbooklist();
	});
	$('.monthes a').click(function(event) {
		$('.monthes a').removeClass('is-active');
		$(this).addClass('is-active');
		loadbooklist();
	});

	$('.header__moblangactive').click(function(event) {
		$('.header__moblang').toggleClass('is-active');
	});
	$('.header__burger,.mobileover__close').click(function(event) {
		$('.mobileover').toggle();
	});

});
