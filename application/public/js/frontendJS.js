// Displays required info for registering account
var a = document.getElementById("userLetter");
var b = document.getElementById("userLength");
var c = document.getElementById("emailConfirm");
var d = document.getElementById("passLength");
var e = document.getElementById("passUpper");
var f = document.getElementById("passNumber");
var g = document.getElementById("passSpecial");
var h = document.getElementById("passConfirm");

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
    var username = document.getElementById("username").value;

    setAllNone();
    a.style.display = "block";
    b.style.display = "block";
    
    if((/[a-zA-Z]/).test(username.charAt(0))){
        a.style.display = "none";
    }
    if(username.length >= 3){
        b.style.display = "none";
    }
}

function showEmailReq(){
    var email = document.getElementById("email").value;

    setAllNone();
    c.style.display = "block";

    if(email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        c.style.display = "none"
    }
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
}

function showPassConfirmReq(){
    var passConfirm = document.getElementById("cPassword").value;
    var password = document.getElementById("password").value;

    setAllNone();
    h.style.display = "block";

    if(passConfirm == password){
        h.style.display = "none";
    }
}


// other front end code
function setFlashMessageFadeOut(flashMessageElement){
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.05){
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        },50)
    },2500)
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', "flash-message");
    innerFlashDiv.setAttribute('class', "alert alert-info");
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);

}

function createCard(postData){
    return `<div id="post-${postData.id}" class="card">
    <img class="card-image" src=${postData.thumbnail} alt="Missing Image">
    <div class = "card-body">
        <p class="card-title">${postData.title}</p>
        <p class="card-text">${postData.description}</p>
        <a href="/view/${postData.id}" class="anchor-buttons">Post Details</a>
    </div>
</div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    if(!searchTerm){
        location.replace('/');
        return;
    }
    let mainContent = document.getElementById('main-content');
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        let newMainContentHTML = '';
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
        });
        mainContent.innerHTML = newMainContentHTML;
        if(data_json.message){
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash-message');
if(flashElement){
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-text');
if(searchButton){
    searchButton.onchange = executeSearch;
}
