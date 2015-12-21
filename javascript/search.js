$(document).ready(function() {
 var userInput;
 $("#userSearch").on("click", function(e){
    e.preventDefault()
    userSearch();
  });

  $('input').keyup( function( e ) {
    if(e.keyCode == 13) {
      userSearch();
      e.preventDefault();
    }
  });
  function userSearch() {
  userInput = $("#searchInput").val();
    if (countryFilter(userInput)){
      $(".animation").empty();
      $(".validCountry").hide();
      console.log("its's super true country time");
      wiki(userInput);
    }else {
      console.log ("it's super false not country time")
      $(".validCountry").show();
      $(".wiki, .countryName").empty();
    }
  }
});