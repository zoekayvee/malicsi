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
});
