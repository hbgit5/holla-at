var flickr_api_key = '57657b59ac543231802f9b3093c35a3e';
var flickr_api_url = 'https://api.flickr.com/services/rest';
var flickr_photo_url = 'https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_b.jpg';

var photos_container;

$(function () {
    photos_container = $('#photos_container');
    $('#search-btn').click(function () {
        //1.get the value from the search field
        var search_value = $('#flickr-search').val();

        //2.search flickr with that value
        search(search_value, 10);

    });
});

function search(tag_values, count) {
    photos_container.empty();

    var params = {
        method: "flickr.photos.search",
        api_key: flickr_api_key,
        tags: tag_values,
        per_page: count,
        format: "json",
        nojsoncallback: 1,
    }

    $.getJSON(flickr_api_url, params,
        function (response) {
            console.log(response);
            var photos = response.photos.photo;
            //console.log(photos);
            for (var i = 0; i < photos.length; i++) {

                /*var url = "https:farm"+photos[i].farm+
            ".staticflickr.com/"+photos[i].server+
            "/"+ photos[i].id +
            "_"+photos[i].secret +
            "_m.jpg";
            */
                //The following variable/replace takes the place of string contantination that we originally used. 
                var url = flickr_photo_url
                    .replace('{farm-id}', photos[i].farm)
                    .replace('{server-id}', photos[i].server)
                    .replace('{id}', photos[i].id)
                    .replace('{secret}', photos[i].secret);
                console.log(url);
var figure = $('<figure>');
                var img = $('<img>').addClass('image')
                    .attr('src', url);
                figure.append(img);
                photos_container.append(figure);
                /*img.animate({
                        opacity: 1

                    },
                    1000);
                    */
            }
        }
    );
}