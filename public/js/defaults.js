$(document).ready(function(){

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 0 ) {
            $('#page-navigation').addClass('nav-scrolled');
        }
        else {
            $('#page-navigation').removeClass('nav-scrolled');
        }
    });

});
