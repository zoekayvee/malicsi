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
                        type   : "empty",
                        prompt : "Please re-enter your password"
                    },
                    {
                        type   : 'match[password]',
                        prompt : "Re-entered password does not match."
                    }
                ]
            },
            email: {
                identifier  : "email",
                optional: true,
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
                        type: 'regExp[^[A-Za-z ]+$]',
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
                        type: 'regExp[^[A-Za-z ]+$]',
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
                optional: true,
                rules: [
                    {
                        type   : 'decimal',
                        prompt : 'Please enter your height'
                    }
                ]
            },
            location: {
                identifier  : 'location',
                optional: true,
                rules: [
                    {
                         type: 'maxLength[100]',
                        prompt: 'Location is too long.'
                    }
                ]
            },
            college: {
                identifier  : 'college',
                optional: true,
                rules: [
                    {
                         type: 'maxLength[50]',
                        prompt: 'College name is too long.'
                    }
                ]
            },
            weight: {
                identifier  : 'weight',
                optional: true,
                rules: [
                    {
                        type   : 'decimal',
                        prompt : 'Please enter your weight'
                    }
                ]
            },
            age: {
                identifier  : 'age',
                optional: true,
                rules: [
                    {
                        type   : 'integer[1..999]',
                        prompt : 'Please enter your age.'
                    }
                ]
            },
            contactno: {
                identifier  : 'contactno',
                optional: true,
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
