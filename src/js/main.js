$(function() {

    var layzr = new Layzr();
    
    $('#cta-menu').on('click', function() {
        $(this).toggleClass('is-active');
        $('#main-nav').toggleClass('is-active');
    });
    
    $('.js-nav-cta').on('click', function(e) {
        e.preventDefault();
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            var headerHeight = $('.main-header').outerHeight();

            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('#main-nav').toggleClass('is-active');
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 500);
            }
        }
    });
});