var random1 = Math.floor((Math.random() * 6)) + 1;
var random2 = Math.floor((Math.random() * 6)) + 1;

document.querySelector(".img1").setAttribute ("src","images/dice"+ random1 +".png");
document.querySelector(".img2").setAttribute ("src","images/dice"+ random2 +".png");

var res = "";

if(random1 > random2)
   res = "Player1 Wins!"
else if(random2 > random1)
    res = "Player2 Wins!"
else 
    res = "Draw!";

document.querySelector("h1").innerHTML = res;