$(document).ready(function () {
    const $textBlock = $('#text-block');

    // Chained Style Editor Actions
    $('#btn-large').on('click', function () {
        // Apply multiple styles using chaining
        $textBlock.css('font-size', '24px')
            .css('color', '#007bff')
            .css('font-weight', 'bold');
    });

    $('#btn-highlight').on('click', function () {
        // Apply multiple styles using chaining
        $textBlock.css('background-color', '#fff3cd')
            .css('font-style', 'italic')
            .css('color', '#856404')
            .css('border-color', '#ffeeba');
    });

    $('#btn-reset').on('click', function () {
        // Remove all inline styles added by jQuery
        $textBlock.removeAttr('style');
    });
});
