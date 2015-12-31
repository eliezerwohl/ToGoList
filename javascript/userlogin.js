window.userInfo = {
    eMail : "",
    fName : "",
    lName : "",
    userExists: "False" 
};
$(document).ready(function(){

  var loginOption, loginInput, userExists=0;
  var fbRefUsers;
  
  $("#newUserRegister").hide();
  $("#SuccessfulLogin").hide();
  $(".mainContainer").hide();
  $("#searchResultsDiv").hide();
  // $(".animation").hide();
  $("#showSavedList").hide();
  $("#saveResultsDiv").hide();

  // //just for faster search page testing 
  // $("#userLoginContainer").hide();
  // $(".mainContainer").show();
  // $("#newUserRegister").hide();
  // $("#SuccessfulLogin").hide();
  // $(".jumbotron").hide();
  // $("#searchHeader").hide();
  // //End of Integration Code
  
  var myFBRef = new Firebase("https://intense-inferno-5737.firebaseIO.com/");
  
  $("#loginOption").on("focusout",function(){  
    loginOption = $("#loginOption").val();
  });
  function validateEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
      console.log("yes an email")
      return true;
    } else {
      console.log("not a email")
      return false;
    }
  }
  $("#loginSubmit").on("click", function(e){
    e.preventDefault();
    loginInput = $("#loginInput").val();
    validateEmail(loginInput);

    if (validateEmail(loginInput)===false){
      $("#validationMessage").html("Invalid E-mail. Please enter the e-mail correctly").css("color","red");
    } else {
      $("#validationMessage").html("");
      checkIfUserExists(loginInput);

    }
  });

  function registerUser(loginInput) {
    //var fName,lName,eMail;

    $("#userLogin").hide();
    $("#newUserRegister").show();
    $("#eMail").val(loginInput);

    $("#register").on("click",function(e){
      e.preventDefault();

    userInfo.fName = $("#firstName").val();
    userInfo.lName = $("#lastName").val();
    userInfo.eMail = $("#eMail").val();

      fbRefUsers.child(userInfo.fName).set({
        eMail : userInfo.eMail,
        fName : userInfo.fName,
        lName : userInfo.lName
      });

      $("#userInputForm").hide();
      $("#SuccessfulLogin").show();
      $("#validationMessage").html("Congratulations "+userInfo.fName+", your account has been successfully created.")
       .append("Click 'Start Search' to start your search");   
   });
  }

  $("#startSearch").on("click",function(){

    $("#userloginRow").hide();
    $(".mainContainer").show();
    //$("#showSavedList").show();
    $("#welcomeUser").html("Welcome "+userInfo.fName+","+userInfo.lName);
    $("#searchResultsDiv").show();

  });
  function checkIfUserExists (eMail) {
    var userList;

    fbRefUsers = myFBRef.child("users");
    fbRefUsers.orderByChild("eMail").equalTo(eMail).once("child_added", function(snapshot) { //child_added vs value
    //fbRefUsers.orderByChild("eMail").on("child_added", function(snapshot) {
      var userList = snapshot.val();
      if (snapshot.val() !== null) {
        userInfo.fName = userList.fName;
        userInfo.lName = userList.lName;
        userInfo.eMail = userList.eMail;
        $("#userInputForm").hide();
        $("#SuccessfulLogin").show();
        console.log("first Name:"+userInfo.fName); 
        $("#validationMessage").html("Welcome Back, "+userInfo.fName+". Click 'Start Search' to start your search");
      } 
    });

    fbRefUsers.orderByChild("eMail").equalTo(eMail).once("value", function(snapshot) { //child_added vs value
      if (snapshot.val() === null) {
        registerUser(loginInput); 
      }
    });
  }
});