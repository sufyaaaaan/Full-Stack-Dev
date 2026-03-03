$(document).ready(function () {
    let isValidUsername = false;
    let isValidEmail = false;
    let isValidPassword = false;

    function checkFormValidity() {
        if (isValidUsername && isValidEmail && isValidPassword) {
            $('#submit-btn').prop('disabled', false);
        } else {
            $('#submit-btn').prop('disabled', true);
        }
    }

    function setValid($element) {
        $element.removeClass('is-invalid').addClass('is-valid');
        $element.siblings('.error-text').slideUp();
    }

    function setInvalid($element) {
        $element.removeClass('is-valid').addClass('is-invalid');
        $element.siblings('.error-text').slideDown();
    }

    // Username blur
    $('#username').on('blur', function () {
        if ($(this).val().trim().length >= 3) {
            setValid($(this));
            isValidUsername = true;
        } else {
            setInvalid($(this));
            isValidUsername = false;
        }
        checkFormValidity();
    });

    // Email blur
    $('#email').on('blur', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test($(this).val())) {
            setValid($(this));
            isValidEmail = true;
        } else {
            setInvalid($(this));
            isValidEmail = false;
        }
        checkFormValidity();
    });

    // Password blur
    $('#password').on('blur', function () {
        if ($(this).val().length >= 6) {
            setValid($(this));
            isValidPassword = true;
        } else {
            setInvalid($(this));
            isValidPassword = false;
        }
        checkFormValidity();
    });

    // Form Submission
    $('#registration-form').on('submit', function (e) {
        e.preventDefault(); // Prevent page refresh

        // Hide form and show success using DOM Manipulation/Animation
        $(this).slideUp(400, function () {
            $('#success-message').removeClass('hidden').hide().fadeIn();
        });
    });
});
