//var pw= $(".ui.form form").form.("get value","password");

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
            password2: {
                identifier  : "password2",
                rules: [
                    {
                        type   : 'match[password]',
                        prompt : "Password entered does not match."
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
                        prompt : 'Please enter your first name'
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
                        prompt : 'Please enter your last name'
                    },
                    {
                        type: 'regExp[^[A-Za-z]+$]',
                        prompt: 'Letters Only'
                    },
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
                        type   : 'decimal',
                        prompt : 'Please enter your height'
                    }
                ]
            },
            weight: {
                identifier  : 'weight',
                rules: [
                    {
                        type   : 'decimal',
                        prompt : 'Please enter your weight'
                    }
                ]
            },
            age: {
                identifier  : 'age',
                rules: [
                    {
                        type   : 'integer[1..999]',
                        prompt : 'Please enter your age.'
                    }
                ]
            },
            contactno: {
                identifier  : 'contactno',
                rules: [
                    {
                        type   : 'integer',
                        prompt : 'Please enter your contact number.'
                    },
                    {
                        type: 'regExp[^09]',
                        prompt: 'Contact number should start in "09"'
                    },
                    {
                        type: 'maxLength[11]',
                        prompt: 'Please enter your contact number.'
                    }
                ]
            },
        },
        inline : true,
        on     : "blur"
    });
});
