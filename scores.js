/**
 * Nail-It/index.js
 */

// Load a NodeJS package that allows a dialog with the Terminal
const readlineSync = require("readline-sync")

// Define the strings that will be used for feedback
const invite = `Let's knock a nail into this computer!

* Each player takes a turn to hit the nail once.
* A player can hit the nail in one of three ways: gently, firmly, hard.
* Depending on the force used, the nail will be driven more or less deeply into the Terminal.
* The player who knocks the nail all the way in is the winner.

Are you ready?
`
const whoStarts = "If you want to start, type Y. If you want me to start, press any other key. "
const board     = "-------------------------------------------\n"
                + "|                  SCORE                  |\n"
                + "-------------------------------------------\n"
const border    = "-------------------------------------------"
const nailIs    = "The nail is "
const long      = " units long."
const replay    = `
Do you want to play again?
(Type Y for Yes, N for No): `
const yourTurn  = "Your turn. How hard do you plan to hit?"
const strength  = [ "gently", "firmly", "hard" ]
const hit       = " hit the nail "
const win       = " win!"
const players   = [ "I", "You" ]
const endGame   = "Thanks for a good game!"
const options   = { guide: false }


// Define the values that the AI will use to calculate its move
const best     = 3
const oneOver  = best + 1
const score    = [ 0, 0 ]
let playing    = true
let force      = 0
let toDelete   = 11
let prompt     // "The nail is X units long." | "Y hit the nail Z."
let nail       // "-==========<|" ... "=====<|" ... "<|"
let started    // falsy until first hit
let progress   // cumulated text displayed while playing
let winner     // one of the entries in `players`
let initial, length

// Start the game
console.clear()
console.log(invite)
let player = readlineSync.keyInYN(whoStarts, options) // true | ?

// Ensure that a different player starts each new round
let nextPlayer = !player

while (playing) {
  // Delete previous round
  console.clear()
  toDelete = 0
  progress = ""

  // Show the score
  console.log(board + status() + border)

  // Set the initial length of the nail
  initial = 12 + Math.floor(Math.random() * oneOver)
  length  = initial
  prompt  = nailIs + length + long
  started = false

  while (length > 0) {
    // Prepare to draw the nail
    if (!started) {
      // Draw the whole nail, including the tip
      nail = "-" + "=".repeat(length - 1) + "|"

    } else {
      // There will be at least one unit showing, because the game
      // is not yet over
      nail = "=".repeat(length) + "|"
    }

    // Delete any outdated dialog
    clear = '\x1B[1A\x1B[K'.repeat(toDelete)
    console.log(clear)

    // Draw the nail, and show the current state
    progress += "\n\n" + nail + " " + prompt
    console.log(nail, prompt)

    // Choose force for next turn
    if (player) {
      // Ask the player for a number from ... 0 to 2, in fact
      force = readlineSync.keyInSelect(strength, yourTurn)
      if (force < 0) {
        console.log(endGame)
        process.exit()
      }

      // Read the value at this index from `strength` array and
      // prepare a comment, padded with just enough spaces.
      prompt = " ".repeat(initial - length + force + 1)
             + "You" + hit + strength[force] + "."

      // Add 1 to determine how many units shorter `nail` will be
      force += 1

      // Prepare to delete the lines of choice dialog
      toDelete = 8

    } else {
      // Calculate the best move for the AI
      if (length < oneOver) {
        // The AI can win immediately
        force = length

      } else {
        // Calculate if it's possible to leave a multiple of
        // `oneOver` blocks, so that the player cannot win
        force = length % oneOver
        if (!force) {
          // The player is in a winning position. Play randomly
          force = Math.floor(Math.random() * best) + 1
        }
      }

      // The `force` calculated above is the exact number of
      // units to shorten the `nail`. The adverb to describe
      // the strength of this force is stored in the `strength`
      // array which uses 0 as the first index.

      // Read the value at the appropriate index from `strength`
      // array and prepare a comment, padded with enough spaces.
      prompt = " ".repeat(initial - length + force)
             + "I" + hit + strength[force - 1] + "."

      // There are no lines of choice dialog to delete
      toDelete = 0
    }

    if (force === 0) {
      // The player decided to stop playing.
      // TODO? Get the AI to "tap the nail really gently" so that
      // it _seems_ not to have moved, but a second `force === 0`
      // will make it move a single unit.
      console.log(endGame)
      process.exit()
    }

    // Calculate new length
    length -= force

    // If length is now < 0, the current player won
    winner = players[player + 0]

    // Swap players before the next turn and remember that
    // at least one player has already hit the nail.
    player = !player
    started = true
  }

  // If the code gets here, then `while (length > 0)` has become
  // false. Announce the winner.
  if (!player) {
    // Clear the lines of choice dialog just shown to the player
    clear = '\x1B[1A\x1B[K'.repeat(8)
    console.log(clear)
  }

  // Show just the "head" of the nail, and the last action
  prompt = "\n\n" + "| " + " ".repeat(initial)
         + winner + hit + strength[force - 1] + ".\n\n"
  progress += prompt + winner + win

  // Update the score
  score[ player + 0 ] += 1
  // Replace entire text shown so far with new score + progress
  console.clear()
  console.log(board + status() + border + progress)
  console.log("\nThe score is " + score[0] + " for you, " + score[1] + " for me.")

  // Get ready to play again, alternating between player and AI
  player     = nextPlayer
  nextPlayer = !nextPlayer

  // Ask the player if they want to play again
  playing    = readlineSync.keyInYNStrict(replay, options)

  if (!playing) {
    console.log(endGame)
  }
}


// Function to calculate score string display (used in 2 places)
function status() {
  let yours = score[0]
  // Add leading spaces so `yours` is three characters long
  yours = yours < 10
  ? "  " + yours
  : yours < 100
    ? " " + yours
    : yours

  let mine = score[1]
  // Add padding, as for `yours`
  mine = mine < 10
    ? "  " + mine
    : mine < 100
      ? " " + mine
      : mine

  return "|    You:     " + yours
   + "    |    Me:      " + mine + "    |\n"
}