function chinmayDas() {
    $("#searchResultsDiv").show();
    $("#searchHeader").show();
    $("#showSavedList").show();
    $("tbody").empty();

    var userInput = $("#place").val();
    googleLocation(userInput);

  }

  function googleLocation(location) {
    var googleMapApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    googleMapApiUrl += "key=AIzaSyCxOOMQbm0o18JDWg7gbzcTEw6p0UAl3Lk";
    googleMapApiUrl += "&address=" + location;

    $.ajax({
      type:"GET",
      url:googleMapApiUrl,
      success: createPlaceList
    });
  }
    //console.log(response);
    //console.log(response.results[0].place_id);
    
    //createPlaceList(response);

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

    // });

  function createPlaceList(response){
    var lat,lan;
    lat= response.results[0].geometry.location.lat;
    lan= response.results[0].geometry.location.lng;

    //console.log("coordinates:"+lat+","+lan);

    var pyrmont = new google.maps.LatLng(lat,lan);
    var request = {
        location: pyrmont,
        radius: '100000', // radius in meters 
        //types:['restaurant']
        //types: 'campground|zoo|university|stadium|shopping_mall|restaurant|place_of_worship|park|museum|movie_theater'
      };

      service = new google.maps.places.PlacesService($('#mapsDiv').get(0));
      service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //for (var i = 0; i < results.length; i++) { 
        for (var i = 0; i < 10; i++) { //To limit search to 10 results
          var place = results[i];
          if (place) {
            createPlaceSearchResults(place);
          } else {
            continue;
          }         
        }
      }
    }
  }

  function createPlaceSearchResults(place){
    var newRow, searchTd, saveButton, saveTd,name,lat,lng;
    name = place.name;
    lat = place.geometry.location.lat();
    lng = place.geometry.location.lng();

    newRow = $("<tr>");
    
    searchTd = $("<td>").addClass("searchResults").append(name);
    latTD = $("<td>").addClass("latLang lat").append(lat);
    lngTD = $("<td>").addClass("latLang lng").append(lng);
    saveButton = $("<button>").addClass("btn btn-info saveSearch col-md-12").append("Save");
    saveTd = $("<td>").append(saveButton).addClass("col-md-1");
    newRowDiv = $("<div>").addClass("col-md-12");
    showPictures = $("<a>").addClass("showPicClass").append("Flicker Photos");
    //moreInfoFromWiki = $("<a>").addClass("moreWikiInfo").append("More Info from Wiki");
    newRow.append(searchTd.append(newRowDiv.append(showPictures)))
          .append(latTD).append(lngTD).append(saveTd);
    
    $("tbody").append(newRow);
    $(".latLang").hide();
    $(".infoRow").hide();
  }
  $("#showSavedList").on("click",function(e){
    var myFBRef,fbRefUserSave, fName,lat,lng;

    $(".mainContainer").show();
    $("tbody").empty();

    myFBRef = new Firebase("https://intense-inferno-5737.firebaseIO.com/");
    fName = "users/"+userInfo.fName+"/savedLocations";
    fbRefUserSave = myFBRef.child(fName);

    fbRefUserSave.orderByKey().on("child_added", function(snapshot) {
      var locationID, locationName;

      locationID = snapshot.key();
      locationName = snapshot.val().location;
      createSavedResults(locationID,locationName);
    });
  });

  function createSavedResults(locationID,locationName){
    var newRow, locationIDTd,locationName,deleteButton, deleteTd;
    
    $("#searchHeader").html("Saved Places");

    newRow = $("<tr>").addClass("savedRow");
    
    locationIDTd = $("<td>").addClass("locationID").append(locationID);
    locationName = $("<td>").addClass("locationName").append(locationName);
    deleteButton = $("<button>").addClass("btn btn-danger deleteSearch col-md-12").append("Delete");
    deleteTd = $("<td>").append(deleteButton).addClass("col-md-1");
    newRow.append(locationIDTd).append(locationName).append(deleteTd);
    //console.log(newRow);
    //debugger;
    $("tbody").append(newRow);
    $(".infoRow").hide();
    $(".locationID").hide();
  }
  $("table").on("click", ".showPicClass", function() {
    var lat, lng;

    $(".infoRow").hide();
    infoRow = $("<div>").addClass("infoRow");
    //infoHide = saveButton = $("<button>").addClass("btn btn-danger hideInfo col-md-1").append("Hide");

    $(this).append(infoRow);

    lat = $(this).parent().parent().next().text();
    lng = $(this).parent().parent().next().next().text();

    callFlickerAPI(lat,lng); //Call Flicker API to get photos around that location

  });

  $("table").on("click",".deleteSearch",function(){
    var keyTobeRemoved, dbLocation;
    keyTobeRemoved = $(this).parent().prev().prev().text();
    dbLocation = "users/"+userInfo.fName+"/savedLocations/"+keyTobeRemoved;
    myFBRef = new Firebase("https://intense-inferno-5737.firebaseIO.com/");
    fbRefUserSave = myFBRef.child(dbLocation);
    fbRefUserSave.remove();
    $(this).parent().parent().hide();

  });

  $("table").on("click", ".saveSearch", function() {
    var myFBRef,fbRefUserSave,fName,lat,lan,locationName;
    
    fName = "users/"+userInfo.fName+"/savedLocations";
    lat = $(this).parent().prev().prev().text();
    lan = $(this).parent().prev().text();
    locationName = $(this).parent().prev().prev().prev().text().replace("Flicker Photos","");

    myFBRef = new Firebase("https://intense-inferno-5737.firebaseIO.com/");
    fbRefUserSave = myFBRef.child(fName);

    fbRefUserSave.push({
      lat: lat,
      lan: lan,
      location: locationName
    });
    $(".savedRow").hide();

  });  

  function callFlickerAPI(lat,lng){
    var flickrApiUrl = "https://api.flickr.com/services/rest/?";
    var flickrApiParams = {
      api_key: "5d0b99b598780adb1ce7f682110a03e6",
      method: "flickr.photos.search",
      format: "json",
      nojsoncallback: 1,
      lat:lat,
      lon:lng
    } 
    $.ajax({
      type: "GET",
      url: flickrApiUrl + $.param(flickrApiParams),
      success: flickrSuccessHandler
    })
  }

  function flickrSuccessHandler(response) {
    var locationPhotos = response.photos.photo;
    //for(var i = 0; i < locationPhotos.length; i++) {
    for(var i = 0; i < 10; i++) { //Limit to 10 Photos around the location
      var newCol = buildThumbnail(locationPhotos[i]);
      $(".infoRow").append(newCol);
    }
  }

  function buildThumbnail(photoData) {
    var photoUrl = "https://farm" + photoData.farm;
    photoUrl += ".staticflickr.com/" + photoData.server;
    photoUrl += "/" + photoData.id;
    photoUrl += "_" + photoData.secret + ".jpg";

    var colDiv = $("<div>").addClass("col-md-2");
    var thumbnailDiv = $("<div>").addClass("thumbnail");
    var photoImg = $("<img>").attr("src", photoUrl);
    var captionDiv = $("<div>").addClass("caption");
    // var picTitle = $("<p>").append(photoData.title);

    colDiv.append(thumbnailDiv
      .append(photoImg)
      .append(captionDiv
        // .append(picTitle)
      )
    );

    return colDiv;
  }
