// script.js

// script.js

$(document).ready(function () {
    // Array of blog filenames
    var blogFiles = ['blog1.html', 'blog2.html']; // Add more filenames as needed

    // Loop through the array and load content for each blog file
    blogFiles.forEach(function (blogFile) {
        // Create a new div element for each blog
        var newDiv = $('<div>').addClass('blog_section');

        // Create three inner divs with specific classes
        var titleDiv = $('<div>').addClass('title');
        var dateDiv = $('<div>').addClass('date');
        var descriptionDiv = $('<div>').addClass('description');

        // Append the inner divs to the new div
        newDiv.append(titleDiv, dateDiv, descriptionDiv);

        // Append the new div to the body (or any other container)
        $('#blog_indexer').append(newDiv);

        // Load content from the current blog file and replace the content of the new div
        $.ajax({
            url: 'blogs/' + blogFile,
            dataType: 'html',
            success: function (data) {
                console.log( $('<div>').html(data).find(".title").text());

                // Populate the inner divs with content from the loaded blog file
                let a_tag = ($('<a>').attr('href', 'blogs/' + blogFile));
                a_tag.text($('<div>').html(data).find('.title').text());
                titleDiv.html(a_tag);

                dateDiv.html($('<div>').html(data).find('.date').html());
                descriptionDiv.html($('<div>').html(data).find('.description').html());
            },
            error: function () {
                console.error('Failed to load ' + blogFile);
            }
        });
    });
});

