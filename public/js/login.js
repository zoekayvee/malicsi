$(document).ready(function() {
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
            firstname: {
                identifier  : 'firstname',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your firstname'
                    }
                ]
            },
            lastname: {
                identifier  : 'lastname',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your lastname'
                    }
                ]
            },
            usertype: {
                identifier  : 'usertype',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please select your usertype'
                    }
                ]
            },
        },
        inline : true,
        on     : "blur"
    });
<<<<<<< HEAD
=======


   /* $("select.dropdown").dropdown();
    $("#page-navigation").hide();
    $("#page-footer").hide();*/

    // $("#register-trigger").click(function(){
    //     $("#login-div").slideUp("fast");
    //     $("#register-div").slideDown("fast");
    // });
    //
    // $("#login-trigger").click(function(){
    //     $("#login-div").slideDown("fast");
    //     $("#register-div").slideUp("fast");
    // });


>>>>>>> 6f1608fba3c630aa8dfd789e05eb0ffd9e4ccbcb
});
