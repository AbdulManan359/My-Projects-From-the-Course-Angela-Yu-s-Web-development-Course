let randomNumber1 = Math.round(Math.random() * 5) + 1;
document.getElementsByTagName("img")[0].setAttribute("src", "./images/dice" + randomNumber1 + ".png");
let randomNumber2 = Math.round(Math.random() * 5) + 1;
document.getElementsByTagName("img")[1].setAttribute("src", "./images/dice" + randomNumber2 + ".png");
if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").textContent = "Player 2 Wins!";
} else if (randomNumber1 === randomNumber2) {
    document.querySelector("h1").textContent = "Draw!";
}
