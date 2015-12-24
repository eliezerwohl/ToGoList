$(document).ready(function() {

  $("#placeSearch").on("click", function(e){
    e.preventDefault()
    var userInput = $("#place").val();
    var googleMapApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    googleMapApiUrl += "key=AIzaSyCxOOMQbm0o18JDWg7gbzcTEw6p0UAl3Lk";
    googleMapApiUrl += "&address=" + userInput;

    $.ajax({
      type:"GET",
      url:googleMapApiUrl,
      success: googleApiSuccessHandler
    });
  });

  function googleApiSuccessHandler(response) {

    console.log(response);
    console.log(response.results[0].place_id);
    
    createPlaceList(response);

    var request = {
      placeId: response.results[0].place_id
    };
    places = new google.maps.places.PlacesService($('#picturesDiv').get(0));

    places.getDetails(request, callback);

    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("successful place services");
        createPlacePhotos(place);
      }
    }
    //var geoLocation = response.results[0].geometry.location;
    // var flickrApiUrl = "https://api.flickr.com/services/rest/?";
    // var flickrApiParams = {
    //   api_key: "5d0b99b598780adb1ce7f682110a03e6",
    //   method: "flickr.photos.search",
    //   format: "json",
    //   nojsoncallback: 1,
    //   lat: geoLocation.lat,
    //   lon: geoLocation.lng
    // }
    
    // $.ajax({
    //   type: "GET",
    //   url: flickrApiUrl + $.param(flickrApiParams),
    //   success: flickrSuccessHandler
    // });
  }

  function createPlaceList(response){
    var pyrmont = new google.maps.LatLng(18.5204303,73.8567437);
    var request = {
        location: pyrmont,
        radius: '100',
        query: 'places to eat'
      };

      service = new google.maps.places.PlacesService($('#picturesDiv').get(0));
      service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place);
          //createMarker(results[i]);
        }
      }
    }
  }

  function createPlacePhotos(place) {

    console.log(place.PlacePhoto);

    // var locationPhotos = place.photos;
    // for(var i = 0; i < locationPhotos.length; i++) {
    //   var newCol = buildThumbnail(locationPhotos[i]);
    //   $("#photosRow").append(newCol);
    // }
  }

});
