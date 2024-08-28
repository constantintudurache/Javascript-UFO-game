var number, seconds;

function getData() {
    number = document.getElementById("UFO-number").value;
    seconds = document.getElementById("Time").value;
}

function saveData(number, seconds) {
    localStorage.setItem("number", number);
    localStorage.setItem("seconds", seconds);
}

function accept() {
    getData();
    console.log(number, seconds);
    saveData(number, seconds);
}

function retrieve() {
    if (localStorage.getItem("number") != null)
        document.getElementById("UFO-number").value = localStorage.getItem("number");
    
    if (localStorage.getItem("seconds") != null)
        document.getElementById("Time").value = localStorage.getItem("seconds");
}

window.onload = function() {

    if (localStorage.getItem("number") == null)
        localStorage.setItem("number", document.getElementById("UFO-number").value);
    
    if (localStorage.getItem("seconds") == null)
        localStorage.setItem("seconds", document.getElementById("Time").value);
    
    retrieve();
    document.getElementById("Accept").onclick = accept;
}

