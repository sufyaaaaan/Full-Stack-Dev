$(document).ready(function () {
    // Array of image objects representing the gallery
    const images = [
        {
            src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&h=400&fit=crop",
            caption: "Beautiful Sunrise"
        },
        {
            src: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&h=400&fit=crop",
            caption: "Dense Forest"
        },
        {
            src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop",
            caption: "Majestic Mountains"
        },
        {
            src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
            caption: "Misty Valley Morning"
        }
    ];

    let currentIndex = 0;

    // Helper to update UI state
    function updateControls() {
        $('#prev-btn').prop('disabled', currentIndex === 0);
        $('#next-btn').prop('disabled', currentIndex === images.length - 1);
    }

    function switchImage(index) {
        // Find wrapper context
        const $img = $('#gallery-image');
        const $caption = $('#image-caption');

        // Use chaining with Effects & Animations
        $img.parent().fadeTo(300, 0.1, function () {
            // Update source and text while faded out
            $img.attr('src', images[index].src);
            $caption.text(images[index].caption);

            // Fade back in
            $(this).fadeTo(400, 1);
        });

        // Update index state
        currentIndex = index;
        updateControls();
    }

    // Event Handling
    $('#next-btn').on('click', function () {
        if (currentIndex < images.length - 1) {
            switchImage(currentIndex + 1);
        }
    });

    $('#prev-btn').on('click', function () {
        if (currentIndex > 0) {
            switchImage(currentIndex - 1);
        }
    });

    // Initialize controls
    updateControls();
});
