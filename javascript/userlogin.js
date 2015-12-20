$(document).ready(function(){

  var loginOption, loginInput, userExists=0;
  var fbRefUsers;
  
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
    }else {
      $("#validationMessage").html("");
      if(checkIfUserExists(loginInput)){
        console.log("User Existing");
      } else {
        console.log("Create a new user"); //first time it comes to else not sure why ??
        registerUser(loginInput); //Adds user to the database
      }
      $(this).load("home.html");  
    }
  });

  function registerUser(loginInput) {
    $("#userLogin").hide();
    $("#newUserRegister").show();
    $("#eMail").val(loginInput);

    $("#register").on("click",function(e){
      e.preventDefault();

    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var eMail = $("#eMail").val();

      fbRefUsers.child(fName).set({
        eMail : eMail,
        fName : fName,
        lName : lName
      });
   });
  }

  function validateEmail (email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  function checkIfUserExists (eMail) {
    fbRefUsers = myFBRef.child("users");
    console.log("user E-mail :"+eMail);
    //fbRefUsers.orderByChild("eMail").equalTo(eMail).once("value", function(snapshot) {
    fbRefUsers.orderByChild("eMail").on("child_added", function(snapshot) {
      var userList = snapshot.val();
      console.log(userList.eMail);
      if(userList.eMail === eMail) {
        return true;
      } else {
        return false;
      }
    });
  }
});
