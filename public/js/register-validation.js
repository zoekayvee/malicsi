$(document).ready(function() {
    $(".ui.form").form({
        fields: {
            username: {
                identifier  : "username",
                rules: [
                    {
                        type   : "empty",
                        prompt : "Please enter your username"
                    },
                    {
                        type: 'regExp[^[A-Za-z0-9_-]+$]',
                        prompt: 'Symbols ;, *, $ ^, etc. are not allowed.  '
                    },
                    {
                        type: 'maxLength[50]',
                        prompt: 'Username is too long.'
                    }
                ]
            },
            password: {
                identifier  : "password",
                rules: [
                    {
                        type   : "empty",
                        prompt : "Please enter your password"
                    },
                    {
                        type: 'maxLength[100]',
                        prompt: 'Password is too long.'
                    }
                ]
            },
            email: {
                identifier  : "email",
                rules: [
                    {
                        type   : "email",
                        prompt : "Please enter your email"
                    }
                ]
            },
            firstname: {
                identifier  : 'firstname',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your firstname'
                    },
                    {
                        type: 'regExp[^[A-Za-z]+$]',
                        prompt: 'Letters Only'
                    },
                    {
                        type: 'maxLength[50]',
                        prompt: 'First name is too long.'
                    }
                ]
            },
            lastname: {
                identifier  : 'lastname',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Please enter your lastname'
                    },
                    {
                        type: 'regExp[^[A-Za-z]+$]',
                        prompt: 'Letters Only'
                    },
                    ,
                    {
                        type: 'maxLength[50]',
                        prompt: 'Last name is too long.'
                    }
                ]
            },
            height: {
                identifier  : 'height',
                rules: [
                    {
                        type   : 'number',
                        prompt : 'Please enter your height'
                    }
                ]
            },
             weight: {
                identifier  : 'weight',
                rules: [
                    {
                        type   : 'number',
                        prompt : 'Please enter your weight'
                    }
                ]
            },
        },
        inline : true,
        on     : "blur"
    });
});
