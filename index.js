const readlineSync = require('readline-sync')

// Define the strings that will be used for feedback
const winner   = [ "You win!", "I win!" ]
const strength = [ "gently", "firmly", "hard" ]
const invite = `Let's knock a nail into this computer.
* Each player takes turns to hit the nail once.
* A player can use one of three levels of strength: gently, firmly, hard
* Depending on the strength of the blow, the nail will be driven deeper or less deep into the Terminal.
* The player who knocks the nail all the way in is the winner.
`
const whoStarts = "If you want to start, type Y. If you want me to start press any other key. "
const nailIs    = "The nail is "
const long      = " units long."
const replay    = "\nDo you want to play again? (Type Y for Yes)"
const endGame   = "Thanks for a good game!"

const yourTurn = "Your turn. How hard do you plan to hit?"
const myTurn   = "My turn. I will hit the nail "
const gameOver = "The nail is fully driven into the wood.\n|"

const best     = 3
const oneOver  = best + 1

let playing    = true
let force      = 0
let length
let nail
let hit

// Start
console.log(invite)
let player = readlineSync.keyInYN(whoStarts)

// Ensure that the player who starts alternates
let nextPlayer = !player

while (playing) {
  // Set the initial length of the nail
  length  = 12 + Math.floor(Math.random() * oneOver)
  console.log(nailIs + length + long)
  hit = false

  while (length) {
    // Draw nail
    if (hit) {
      nail = "=".repeat(length - 1) + "<|"
    } else {
      nail = "-" + "=".repeat(length - 2) + "<|"
    }
    console.log(nail)

    // Choose force
    if (player) {
      force = readlineSync.keyInSelect(strength, yourTurn) + 1;

    } else {
      if (length < oneOver) {
        force = length

      } else {
        force = length % oneOver
        if (!force) {
          force = Math.floor(Math.random() * best) + 1
        }
      }

      console.log(myTurn + strength[force - 1] + ".")  
    }

    if (force === 0) {
      // The player decided to stop playing.
      console.log(endGame)
      process.exit()
    }

    // Calculate new length
    length -= force
    player = !player
    hit = true
  }

  console.log(gameOver)
  console.log(winner[player + 0])

  // Get ready to play again (switching to non-player)
  player     = nextPlayer
  nextPlayer = !nextPlayer
  playing    = readlineSync.keyInYN(replay)
}