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
      mobileCheck()
      wiki(userInput);
    }else {
      $(".validCountry").show();
      $(".wiki, .countryName").empty();
    }
  }
});