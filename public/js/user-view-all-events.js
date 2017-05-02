$(document).ready(function(){

    $.get('/user_loggedin', function(data){
        if(data == "") {
            // console.log("hashdkjhaskjd");
            $("#home-anchor").hide();
            $("#events-anchor").hide();
        }
    });

});
