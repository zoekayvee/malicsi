$(document).ready(function(){
    $('.menu .item').tab();

    $('.ui.dropdown').dropdown();

    $('#start-date-pick').calendar();
    $('#end-date-pick').calendar();

    // $('.ui.dropdown').dropdown({
	// 	direction:'dropdown'
    // });

    // $('#button-delete').click(function(){
    //     $('#delete-modal').modal('show');
    // });
    //
    // $(".btn-slide").click(function(){
	// 	$("#panel").slideToggle("slow");
	// 	$(this).toggleClass("active"); return false;
    // });

    // form validation
    // $(".ui.form").form({
    //     fields: {
    //         teamname: {
    //             identifier  : "teamname",
    //             rules: [
    //                 {
    //                     type   : "empty",
    //                     prompt : "Please enter a team name"
    //                 },
    //                 {
    //                     type: 'regExp[^[A-Za-z0-9_-]+$]',
    //                     prompt: 'Symbols ;, *, $ ^, etc. are not allowed.  '
    //                 },
    //                 {
    //                     type: 'maxLength[25]',
    //                     prompt: 'Team Name is too long.'
    //                 }
    //             ]
    //         },
    //     inline : true,
    //     on     : "blur"
    // });

});
