$(document).ready(function () {
    $('.tab-links a').on('click', function (e) {
        e.preventDefault();

        const $this = $(this);
        const targetId = $this.attr('href');

        // Remove active class from all links and tabs
        $('.tab-links a').removeClass('active');
        $('.tab').removeClass('active').hide();

        // Add active class to clicked link
        $this.addClass('active');

        // Show corresponding tab content dynamically with animation
        $(targetId).fadeIn(400).addClass('active');

        // Smooth scroll to the tabs section
        $('html, body').animate({
            scrollTop: $('#tabs-section').offset().top - 20 // 20px padding offset
        }, 600);
    });
});
