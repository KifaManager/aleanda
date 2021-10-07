$(function () {

  // Loader

  setTimeout(function () {
    $('.loader').addClass('hide');
  }, 1800);

  // --- //

  // Show/hide popup in card

  $('.grid__card-btn').on('click', function (e) {
    e.preventDefault();
    $('.grid__card-btn').not($(this)).removeClass('active');
    $(this).toggleClass('active');
    $('.grid__card-btn').not($(this)).next().removeClass('show');
    $(this).next().toggleClass('show');
  });

  // --- //

  // Disabled search bar in the plugin - select2

  $('.panel__langs').select2({
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.panel')
  });

  // --- //

  // Main slider

  $('.slider__slides').slick({
    autoplay: true,
    speed: 1000,
    infinite: false,
    prevArrow: '<button class="slider-btn slider-prev"><img src="./images/arrow-left.svg" alt=""></button>',
    nextArrow: '<button class="slider-btn slider-next"><img src="./images/arrow-right.svg" alt=""></button>'
  });

  // --- //

  // Reviews slider

  $('.reviews__slider').slick({
    infinite: false,
    speed: 1000,
    prevArrow: '<button class="reviews__slider-btn prev"></button>',
    nextArrow: '<button class="reviews__slider-btn next"></button>',
    dots: true
  });

  // --- //

  // Tabs in the news section

  $('.new__tabs').slick({
    infinite: false,
    prevArrow: '<button class="new__slider-btn prev"></button>',
    nextArrow: '<button class="new__slider-btn next"></button>',
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 705,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          variableWidth: false
        }
      },
    ]
  });

  // --- //

  // Show/hide search bar

  if ($(window).width() < 1199) {
    $('.search__btn').on('click', function (e) {
      e.preventDefault();
      $('.search__field').addClass('show');
      $('body').addClass('dark');
    });
    $('.close__input').on('click', function () {
      $('.search__field').removeClass('show');
      $('body').removeClass('dark');
    });
  }

  // --- //

  // Sorting cards

  $(window).on('load', function () {
    if ($('.grid__cards').length) {
      mixitup($('.grid__cards'), {
        animation: {
          animateResizeTargets: true
        },
        controls: {
          toggleDefault: 'none'
        },
        load: {
          filter: '.category-a'
        }
      });
    }
  });

  // --- //

  // Validation

  function errorDo(text) {
    $(this).nextAll('.form__error').remove();
    $(this).after(`<span class="form__error">${text}</span>`);
    setTimeout(function () {
      $('.form__error').fadeOut();
    }, 2000);
  }

  $('form:not(.search, .search-form)').on('submit', function (e) {
    e.preventDefault();

    $(this).find('input', 'textarea').each(function () {

      if ($(this).val() == '' && $(this).prop('required')) {
        errorDo.call($(this), 'Невірні дані');
      }

      // email
      if ($(this).attr('type') == 'email' && $(this).prop('required')) {
        errorDo.call($(this), 'Неправильно введена пошта')
      }

      $(this).on('keyup', function () {
        if ($(this).val().length) {
          $(this).nextAll('.form__error').remove();
        }
      });
    });
  });

  $('.search, .search-form').each(function () {

    $(this).on('submit', function (e) {
      $(this).find('input').each(function () {
        if ($(this).val() == '' && $(this).prop('required')) {
          e.preventDefault();
          errorDo.call($(this), 'Введіть пошуковий запит')
        } else {
          return false;
        }
      });
    });

  });
  // --- //

  // Back to top button

  $('.to-top').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  // --- //

  // Show/hide to-top button

  $(window).on('load, scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('.to-top').fadeIn();
    } else {
      $('.to-top').fadeOut();
    }
  });

  // --- //

  // Fancybox

  Fancybox.bind('[data-fancybox]', {
    dragToClose: false
  });

  // --- //

  // Show/hide main menu

  $('.menu__burger').on('click', function () {
    $(this).toggleClass('active');
    $('.burger__menu-box').slideToggle();
    $('body').toggleClass('dark');
  });

  // --- //

  // Show/hide catalog menu

  $('.menu__btn').on('click', function () {
    $(this).after($('#main-submenu').toggleClass('show'));
  });

  // --- //

  // Add menu links to main menu

  $(window).on('load', function () {
    if ($(this).width() < 680) {
      $('.submenu__links').prependTo($('.burger__menu-box'));
    } else {
      $('.burger__menu-box').find('.submenu__links').remove();
    }
  });

  // --- //

  // Show/hide submenu

  $('.submenu__link').on('click', function () {
    $(this).toggleClass('active');
    $('.submenu__link').not($(this)).removeClass('active');
    $(this).next('.submenu__sublist').toggleClass('active');
    $('.submenu__link').not($(this)).next('.submenu__sublist').removeClass('active');
  });

  // --- //

  //  Price range

  if ($('.range-price').length) {

    let rangePrice = document.getElementById('range-price');
    let amounts = document.getElementById('amounts');

    noUiSlider.create(rangePrice, {
      start: [0, 300000],
      connect: true,
      step: 500,
      range: {
        'min': 20000,
        'max': 250500
      }
    });

    rangePrice.noUiSlider.on('update', function (values) {
      amounts.innerHTML = `${Math.trunc(values[0])} € - ${Math.trunc(values[1])} €`
    });
  }

  // --- //


  // Show all button

  $('.show-all').on('click', function () {
    $(this).toggleClass('active');
    $('.year .checks').toggleClass('show');
  });

  // --- //

  // Card prices select

  $('.catalog__card-prices').each(function () {
    let dropdownParent = $(this).closest('.catalog__card-info');
    $(this).select2({
      dropdownParent: dropdownParent,
      minimumResultsForSearch: Infinity,
      width: 'fit-content',
      dropdownAutoWidth: true
    });
  });

  // --- //

  // Show / hide details aside boxes
  // Adding arrow to catalog card if window with less than 575
  // Slide catalog cards info
  // Replace photos to information blocks in the catalog

  if ($(this).width() < 575) {

    $('.aside-box').each(function () {
      $(this).on('click', function () {
        $(this).find('.aside-box__info').slideToggle();
        $(this).find('.aside-title').toggleClass('active');
      });
    });

    $('.catalog__card, .category__row').append('<button class="slide-arrow"><img src="./images/catalog/arrow-down.svg" alt=""></button>');

    $('.catalog__card').each(function () {
      $(this).find('.slide-arrow').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.catalog__card').find('.catalog__card-info').toggleClass('active');
      });
    });

    $('.category__row').each(function () {
      $(this).find('.slide-arrow').on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('.category__row').find('.catalog__card-info').toggleClass('active');
      });
    });

    $('.catalog__info-card').eq(0).find('.catalog__info-logo').after($('.catalog__info-card').eq(1));
    $('.catalog__info-card').eq(3).find('.catalog__info-title').after($('.catalog__info-card').eq(2));

  }

  // --- //

  // Replace catalog downloading button after grid cards if window with less than 991

  if ($(this).width() < 991) {
    $('.catalog.new').find('.grid__cards').after($('.catalog.new').find('.main__link.download'));
  }

  // --- //

});




