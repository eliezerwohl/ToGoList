$(document).ready(function() {
 var userInput;
 $("#placeSearch").on("click", function(e){
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
  userInput = $("#place").val();
    if (countryFilter(userInput)){
      $(".animation").empty();
      $(".validCountry").hide();
      mobileCheck()
      mobileBind()
      wiki(userInput)
    }else {
      $(".validCountry").show();
      $(".nameRow").hide();
      $(".panel").hide()
      $(".wiki, .countryName").empty();
      mobileUnbind();
    }
  }
});