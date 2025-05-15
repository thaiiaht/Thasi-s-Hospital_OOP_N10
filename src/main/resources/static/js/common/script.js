$(function(){
    $('.feedback-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        navText: [
            "<i class='fas fa-arrow-left'></i>",
            "<i class='fas fa-arrow-right'></i>"
        ]
    });

    // Stop animation on resize
    let resizeTimer;
    $(window).on('resize', function(){
        $('body').addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            $('body').removeClass('resize-animation-stopper');
        }, 400);
    });

    $('.navbar-show-btn').on('click', function(){
        $('.navbar-box').addClass('navbar-box-show');
    });

    $('.navbar-hide-btn').on('click', function(){
        $('.navbar-box').removeClass('navbar-box-show');
    });
});