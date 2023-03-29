'use strict';

// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
// 83. ### ROLLING THE DICE ###

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// STARTING CONDITIONS

// ### SWITCHING THE ACTIVE PLAYER ###

let scores, currentScore, activePlayer, playing;

// *** STARTING CONDITIONS ***
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY

btnRoll.addEventListener('click', function () {
  // 83.a. GENERATING A RANDOM DICE ROLL
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // console.log(dice);
    // 83.b. DISPLAY DICE

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 83.c. CHECK FOR ROLLED '1', IF TRUE, SWITCH TO NXT PLAYER

    if (dice !== 1) {
      // => add dice to current score;

      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // => switch to nxt player
      switchPlayer();
    }
  }
});

// 85. ### HOLDING CURRENT SCORE ###

btnHold.addEventListener('click', function () {
  // a.1. ADD CURRENT SCORE TO ACTIVE PLAYER'S TTL SCORE

  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // b.2. CHECK IF PLAYER'S SCORE >= 100

    if (scores[activePlayer] >= 100) {
      // => Finish the game
      playing = false;

      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  // => Switch to the nxt player
});

// 86. ### RESETTING THE GAME ###

btnNew.addEventListener('click', init);
