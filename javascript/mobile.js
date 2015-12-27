function mobileCheck() {
  if ($(window).innerWidth() <= 768){
   $(".btn-lg").show();
   $(".panel").hide();
  }
  else{
     $(".btn-lg").hide()
   $(".panel").show()
  }
}
function mobileBind(){
  $(".wikiButton").on("click", function(e){
    e.preventDefault()
  $(".wikiPanel").toggle();
});
  $(".flightButton").on("click", function(e){
    e.preventDefault()
  $(".flightPanel").toggle();
});

  $(".placesButton").on("click", function(e){
    e.preventDefault()
  $(".placesPanel").toggle();
});
}
function mobileUnbind(){  
$("btn-alert").off("click");
}
