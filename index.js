/**
 * Nail-It/index.js
 */

// Load a NodeJS package that allows a dialog with the Terminal
const readlineSync = require('readline-sync')

// Define the strings that will be used for feedback
const invite = `Let's knock a nail into this computer!
* Each player takes a turn to hit the nail once.
* A player can use one of three levels of strength: gently, firmly, hard.
* Depending on the strength used, the nail will be driven deeper or less deep into the Terminal.
* The player who knocks the nail all the way in is the winner.

Are you ready?
`
const whoStarts = "If you want to start, type Y. If you want me to start press any other key. "
const nailIs    = "The nail is "
const long      = " units long."
const replay    = "\nDo you want to play again? (Type Y for Yes)"
const yourTurn  = "Your turn. How hard do you plan to hit?"
const strength  = [ "gently", "firmly", "hard" ]
const hit       = " hit the nail "
const endGame   = "Thanks for a good game!"

// Define the values that the AI will use to calculate its move
const best     = 3
const oneOver  = best + 1


let playing    = true
let force      = 0
let toDelete   = 10
let prompt     // "The nail is X units long." | "Y hit the nail Z."
let nail       // "-==========<|" ... "=====<|" ... "<|"
let started    // false until first hit

let initial, length

// Start the game
console.log(invite)
let player = readlineSync.keyInYN(whoStarts) // true | ""

// Ensure that a different player starts each new round
let nextPlayer = !player

while (playing) {
  // Set the initial length of the nail
  initial = 12 + Math.floor(Math.random() * oneOver)
  length = initial
  prompt = nailIs + length + long
  started = false

  while (length > 0) {
    // Prepare to draw the nail
    if (!started) {
      // Draw the whole nail, including the tip
      nail = "-" + "=".repeat(length - 2) + "<|"
    } else {
      // There will be at least one unit show, because the game
      // is not yet over
      nail = "=".repeat(length - 1) + "<|"
    }
    // Delete any outdated dialog
    clear = '\x1B[1A\x1B[K'.repeat(toDelete)
    console.log(clear)

    // Draw the nail, and give the current state
    console.log(nail, prompt)

    // Choose force
    if (player) {
      // Ask the player for a number from ... 0 to 2, in fact
      force = readlineSync.keyInSelect(strength, yourTurn)
      if (force < 0) {
        console.log(endGame)
        process.exit()
      }

      // Read the value at this index from `strength` array and
      // prepare a comment, padded with just enough spaces.
      prompt = " ".repeat(initial - length + force)
             + "You" + hit + strength[force] + "."

      // Add 1 to determine how many units shorter `nail` will be
      force += 1

      // Prepare to delete the lines of choice dialog
      toDelete = 7

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
      prompt = " ".repeat(initial - length + force - 1)
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

    // If the while loop continues, swap players and remember that
    // at least one player has already hit the nail.
    player = !player
    started = true
  }

  // If the code gets here, then `while (length > 0)` has become
  // false. Announce the winner.

  const winner = (player) ? "I" : "You" // see line 131
  if (!player) {
    // Clear the lines of choice dialog just shown to the player
    clear = '\x1B[1A\x1B[K'.repeat(7)
    console.log(clear)
  }

  // Ensure there is an empty line after the AI's last turn
  prompt = player ? "\n" : ""

  // Show just the "head" of the nail, and the last action
  prompt += "|" + " ".repeat(initial)
                + winner + hit + strength[force - 1] + ".\n"
  console.log(prompt)
  console.log(winner + " win!")

  // Get ready to play again, alternating between player and AI
  player     = nextPlayer
  nextPlayer = !nextPlayer

  // Prepare to delete the previous game
  toDelete   = 22

  // Ask the player if they want to play again
  playing    = readlineSync.keyInYN(replay) // true | ""
  
  if (!playing) {
    console.log(endGame)
  }
}