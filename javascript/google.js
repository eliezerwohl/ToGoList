// $(document).ready(function() {

//   $("#userSearch").on("click", function(e){
//     e.preventDefault()
//     var userInput = $("#searchInput").val();
//     var googleMapApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
//     googleMapApiUrl += "key=AIzaSyCxOOMQbm0o18JDWg7gbzcTEw6p0UAl3Lk";
//     googleMapApiUrl += "&address=" + userInput;

//     $.ajax({
//       type:"GET",
//       url:googleMapApiUrl,
//        success: function (response){
//         var googleGeoLocation = response.results[0].geometry.location;  
//         // first and only thing in the array of results, hence the 0 
//          console.log(googleGeoLocation);
//        }
//     });
//   });
// });
