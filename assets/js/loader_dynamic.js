// script.js

$(document).ready(function () {
    // Fetch the list of files in the 'blogs/' folder
    $.ajax({
        url: 'blogs/',  // Update the path accordingly
        success: function (data) {
            // Convert the HTML string to a jQuery object
            var fileList = $(data);

            // Extract the anchor elements from the file list
            var anchorElements = fileList.find('a');

            // Extract the href attribute values (file names)
            var blogFiles = anchorElements.map(function () {
                return $(this).attr('href');
            }).get();

            // Remove any unwanted entries (like '..', '.' or non-HTML files)
            blogFiles = blogFiles.filter(function (file) {
                return file.endsWith('.html');
            });

            // Loop through the array and load content for each blog file
            blogFiles.forEach(function (blogFile) {
                console.log(blogFile);
                // Create a new div element for each blog
                var newDiv = $('<div>').addClass('individual-blog-card') //.append($('<div>').addClass('card').append($('<div>').addClass('card-body')));

                // Create three inner divs with specific classes
                var titleDiv = $('<h3>').addClass('blog_title');
                var dateDiv = $('<h4>').addClass('blog_date');
                var descriptionDiv = $('<p>').addClass('blog_description');

                // Append the inner divs to the new div
                newDiv.append(titleDiv, dateDiv, descriptionDiv);

                // Append the new div to the body (or any other container)
                $('#blog_card_info').append(newDiv).append($('<br/>'));

                // Load content from the current blog file and replace the content of the new div
                $.ajax({
                    url: blogFile,
                    dataType: 'html',
                    success: function (data) {

                        // Populate the inner divs with content from the loaded blog file
                        let a_tag = ($('<a>').attr('href', blogFile));
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

        },
        error: function () {
            console.error('Failed to fetch the list of blog files');
        }
    });
});
