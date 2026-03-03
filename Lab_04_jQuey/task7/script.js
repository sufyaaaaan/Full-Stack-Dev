$(document).ready(function () {
    // Initialize jQuery UI Sortable
    $('#sortable-list').sortable({
        placeholder: "sortable-highlight", // CSS class for placeholder
        handle: ".drag-handle", // Which element triggers the drag
        cursor: "grabbing", // Change cursor during drag
        update: function (event, ui) {
            // Function called when order is successfully changed
            updateOrder();
            // Highlight dropped item temporarily
            ui.item.css('background-color', '#d4edda');
            setTimeout(() => {
                ui.item.css('background-color', '');
            }, 500);
        }
    });

    // Prevent text selection inside sortable
    $('#sortable-list').disableSelection();

    // Function to dynamically update order output
    function updateOrder() {
        let orderArrays = [];
        $('#sortable-list li').each(function () {
            orderArrays.push($(this).data('id'));
        });

        $('#order-result').text(orderArrays.join(', '));
    }
});
