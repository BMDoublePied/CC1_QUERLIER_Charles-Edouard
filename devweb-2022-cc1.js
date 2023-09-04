"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

// Variable pour bloquer la touche entrée, lui indiquant quand le jeu est fini.
let over = false;

// Fonction du jeu, avec les vérifications.
function game() {
  const userInput = document.getElementById("num-usr").value;
  const userGuess = parseInt(userInput);
  if (isNaN(userGuess)) {
    $output.innerHTML = $output.innerHTML + `<br>` + "Veuillez entrer un nombre entier valide.";
    return;
  }
  // On incrémente le nombre d'essais
  nbGuesses++
  // Sinon, on vérifie si l'utilisateur a trouvé le nombre secret, si c'est le cas, on arrête le jeu en affichant le nombre secret et le nombre d'essais. 
  if (userGuess === secretNumber) {
	  $output.innerHTML = `Bravo ! Vous avez gagné ! Le nombre secret était bien ${secretNumber}. Vous avez gagné en ${nbGuesses} essais.`;
    $guessBtn.disabled = true;
	  $startBtn.disabled = false;
    over = true;
  // On vérifie si le nombre max d'essais est dépassé, si c'est le cas, on arrête le jeu en affichant que le joueur a dépassé le nombre max d'essais.
  } else if (nbGuesses === maxGuesses) {
    $output.innerHTML = `Partie finie, vous avez dépassés le nombre max d'essais !`;
	  $guessBtn.disabled = true;
	  $startBtn.disabled = false;
    over = true;
  // Sinon, on vérifie si le nombre entré est supérieur au nombre secret, si c'est le cas, on l'indique au joueur, et on lui indique le nombre d'essais restants.
  } else if (userGuess > secretNumber) {
	  $output.innerHTML = $output.innerHTML + `<br>` + `Raté, ${userGuess} est trop haut. Il vous reste ${maxGuesses - nbGuesses} essais.`;
  // Sinon, on vérifie si le nombre entré est inférieur au nombre secret, si c'est le cas, on l'indique au joueur, et on lui indique le nombre d'essais restants.  
  } else {
	  $output.innerHTML = $output.innerHTML + `<br>` + `Raté, ${userGuess} est trop bas. Il vous reste ${maxGuesses - nbGuesses} essais.`;
  }
  $numUsr.value = ""
};

// Fonction initialisant les différents paramètres du jeu
function launchGame(_evt) {
  // Permet de générer un nombre aléatoire situé entre 0 et un maximum défini par l'utilisateur.
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  // Nombre d'essais max
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;
  nbGuesses = 0;
  over = false
  // Texte pour indiquer au joueur que la partie est lancé, ainsi que le nombre d'essais max
  $output.innerHTML = `Partie lancée, trouvez le nombre secret en au plus de ${maxGuesses}.`;

  // Activer le bouton pour vérifier
  $guessBtn.disabled = false;
  
  // désactiver le bouton start
  $startBtn.disabled = true;
  }

// Supprimer l'écouteur d'événements "keydown" précédent
$numUsr.removeEventListener("keydown", handleEnterKey);
// Ajouter un nouvel écouteur d'événements "keydown"
$numUsr.addEventListener("keydown", handleEnterKey);
$guessBtn.addEventListener("click", game);

function handleEnterKey(touche) {
  if (touche.key === "Enter" && over == false) {
    game();
  }
}
$startBtn.addEventListener("click", launchGame);

function addCow(evt) {
  console.debug(evt.x, evt.y);
  const balise = document.createElement("img");
  balise.src = `https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg`;
  balise.classList.add("cow");
  const variableAleatoire = Math.random();
  // Positionnez l'image au centre du clic en tenant compte du défilement de la page
  balise.style.left = `${evt.x + window.scrollX - 25}px`;
  balise.style.top = `${evt.y + window.scrollY - 25}px`;
  balise.style.transform = `rotate(${variableAleatoire}turn)`;
  // Ajoutez l'image au document
  document.body.appendChild(balise);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
