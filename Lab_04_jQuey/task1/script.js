$(document).ready(function () {
    // Handle adding an item
    $('#add-btn').on('click', function () {
        const itemText = $('#item-input').val().trim();

        if (itemText !== "") {
            // Create list item dynamically
            const li = $('<li></li>').text(itemText);

            // Create delete button dynamically
            const deleteBtn = $('<button></button>')
                .text('Delete')
                .addClass('delete-btn');

            // Append button to li, then li to ul
            li.append(deleteBtn);
            $('#dynamic-list').append(li);

            // Clear the input
            $('#item-input').val('');
        } else {
            alert('Please enter a valid item.');
        }
    });

    // Handle pressing Enter
    $('#item-input').on('keypress', function (e) {
        if (e.which === 13) {
            $('#add-btn').click();
        }
    });

    // Handle hover to highlight item (DOM / CSS Manipulation via JS)
    $('#dynamic-list').on('mouseenter', 'li', function () {
        $(this).addClass('hover-highlight');
    }).on('mouseleave', 'li', function () {
        $(this).removeClass('hover-highlight');
    });

    // Handle removing an item using event delegation
    $('#dynamic-list').on('click', '.delete-btn', function () {
        // Fade out and remove the parent li element
        $(this).parent('li').fadeOut(300, function () {
            $(this).remove();
        });
    });
});
