$(document).ready(function() {

    $.get('/user_loggedin', function(data){
        console.log(data);
        if(data != "") {
            window.location.replace("/#!/user/home");
        }
    });

    $(".ui.form").form({
        fields: {
            username: {
                identifier  : "username",
                rules: [
                    {
                        type   : "empty",
                        prompt : "Please enter your username"
                    }
                ]
            },
            password: {
                identifier  : "password",
                rules: [
                    {
                        type   : "empty",
                        prompt : "Please enter your password"
                    }
                ]
            },
        },
        inline : true,
        on     : "blur"
    });
});
