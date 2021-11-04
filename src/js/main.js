$(document).ready(function () {

//маска телефона
  $('input[name="tel"]').mask("+7(999) 999-9999");
  


  $('.charge-carousel').slick({
    slidesToScroll: 2,
    slidesToShow: 2,
    dots: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 778,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  });


  //галерея
  const gallery = (galleryEl, delegateSelector) => {
    galleryEl.each(function () {
      $(this).magnificPopup({
        delegate: delegateSelector,
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    })
  };

  gallery($('.tesla-gallery'), '.tesla-gallery__item a');


  $('.tesla-tabs').on('click', '.tesla-tabs__tab:not(.active)', function () {
    $(this).closest('.tesla-tabs__tabs').find('.tesla-tabs__tab.active').removeClass('active');
    $(this).addClass('active');

    const currentData = $(this).data('tab');

    $(this).closest('.tesla-tabs').find('.tesla-tabs__plates').find('.tesla-tabs__plate.active').removeClass('active').hide();
    $(this).closest('.tesla-tabs').find('.tesla-tabs__plates').find('[data-tab="'+ currentData +'"]').fadeIn().addClass('active');
  });


  // мобильное меню

  $('.bars').on('click', function (){
    $('.mobile-menu').fadeIn();
    $('body').addClass('overflow-hidden');
  })

  $('.mobile-menu__close').on('click', function (){
    $('.mobile-menu').fadeOut();
    $('body').removeClass('overflow-hidden');
  })


  $('.mobile-menu a').on('click', function (){
    $('.mobile-menu').fadeOut();
    $('body').removeClass('overflow-hidden');
  })















});