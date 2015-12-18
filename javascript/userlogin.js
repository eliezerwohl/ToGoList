$(document).ready(function(){

  var loginOption, loginInput, validInput=0;

  var myFBRef = new Firebase("https://intense-inferno-5737.firebaseIO.com/");

  $("#loginOption").on("focusout",function(){
    
    loginOption = $("#loginOption").val();

  });

  $("#loginSubmit").on("click",function(e){
    e.preventDefault();

    loginInput = $("#loginInput").val();

    if (loginOption === "E-mail" && !validateEmail(loginInput)){
      $("#validationMessage").html("Invalid E-mail. Please enter the e-mail correctly").css("color","red");
      validInput=0;
    }else {
      $("#validationMessage").html("");
      validInput=1;
    }

    if (validInput === 1){
      console.log ("Login Input :"+loginInput);
      myFBRef.set({
        email: loginInput,
        fName: "Chinmay",
        lName: "Das"
      });
    }

    //Enter validations for Phone -- Work to do 

  });

  function validateEmail (email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  }

});
