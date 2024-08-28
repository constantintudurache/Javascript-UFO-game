var user, email, password, rePassword;

function check(password, rePassword) {
    if (password != rePassword || password == "") {
        window.alert("The passwords introduced do not match!");
        return 1;
    }
        
    return 0;
}

function getData() {
    user = document.getElementById("user").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    rePassword = document.getElementById("repeat-password").value;
    
}

function saveData(user, email, password, rePassword) {
    localStorage.setItem("user", user);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
}

function send() {
    
    getData();

    if (!(password != "" && user != "" && email != "")) {
        alert("YOU MAY NOT leave empty fields");
    }
    
    
    if(!check(password, rePassword) && password != null && user != null && email != null)
        saveData(user, email, password, rePassword);
    
}



window.onload = function() {
    
    document.getElementById("send").onclick = send;
    
}