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

    //console.log(response);
    //console.log(response.results[0].place_id);
    
    createPlaceList(response);

    // var request = {
    //   placeId: response.results[0].place_id
    // };
    // places = new google.maps.places.PlacesService($('#picturesDiv').get(0));

    // places.getDetails(request, callback);

    // function callback(place, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log("successful place services");
    //     createPlacePhotos(place);
    //   }
    // }
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
    var lat,lan;

    lat= response.results[0].geometry.location.lat;
    lan= response.results[0].geometry.location.lng;

    var pyrmont = new google.maps.LatLng(lat,lan);
    var request = {
        location: pyrmont,
        radius: '100',
        //types: 'campground|zoo|university|stadium|shopping_mall|restaurant|place_of_worship|park|museum|movie_theater'
      };

      service = new google.maps.places.PlacesService($('#searchResultsDiv').get(0));
      service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //for (var i = 0; i < results.length; i++) { //To limit search to 20 results
        for (var i = 0; i < 20; i++) {
          var place = results[i];
          createPlaceSearchResults(results[i]);
        }
      }
    }
  }

  function createPlacePhotos(place) {

    //console.log(place.PlacePhoto);

    // var locationPhotos = place.photos;
    // for(var i = 0; i < locationPhotos.length; i++) {
    //   var newCol = buildThumbnail(locationPhotos[i]);
    //   $("#photosRow").append(newCol);
    // }
  }
  function createPlaceSearchResults(place){
    var newRow, searchTd, saveButton, saveTd,name,placeId;

    console.log(place);

    name = place.name;
    placeId = place.place_id;

    //console.log(name);

    newRow = $("<tr>");
    searchTd = $("<td>").addClass("searchResults").apped(name);
    console.log(searchTd);
    saveButton = $("<button>").addClass("btn btn-info").append("Save");
    saveTd = $("<td>").append(saveButton);

    newRow.append(searchTd).append(saveTd);
    console.log (newRow);
    $("tbody").append(newRow);
    console.log("After the tbody call");
  }

});
