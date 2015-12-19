$(document).ready(function() {
  $(".btn").on("click", function(e){
    e.preventDefault()
    var userInput = $("#searchInput").val();
    // var userInput = $("#searchInput").val();
    var wikipediaUrl = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&";
    wikipediaUrl += "search="+ userInput + "&format=json";



    $.ajax({
      type:"GET",
      url:wikipediaUrl,
       success: function (response){
       console.log(response[2][0]);
       $(".wiki").html(response[2][0]);

       }
    });
  });
});


// do wikipedia searc