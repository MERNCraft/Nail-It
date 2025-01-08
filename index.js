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
const replay    = "Do you want to play again? (Type Y for Yes)"
const endGame   = "Thanks for a good game!"

const yourTurn = "Your turn. How hard do you plan to hit?"
const myTurn   = "My turn. I will hit the nail "
const gameOver = "The nail is fully driven into the wood."
// ...

/* SET UP THE GAME */
const initial  = 12
const best     = 3
const oneOver  = best + 1

let playing    = true
let unitsLeft  = initial
let force      = 0

console.log(invite)
let player = readlineSync.keyInYN(whoStarts)
let nextPlayer = !player

while (playing) {
  while (unitsLeft) {
    // Draw nail (remove previous drawing)
    console.log(unitsLeft)

    // Choose force
    if (player) {
      force = readlineSync.keyInSelect(strength, yourTurn) + 1;

    } else {
      if (unitsLeft < oneOver) {
        force = unitsLeft

      } else {
        force = unitsLeft % oneOver
        if (!force) {
          console.log("forced to lose:")
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
    unitsLeft -= force
    player = !player
  }

  console.log(gameOver, winner[player + 0])

  // Get ready to play again (switching to non-player)
  unitsLeft  = initial
  player     = nextPlayer
  nextPlayer = !nextPlayer
  playing    = readlineSync.keyInYN(replay)
}