function print(data){
    let alldata = "";
    let tableRow = document.getElementsByClassName("row");
    
    for(let i = 0; i < data.length; i++) {
        let date = new Date(parseInt(data[i].recordDate));
        
        tableRow[i].innerHTML += "<td>" + (i + 1) + ".</td>";
        tableRow[i].innerHTML += "<td>" + data[i].username + "</td>";
        tableRow[i].innerHTML += "<td>" + data[i].punctuation + "</td>";
        tableRow[i].innerHTML += "<td>" + data[i].ufos + "</td>";
        tableRow[i].innerHTML += "<td>" + data[i].disposedTime + "</td>";
        tableRow[i].innerHTML += "<td>" + date.toLocaleString().slice(0, 10) + "</td>";
   
    }
    
  }

  function userRequest(){
    
    let options = {
      method: "GET",
      header: {"Content-Type" : "json"}
      };

    let url = "http://wd.etsisi.upm.es:10000/records"
    
    fetch(url, options)
      .then(responseobject => {return responseobject.json()})
      .then(data => {console.log(data); print(data)})
  
  }
  
  window.onload = function(){
    userRequest();
  }
  