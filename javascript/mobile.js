function mobileCheck() {
  if ($(window).innerWidth() <= 768){
   $(".btn-lg").show()
   $(".panel").hide()
  }
  else{
     $(".btn-lg").hide()
   $(".panel").show()
  }
}
  $("body").on("click", ".wikiButton", function(){
  $(".wikiPanel").toggle();
});
    $("body").on("click", ".flightButton", function(){
  $(".flightPanel").toggle();
});

  $("body").on("click", ".picButton", function(){
  $(".picPanel").toggle();
});
   // $(this).closest(".resultImageContainer")

