$(document).ready(function() {
 var userInput;
 $("#userSearch").on("click", function(e){
  userInput = $("#searchInput").val();
  e.preventDefault()
    if (countryFilter(userInput)){
      $(".validCountry").hide();
      console.log("its's super true country time");
      wiki(userInput);
    }else {
      console.log ("it's super false not country time")
      $(".validCountry").show();
    }
  });
});