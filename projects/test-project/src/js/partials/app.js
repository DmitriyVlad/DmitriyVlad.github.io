$(function() {
  // Mobile menu animation
  $('.mobile-menu__item').addClass('mobile-menu__item_disable');

  $('.menu-button').on('click', function() {
    if ( !$(this).hasClass('menu-button_active') ) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  $('.mobile-menu__item').on('click', function() {
    closeMenu();
  });

  function openMenu() {
    $('.menu-button').addClass('menu-button_active');
    $('.menu-button__line').addClass('collapse');
    $('.mobile-overlay').addClass('mobile-overlay_active');

    setTimeout(function() {
      $('.menu-button__line').addClass('rotate30');
    }, 70);
    setTimeout(function() {
      $('.menu-button__line').addClass('rotate45');
    }, 120);

    $('.mobile-menu__item').each(function(i) {
      setTimeout(function() {
        $('.mobile-menu__item').eq(i).addClass('mobile-menu__item_active');
      }, 100 * (i + 1));
    });
  }

  function closeMenu() {
    $('.menu-button').removeClass('menu-button_active');

    $('.mobile-menu__item').each(function(i) {
      setTimeout(function() {
        $('.mobile-menu__item').eq(i).removeClass('mobile-menu__item_active');
      }, 100 * (i + 1));
    });

    $('.menu-button__line').removeClass('rotate45').removeClass('rotate30');
    setTimeout(function() {
      $('.menu-button__line').removeClass('collapse');
    }, 50);

    setTimeout(function() {
      $('.mobile-overlay').removeClass('mobile-overlay_active');
    }, 600);

  }
});