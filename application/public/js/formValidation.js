var a = document.getElementById("userLetter");
var b = document.getElementById("userLength");
var c = document.getElementById("emailConfirm");
var d = document.getElementById("passLength");
var e = document.getElementById("passUpper");
var f = document.getElementById("passNumber");
var g = document.getElementById("passSpecial");
var h = document.getElementById("passConfirm");

var pass1 = 0;
var pass2 = 0;
var pass3 = 0;
var pass4 = 0;
var pass5 = 0;
var pass6 = 0;

function setAllNone(){
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "none";
    d.style.display = "none";
    e.style.display = "none";
    f.style.display = "none";
    g.style.display = "none";
    h.style.display = "none";
}

function showUserReq(){
    var username = document.getElementById("userName").value;

    setAllNone();
    a.style.display = "block";
    b.style.display = "block";
    
    if((/[a-zA-Z]/).test(username.charAt(0))){
        a.style.display = "none";
    }
    if(username.length >= 3){
        b.style.display = "none";
    }

    if(a.style.display == "none" && b.style.display == "none"){
        pass1 = 1;
    }else{pass1 = 0;}
}

function showEmailReq(){
    var email = document.getElementById("email").value;

    setAllNone();
    c.style.display = "block";

    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        c.style.display = "none"
    }

    if(c.style.display == "none"){
        pass2 = 1;
    }else{pass2 = 0;}
}

function showPasswordReq(){
    var password = document.getElementById("password").value;

    setAllNone();
    d.style.display = "block"
    e.style.display = "block"
    f.style.display = "block"
    g.style.display = "block"

    if(password.length >= 8){
        d.style.display = "none";
    }
    if((/[A-Z]/).test(password)){
        e.style.display = "none";
    }
    if((/\d/g).test(password)){
        f.style.display = "none"
    }
    if((/[ / * + ! @ # $ ^ & * -]/).test(password)){
        g.style.display = "none";
    }

    if(d.style.display == "none" && e.style.display == "none" && f.style.display == "none" && g.style.display == "none"){
        pass3 = 1;
    }else{pass3 = 0;}
}

function showPassConfirmReq(){
    var passConfirm = document.getElementById("cPassword").value;
    var password = document.getElementById("password").value;

    setAllNone();
    h.style.display = "block";

    if(passConfirm == password){
        h.style.display = "none";
    }

    if(h.style.display == "none"){
        pass4 = 1;
    }else{pass4 = 0;}
}

function ageBoxCheck(){
    if(document.getElementById("check1").checked){
        pass5 = 1;
    }else{pass5 = 0;}
}

function tosBoxCheck(){
    if(document.getElementById("check2").checked){
        pass6 = 1;
    }else{pass6 = 0;}
}

function submitForms(){
    var userText = emailText = passText = cPassText = ageCheckTest = tosCheckTest = "";
  if(pass1 == 0 || pass2 == 0 || pass3 == 0 || pass4 == 0 || pass5 == 0 || pass6 == 0){
      
      if(pass1 == 0){
        userText = "-Username \n"
      }
      if(pass2 == 0){
        emailText = "-Email \n"
      }
      if(pass3 == 0){
        passText = "-Password \n"
      }
      if(pass4 == 0){
          cPassText = "-Confirm Password \n"
      }
      if(pass5 == 0){
          ageCheckTest = "-Age Checkbox \n"
      }
      if(pass6 == 0){
          tosCheckTest = "-TOS and Privacy Rules Checkbox"
      }
      var message = "Make sure you correctly filled out these sections: \n" + userText + emailText + passText + cPassText + ageCheckTest + tosCheckTest
      alert(message);
  }else{
    location.reload();
  }
}