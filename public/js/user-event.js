$('.ui.dropdown')
	.dropdown({
		direction:'dropdown'
	});
$('#button-delete').click(function(){
        $('#delete-modal').modal('show');    
    });

$(".btn-slide").click(function(){
		$("#panel").slideToggle("slow");
		//$(".slide").animate({width:'toggle'},350);
		/*var offset = 65; 
		$('html, body').animate({
            scrollTop: $("#panel").offset().top - offset
        }, 500);*/
		$(this).toggleClass("active"); return false;

	});
$('.menu .item')
  .tab()
;