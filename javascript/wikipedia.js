  function wiki(userInput) {
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
  };