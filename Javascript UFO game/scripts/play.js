var pid, score = 0,
    themissile, 
    theufo, 
    ufo_hstep = [],
    ufo_heights = [],
    fireMissile = false,
    numUfo = 1,
    seconds = 0, 
    time_pid,
    ufo_pid,
    isOver = false,
    maxTime, 
    flying = false;

    function setUfoSpeed() {

      for(let i = 1; i <= numUfo; i++) {
        ufo_hstep[i] = 5 + Math.random() * 5;
      }
      
    }

    function setUfoHeights() {
      for(let i = 1; i <= numUfo; i++) {
        ufo_heights[i] = 200 + Math.random() * 200;
      }
    }

    function retrieve() {
      if (localStorage.getItem("number") != null)
          numUfo = localStorage.getItem("number");

      if (localStorage.getItem("seconds") != null)
          seconds = localStorage.getItem("seconds");

      maxTime = seconds;
    }

    

    


function UFOlaunch(){
  ufo_pid = setInterval(MoveUFO, 25);
}
  
function MoveUFO(){
  var Rlimit = parseInt(window.innerWidth),
      hpos_ufo = [];
      
  for(let i = 1; i <= numUfo; i++){
    var ufo = document.getElementById('UFO' + i), hstep = 10;
    var width_ufo = parseInt(window.getComputedStyle(ufo)['width']);

    hpos_ufo[i] = parseInt(window.getComputedStyle(ufo)['left']);
    

    if ((hpos_ufo[i] + width_ufo + ufo_hstep[i] > Rlimit) || (hpos_ufo[i] < 0)) {
      ufo_hstep[i] = (-1) * ufo_hstep[i];
    }
      
    hpos_ufo[i] = hpos_ufo[i] + ufo_hstep[i];
    ufo.style.left = (hpos_ufo[i]) + 'px';
  }
} 

function pullTrigger(){
  if(!fireMissile){
    pid = setInterval(launch, 10);
    fireMissile = true;
  }
}
  
function checkforaHit(index){

   var vpos_m = parseInt(window.getComputedStyle(themissile)['bottom']),
       hpos_m = parseInt(window.getComputedStyle(themissile)['left']),
       width_m = parseInt(window.getComputedStyle(themissile)['width']),
       height_m = parseInt(window.getComputedStyle(themissile)['height']),
       hit = false;
       
  var hpos_ufo = parseInt(window.getComputedStyle(document.getElementById("UFO" + index))['left']),
      vpos_ufo = parseInt(window.getComputedStyle(document.getElementById("UFO" + index))['bottom']),
      width_ufo = parseInt(window.getComputedStyle(document.getElementById("UFO" + index))['width']);

      if (
        (vpos_m <= vpos_ufo + width_ufo) && 
        (vpos_m + height_m >= vpos_ufo) && 
        (hpos_m + width_m / 2 > hpos_ufo) && 
        (hpos_m + width_m / 2 < hpos_ufo + width_ufo) 
    ) {
        hit = true;
        
      }

    return hit;
}
  
function launch(){
  var navbar = document.getElementById('navbar'),
  nav_height = parseInt(window.getComputedStyle(navbar)['height']);
  

  var uLimit = window.innerHeight - 2 * nav_height,
      vpos_m = parseInt(window.getComputedStyle(themissile)['bottom']),
      vstep = 5;

  for (let i = 1; i <= numUfo; i++) {
    if (checkforaHit(i)){   

      clearInterval(pid);
      fireMissile = false;
      vpos_m = 0;

      score = score + 100;
      document.getElementById("score").innerHTML = score;
      document.getElementById('UFO' + i).src = "../pictures/explosion.gif";

      setTimeout(function() {
        document.getElementById('UFO' + i).src = "../pictures/UFO-play.png";
         }, 1000)
    }
  }
  
  if(vpos_m < uLimit){
    vpos_m = vpos_m + vstep;
    
  }
  else {

      clearInterval(pid);
      fireMissile = false;
      vpos_m = 0;
      score = score - 25;
      document.getElementById("score").innerHTML = score;
  }
  themissile.style.bottom = (vpos_m) + 'px';

}  

function moveMissileRight(){
  var rLimit = parseInt(window.innerWidth), 
      hpos_m, misWidth, hstep = 10;
  
  msl = document.getElementById("missile");
  
  hpos_m = parseInt(window.getComputedStyle(msl)['left']);
  misWidth = parseInt(window.getComputedStyle(msl)['width']);

  if (misWidth + hpos_m + hstep  < rLimit && !fireMissile)
      msl.style.left = (hpos_m + hstep) + 'px';

      
}

function moveMissileLeft(){  
  var hstep = 10, hpos_m, rLimit = parseInt(window.innerWidth); 
  
  msl = document.getElementById("missile");
  hpos_m = parseInt(window.getComputedStyle(msl)['left']);
  misWidth = parseInt(window.getComputedStyle(msl)['width']);

  if (misWidth +hpos_m + hstep  > misWidth && !fireMissile)
      msl.style.left = (hpos_m - hstep) + 'px';
}  
  
function keyboardController (theEvent){
  let interval = 15;    
  let code = theEvent.key;
  
  if(!isOver) {
    switch (code){
      case 'ArrowRight':  moveMissileRight();      
                          break;
      case 'ArrowLeft':   moveMissileLeft();      
                          break;
      case ' '         :  pullTrigger();
                          break;
      }
  }
  
}
  

function displayTime() {
  time = document.getElementById("time");
  time.innerHTML = seconds;
  seconds = seconds - 1;

  if(seconds < 0) {
    clearInterval(time_pid);
    gameOver();
    clearInterval(ufo_pid);
    clearInterval(pid);
  }
}

function timer() {
  time_pid = setInterval(displayTime, 1000);
}

function gameOver() {
  for(let i = 1; i <= numUfo; i++) {
    ufo = document.getElementById("UFO" + i);
    document.getElementById("container").removeChild(ufo);
   
  }

  document.getElementById("container").removeChild(themissile);
  document.getElementById("container").removeChild(document.getElementById("score"));
  document.getElementById("container").removeChild(document.getElementById("time"));
  
  let text = document.createElement("div");

  score = score - 50 * (numUfo - 1);
  score = Math.floor(score / (maxTime / 60));
  
  text.id = "final-score";
  text.innerHTML += "Final Score";
  text.innerHTML += "</br>";
  text.innerHTML += + score;


  document.getElementById("container").appendChild(text);
  isOver = true;
}

 window.onload = function() {

  retrieve();
  setUfoSpeed();
  setUfoHeights();
  timer();

  for (i = 1; i <= numUfo; i++) {
    let ufo = document.createElement("img");
    ufo.src = "../pictures/UFO-play.png"; 
    ufo.id = "UFO" + i;
    
    ufo.alt = "Image not found";
    ufo.style.bottom = ufo_heights[i] + 'px';
    
    document.getElementById("container").appendChild(ufo);
    theufo = document.getElementById('UFO' + i);
  }

  themissile = document.getElementById('missile');
  
  console.log((document.getElementById("time")).innerText)
  
  document.addEventListener("keydown", keyboardController, false);
  
  UFOlaunch();
  
}