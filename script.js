const gameBoard = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const emojis = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒"];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let score = 0;

/* SHUFFLE */
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

/* CREATE BOARD */
function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(emojis).forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">${symbol}</div>
      </div>
    `;
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

/* FLIP CARD */
function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesText.textContent = `Moves: ${moves}`;

  checkMatch();
}

/* CHECK MATCH */
function checkMatch() {
  const firstEmoji = firstCard.querySelector(".card-back").textContent;
  const secondEmoji = secondCard.querySelector(".card-back").textContent;

  if (firstEmoji === secondEmoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    score++;
    scoreText.textContent = `Score: ${score}`;
    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}

/* RESET TURN */
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

/* RESTART */
restartBtn.addEventListener("click", () => {
  moves = 0;
  score = 0;
  movesText.textContent = "Moves: 0";
  scoreText.textContent = "Score: 0";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createBoard();
});

/* START GAME */
createBoard();
