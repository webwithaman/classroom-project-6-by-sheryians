// Get Elements
const boxes = document.querySelectorAll(".boxes-container .box");
const gameStateMessage = document.querySelector(".game-state-message");
const nextBtn = document.getElementById("next-btn");
const previousBtn = document.getElementById("previous-btn");
const openBtn = document.getElementById("open-btn");
const restartBtn = document.getElementById("restart-btn");
const correctChoiceSound = new Audio("../assets/music/correct-choice.mp3");
const wrongChoiceSound = new Audio("../assets/music/wrong-choice.mp3");
const moveSound = new Audio("../assets/music/move.mp3");

// Variables
let currentSelectedBox = 0, // Indicates Which Box is Currently Selected to Open
  hasGameEnded = false, // Game State (Start or End)
  chancesLeft = 2, // Chances Counter
  boxHasDoremon = Math.floor(Math.random() * 5), // Pick a Random Box to Put Doremon in it
  boxesOpenState = {
    // State of the Boxes (Is Opened)
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };

// Put Doremon Image In a Randomly Selected Box
boxes[
  boxHasDoremon
].innerHTML = `<img class="doremon" src="../assets/images/doremon.png"> <img class="question-mark" src="assets/images/question-mark.png" alt="img" /> `;

// Function to Select Box
const selectBox = (which = "next") => {
  let i = (j = currentSelectedBox);

  if (which === "next")
    while (boxesOpenState[++i]) {
      if (i === boxes.length - 1) return;
    }
  else {
    while (boxesOpenState[--i]) {
      if (i === 0) return;
    }
  }

  currentSelectedBox = i;

  // Play Sound
  if (!moveSound.paused) {
    moveSound.pause(); // Stop the current sound
  }
  moveSound.currentTime = 0;
  moveSound.play();

  boxes[j].classList.remove("selected");
  boxes[currentSelectedBox].classList.add("selected");
};

// Adding Click Event On Next Button for Selecting Next Box
nextBtn.onclick = function () {
  if (currentSelectedBox === boxes.length - 1 || hasGameEnded) return;
  selectBox();
};

// Adding Click Event On Next Button for Selecting Next Box
openBtn.onclick = function () {
  if (hasGameEnded || boxesOpenState[currentSelectedBox]) return;

  boxesOpenState[currentSelectedBox] = true;
  boxes[currentSelectedBox].classList.add("open");

  if (boxHasDoremon === currentSelectedBox) {
    correctChoiceSound.play();
    gameStateMessage.textContent = "🥳 Victory! Doraemon is Found! 🌟";
    gameStateMessage.classList.add("game-state-message-animate");
    hasGameEnded = true;
    boxes[currentSelectedBox].style.backgroundColor = "#fff";
  } else {
    chancesLeft--;
    if (!wrongChoiceSound.paused) {
      moveSound.pause(); // Stop the current sound
    }
    wrongChoiceSound.currentTime = 0;
    wrongChoiceSound.play();
    if (chancesLeft === 0) {
      gameStateMessage.textContent =
        "💔 Oh No! You Missed Him! Better Luck Next Time!";
      gameStateMessage.classList.add("game-state-message-animate");
      hasGameEnded = true;
    } else {
      gameStateMessage.textContent = `😬 Oops! Wrong Choice! Only 1 Try Left!`;
      if (currentSelectedBox === boxes.length - 1) {
        selectBox("previous");
      } else selectBox();
    }
  }
};

// Adding Click Event On Previous Button for Selecting Previous Box
previousBtn.onclick = function () {
  if (currentSelectedBox === 0 || hasGameEnded) return;
  selectBox("previous");
};

// Adding Click Event On Restart Button to Restart Game
restartBtn.onclick = function () {
  window.location.reload(); // Reload Page
};
