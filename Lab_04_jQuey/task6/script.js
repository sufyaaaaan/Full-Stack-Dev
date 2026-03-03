$(document).ready(function () {
    let currentPage = 1;
    const limit = 5;

    function fetchPosts(page) {
        $('#loader').show();
        $('#load-more-btn').prop('disabled', true);

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
            method: 'GET',
            success: function (posts) {
                $('#loader').hide();
                $('#load-more-btn').prop('disabled', false);

                if (posts.length > 0) {
                    posts.forEach(function (post) {
                        const postHtml = `
                            <div class="post-card" style="display: none;">
                                <h2 class="post-title">${post.id}. ${post.title}</h2>
                                <p class="post-body">${post.body}</p>
                            </div>
                        `;
                        const $postElement = $(postHtml);
                        $('#data-list').append($postElement);

                        // DOM Manipulation & Animation implicitly used
                        $postElement.fadeIn(400);
                    });
                } else {
                    $('#load-more-btn').hide(); // No more data
                }
            },
            error: function (err) {
                $('#loader').hide();
                $('#load-more-btn').prop('disabled', false);
                alert("Failed to fetch data.");
            }
        });
    }

    // Initial Load
    fetchPosts(currentPage);

    // Event Handling
    $('#load-more-btn').on('click', function () {
        currentPage++;
        fetchPosts(currentPage);
    });
});
