$(document).ready(function(){

  var loginOption, loginInput, validInput=0, userExists=0;

  $("#newUserRegister").hide();

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

      var fbRefUsers = myFBRef.child("users");

      fbRefUsers.orderByChild("email").on("child_added", function(snapshot) {
        debugger;
        var userList = snapshot.val();

          console.log("inside child :"+userList.email);
          if (userList.email === loginInput){
            userExists = 1;
          } 
      });

      if (userExists === 1){
        console.log ("User Exists");
      }else {
        console.log("Create a new user");
        $("#userLogin").hide();
        $("#newUserRegister").show();
        $("#eMail").val(loginInput);

        $("#register").on("click",function(e){
          e.preventDefault();

        var fName = $("#firstName").val();
        var lName = $("#lastName").val();
        var eMail = $("#eMail").val();

          fbRefUsers.child(fName).set({
            email : eMail,
            fName : fName,
            lName : lName
          });
        });
      }
      
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
