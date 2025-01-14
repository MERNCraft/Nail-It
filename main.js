/**
 * Nail-It/index.js
 */

// Load methods from a NodeJS package that allows a dialog with
// the Terminal
const {
  keyInYN,
  keyInSelect,
  keyInYNStrict
} = require('readline-sync')

// Define the strings that will be used for feedback
const rules = `Let's knock a nail into this computer!

* Each player takes a turn to hit the nail once.
* A player can hit the nail in one of three ways:
  gently, firmly, hard.
* Depending on the force used, the nail will be
  driven more or less deeply into the Terminal.
* The player who knocks the nail all the way in
  is the winner.

Are you ready?
`
const whoStarts = `If you want to start, type Y.
If you want me to start, press any other key. `
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

let playing    = true
let force      = 0
let toDelete   = 13
let prompt     // "The nail is X units long." | "Y hit the nail Z."
let nail       // "-==========<|" ... "=====<|" ... "<|"
let started    // falsy until first hit
let winner     // one of the entries in `players
let initial, length

// Start the game
console.clear()
console.log(rules)
let player = keyInYN(whoStarts, options) // true | ?

// Ensure that a different player starts each new round
let nextPlayer = !player

while (playing) {
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

    // Draw the nail, and give the current state
    console.log(nail, prompt)

    // Choose force for next turn
    if (player) {
      // Ask the player for a number from ... 0 to 2, in fact
      force = keyInSelect(strength, yourTurn)
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

  // Ensure there is an empty line after the AI's last turn
  prompt = player ? "\n" : ""

  // Show just the "head" of the nail, and the last action
  prompt += "| " + " ".repeat(initial)
                + winner + hit + strength[force - 1] + ".\n"
  console.log(prompt)
  console.log(winner + win)

  // Get ready to play again, alternating between player and AI
  player     = nextPlayer
  nextPlayer = !nextPlayer

  // Prepare to delete the previous game
  toDelete   = 22

  // Ask the player if they want to play again
  playing    = keyInYNStrict(replay, options)

  if (!playing) {
    console.log(endGame)
  }
}