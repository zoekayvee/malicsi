$(document).ready(function(){
    $('.ui.dropdown').dropdown({
    		direction:'dropdown'
    });

    $('#button-delete').click(function(){
        $('#delete-modal').modal('show');
    });

    $(".btn-slide").click(function(){
		$("#panel").slideToggle("slow");
		$(this).toggleClass("active"); return false;

    });

    $('.menu .item').tab();

    $('.ui.dropdown').dropdown();
    $('#start-date-pick').calendar();
    $('#end-date-pick').calendar();
});
