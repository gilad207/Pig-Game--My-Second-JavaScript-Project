'use strict';

// When you roll a 1, you lose the whole score and it't the next player turn.
// You can save you current score at any point otherwise
// first player to get 100 points wins. his screen change color

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const totalScores = [0, 0];
const maxScore = 100;

let currentScore = 0;
let activePlayerNumber = 0;
let isTheGameActive = true;

//resetting the game
const resetGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  totalScores[0] = 0;
  totalScores[1] = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayerNumber}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  if (player1El.classList.contains('player--active'))
    player1El.classList.remove('player--active');
  activePlayerNumber = 0;
  isTheGameActive = true;
};

//show current score
const showCurrentScore = () =>
  (document.getElementById(`current--${activePlayerNumber}`).textContent =
    currentScore);

//reset current roll number
const resetCurrentNumber = function () {
  currentScore = 0;
  showCurrentScore();
};

//Changes the current player
const changeCurrentPlayer = function () {
  activePlayerNumber === 0 ? activePlayerNumber++ : activePlayerNumber--;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Player rolls a dice
const rollDice = function () {
  if (isTheGameActive) {
    const randomDiceNumber = Math.trunc(Math.random(1) * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDiceNumber}.png`;
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      showCurrentScore();
    } else {
      resetCurrentNumber();
      changeCurrentPlayer();
    }
  }
};

//Holds new total score
const holdNewScore = function () {
  if (isTheGameActive) {
    totalScores[activePlayerNumber] += currentScore;
    document.querySelector(`#score--${activePlayerNumber}`).textContent =
      totalScores[activePlayerNumber];
    if (totalScores[activePlayerNumber] >= maxScore) {
      document
        .querySelector(`.player--${activePlayerNumber}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayerNumber}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      isTheGameActive = false;
    } else {
      resetCurrentNumber();
      changeCurrentPlayer();
    }
  }
};

resetGame();
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdNewScore);
btnNewGame.addEventListener('click', resetGame);
