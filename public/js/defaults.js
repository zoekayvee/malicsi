$(document).ready(function(){

    $.get('/user_loggedin', function(data){
        if(data == "") {
            $("#home-anchor").hide();
            $("#admin-anchor").hide();
            $("#events-anchor").hide();
            $("#identity-wrapper").hide();
        }
        else if(data != "1") {
            $("#admin-anchor").hide();
        } 
    });

});
