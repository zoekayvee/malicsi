$(document).ready(function(){
    $.get('/user_loggedin', function(data){
        console.log(data);
        if(data != "") {
            window.location.replace("/#!/user/home");
        }
    });
});
