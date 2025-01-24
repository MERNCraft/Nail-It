<!-- Getting the AI to Win -->
<section
  id="getting-the-ai-to-win"
  aria-labelledby="getting-the-ai-to-win"
  data-item="Getting the AI to Win"
>
  <h2><a href="#getting-the-ai-to-win">Getting the AI to Win</a></h2>
  
Just as with the Solo Challenges, I'll get you to apply the AI's winning strategy little by little, one challenge at a time, and I'll treat each challenge in a separate section.

Here's a list of challenges:

### 1. Get the AI to join the game at all

Right now, if you do not press `Y` when asked if you want to start the game... well, you have to start the game anyway. To begin with, the AI will simply say something and do nothing, and get you to play again. Something like this:

```bash-w
-=============| The nail is 14 units long.

============|   You hit the nail firmly.
I'll say that again. I won't play yet.

============|   You hit the nail firmly.

[1] gently
[2] firmly
[3] hard
[0] CANCEL

How hard do you plan to hit? [1, 2, 3, 0]: 
```

### 2. Get the AI to play a move, and claim it

This means that you'll have to change the string `You hit the nail ` to something that can adapt to each player.

```bash-w
<i>-============| The nail is 13 units long.

==========|    You hit the nail gently.</i>

<b>=========|     I hit the nail gently.</b>
```

### 3. Get the AI to play a smart legal move

The AI must choose a value for `force` between `1` and `3`, so it can't always choose to play `length % 4`, , as that may have the value `0`.

```bash-w
<i>-===========| The nail is 12 units long.

</i><b>===========|  I hit the nail gently.</b><i>

=========|    You hit the nail firmly.

</i><b>========|     I hit the nail gently.</b><i>

=====|        You hit the nail hard.

</i><b>====|         I hit the nail gently.</b><i>

[1] gently
[2] firmly
[3] hard
[0] CANCEL

How hard do you plan to hit? [1, 2, 3, 0]: </i>
```

After the human player’s mistake on move 3, the AI is in a winning position.

### 4. Get the AI to claim victory, when it wins

Instead of saying “You win!” every time, the AI should say “I win” when it beats you.

```bash-w
<i>-==============| The nail is 15 units long.

============|    I hit the nail hard.

===========|     You hit the nail gently.

========|        I hit the nail hard.

=======|         You hit the nail gently.

====|            I hit the nail hard.

===|             You hit the nail gently.

|                I hit the nail hard.</i>

<b>I win!</b>
```

### 5. Get the AI to invite you to play again

The first time your game beats one of your friends, it might be luck. If your game shows that it can win at least half the time, your friends will be more impressed.

```bash-w
<i>=|            You hit the nail hard.

|             I hit the nail gently.

I win!</i>

<b>Do you want to play again?
(Type Y for Yes, N for No): </b>
```

</section>