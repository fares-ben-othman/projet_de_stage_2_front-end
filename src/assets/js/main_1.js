;(function ($) { 
    "use strict";

    let mobileMenuIcon = $('.mobile-menu-icon'),
    offcanvasButton = $('.tcd-offcanvas-btn'),
    win = $(window),
    totop = $('.toTop');
    
    offcanvasButton.on('click', function (e) {
        e.preventDefault();

        $('.tcd-offcanvas-btn').removeClass('open');

        $('.tcd-offcanvas-phn').toggleClass('open');

        $('body').toggleClass('overlay-active');

        if ($('.tcd-offcanvas-phn').hasClass('open')) {
            $('.tcd-offcanvas-btn').addClass('open');
        }

    });

  // slider-1
  var SliderOne = new Swiper(".SliderOne", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });

  var SliderOne = new Swiper(".SliderTwo", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    autoplay: {
      delay: 3000,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },

      1180: {
        slidesPerView: 4,
      },

      1182: {
        slidesPerView: 6,
      },
    },
  });

  // slider-1
  var customerFeedbackOne = new Swiper(".customerFeedbackOne", {
    slidesPerView: 5,
    spaceBetween: 30,
    speed: 5000,
    loop: true,
    autoplay: {
      enabled: true,
      delay: 1,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },

      1180: {
        slidesPerView: 4,
      },

      1182: {
        slidesPerView: 5,
      },
    },
  });

  var customerFeedbackTwo = new Swiper(".customerFeedbackTwo", {
    slidesPerView: 5,
    spaceBetween: 30,
    speed: 5000,
    loop: true,
    autoplay: {
      enabled: true,
      delay: 1,
      reverseDirection: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },

      1180: {
        slidesPerView: 4,
      },

      1182: {
        slidesPerView: 5,
      },
    },
  });

  // light box
	if($('.video-play-btn').length) {
    $('.video-play-btn').magnificPopup({
        type: 'iframe',
        removalDelay: 260,
    });
  }
  
  // AcmeTicker
  if($('.my-news-ticker').length) {
    $('.my-news-ticker').AcmeTicker({
      type:'typewriter',
      direction: 'right',
      speed:50,
      controls: {
          prev: $('.acme-news-ticker-prev'),
          toggle: $('.acme-news-ticker-pause'),
          next: $('.acme-news-ticker-next')
      }
    });
  }
  
})(jQuery);