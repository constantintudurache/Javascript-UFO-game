
function store(token) {
    localStorage.setItem("token", token);
}


function userRequest(){
  
    let options = {
      method: "GET",
      header: {"Content-Type" : "json"
            }
      };

    let username = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    
    let url = "http://wd.etsisi.upm.es:10000/users/login?username=" + username + "&password=" + password;  
    
    fetch(url, options)
      .then(responseobject => {return responseobject.headers.get("Authorization")})
      .then(token => {store(token)})
  
  }
  
  window.onload = function(){
   
    let username_field = document.getElementById("user");
    let password_field = document.getElementById("password");

    console.log(username_field.value);
    
    document.getElementById('send').onclick = function () {
        if(username_field.value != "" && password_field.value != "")
            userRequest();
        else
            alert("YOU MAY NOT leave empty fields");
    }
    
    

  }