function initProductSlider(){
    let productSlider = $('.product-slider'),
        productSlide = $('.product-slide'),
        productDots = $('.product-dots');
    if(productSlide.length > 1){
        productSlider.slick({
            asNavFor: productDots,
            arrows: false,
            infinite: false,
            swipe: false
        });
        productDots.slick({
            asNavFor: productSlider,
            slidesToShow: 4,
            focusOnSelect: true,
            infinite: false,
            prevArrow: '<button class="product-dots-btn prev"></button>',
            nextArrow: '<button class="product-dots-btn next"></button>',
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 350,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]

        });
    }
}

function initProductsSlider(){
    $('.products-slider').each(function(index) {
        let productsSlider = $(this),
            productsSlide = $(this).find('.catalog__card');

        productsSlider.siblings('.products-actions').attr('data-index', index);

        if(productsSlide.length > 3){
            productsSlider.slick({
                infinite: false,
                speed: 1000,
                slidesToShow: 3,
                prevArrow: $(`.products-actions[data-index="${index}"] .slider-btn.prev`),
                nextArrow: $(`.products-actions[data-index="${index}"] .slider-btn.next`),
                dots: true,
                responsive: [
                    {
                        breakpoint: 769,
                        settings: {
                            infinite: true
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            infinite: true,
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 401,
                        settings: {
                            fade: true,
                            infinite: true,
                            slidesToShow: 1,
                        }
                    }
                ]
            })
        }
    })
}

function initVideosSlider(){
    let videosSlider = $('.videos-slider'),
        videosSlide = videosSlider.find('.videos-slide');
    if(videosSlide.length > 3){
        videosSlider.slick({
            infinite: false,
            speed: 1000,
            slidesToShow: 3,
            prevArrow: $('.videos-actions .slider-btn.prev'),
            nextArrow: $('.videos-actions .slider-btn.next'),
            dots: true,
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        infinite: true
                    }
                },
                {
                    breakpoint: 401,
                    settings: {
                        infinite: true,
                        slidesToShow: 2,
                    }
                }
            ]
        })
    }
}

$(window).on('load', function(){

    initProductSlider();
    initProductsSlider();
    initVideosSlider();

    $('.tab-link').on('click', function(e){
        e.preventDefault();
        $('.tab-link').removeClass('active');
        $(this).addClass('active');
        $('.product-tab').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });

});
