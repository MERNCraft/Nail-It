<!-- true and false -->
<section
  id="true-and-false"
  aria-labelledby="true-and-false"
  data-item="A Few Words about True And False"
>
  <h2><a href="#true-and-false">A Few Words about True And False</a></h2>

You've seen the keywords `true` and `false` a few times now.

In JavaScript, these two special values, `true` and `false`, are not words or numbers or objects: they are _boolean_.

Boolean Logic is a branch of mathematics that deals with whether things are true or false. It is named after [George Boole](https://en.wikipedia.org/wiki/George_Boole), who invented this branch.

For example, the expression _"The human player pressed the `Y` key"_ can be either `true` (Yes, the player pressed the `Y` key) or `false` (The player hasn't pressed any key yet, or the key the player pressed was not `Y`).

## `if` ... `else` ...

You've also seen code in the [documentation for the `readline-sync` package](https://www.npmjs.com/package/readline-sync) with a statement using `if ... else ...`:

```javascript-#
<b>if</b> <i>(readlineSync.keyInYN('Do you want this module?')) </i><b>{</b><i>
  // 'Y' key was pressed.
  console.log('Installing now...');
  // Do something...</i>
<b>} else {</b><i>
  // Another key was pressed.
  console.log('Searching for another...');
  // Do something...</i>
<b>}</b>
```
Your Nail It! game needs to make decisions about what to do next. So far, you have got it to ask the user if they want to start. Your `main.js` script has a variable called `player`, whose value may be `true` (if the human player pressed the `Y` key), or something that is not `true`. So it knows whether the human player chose to go first or not.

If the player chose to play first, your script needs to ask how hard they want to hit the nail. If the user chose not to play first, then the script must decide how hard the AI should hit the nail.

To get your game to make such a decision, you can use a statement with two branches, like the one above. In your case, it will be more like:

```javascript
if (player) { // it's the human player's turn
  // TODO: ask the human player for a number between 1 and 3
} else { // it's the AI's turn to play
  // TODO: choose the number between 1 and 3 to ensure AI wins
  // (if possible)
}
```

<details class="note" open>
<summary>Comments</summary>
Not everything in a JavaScript file is active code. You can add _comments_, like those shown above, by putting a double slash (`//`) to the left of any text that is not code. The JavaScript engine will ignore anything from that point until the end of the line. 

You can also put `/*` before a comment section and `*/` after it. You can do this in the middle of a line or to span many lines.

In the code above, the comments indicate what code still has to be written. In other cases, you can use comments to explain what the code does. This is especially important if the logic is complex.

</details>

## Truthy and falsy

In the last section, you saw that the value generated by 'keyInYN()` can be:

* `true` if the user presses the `Y` key
* `false` if the user presses the `N` key
* "" (an empty string) if the user presses any other key

JavaScript has an ... interesting way of considering whether something is `true` or not. You can read more about this in the article for [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) on the MDN web site.

In short, JavaScript treats the number `0`, the empty string `""` and a few other empty values as `false`. These values are said to be _falsy_.

Conversely, JavaScript treats anything that is not `false` or `0` or empty as `true`... even the word `"false"`, because `"false"` contains letters, so it's not empty. Anything that is not `false` or falsy is _truthy_.

Later in this project, you'll see a trick to convert `true` to `1` and `false` to `0`.

<details class="sandbox" open>
<summary>Playing with `node` in the Terminal</summary>
For testing, you can run an Interactive Development Environment (IDE) for Node in a Terminal.

Open a new Terminal, and try this:

```tex-w
<b>node</b>
Welcome to Node.js v23.1.0.
Type ".help" for more information.
> <b>if (true) console.log("This", /* "but not this", */ "and that")</b>
This and that
<i>undefined</i>
> <b>if (false) console.log("Nothing will be printed")</b>
<i>undefined</i>
> <b>if ("false") console.log("The word 'false' is truthy")</b>
The word 'false' is truthy
<i>undefined</i>
> <b>if (0) console.log("Zero is falsy")</b>
<i>undefined</i>
```

When an expression is `false` or falsy, an `if` statement will ignore any instructions associated with it.

The `undefined` text simply means that `console.log()` did not generate a value. When you call `readlineSync.keyInYN()`, it generates a value, but `console.log()` just logs data quietly to the console.

</details>

</section>