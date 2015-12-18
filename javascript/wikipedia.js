$(document).ready(function() {
  $(".btn").on("click", function(e){
    e.preventDefault()
    // var userInput = $("#searchInput").val();
    var wikipediaUrl = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=37.786971|-122.399677&format=json";
    // wikipediaUrl += "action=query&titles=Main%20Page&prop=revisions&rvprop=content";
    // wikipediaUrl += "&format=json";

    $.ajax({
      type:"GET",
      url:wikipediaUrl,
       success: function (response){
       console.log(response)
       }
    });

  });
});
