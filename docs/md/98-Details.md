<section
id="details"
aria-labelledby="details"
data-item="Details"
>
<h2><a href="#details">Details</a></h2>

As you may have noticed, I like to include coloured blocks which you can collapse and ignore if you are in a hurry. These are handled by HTML `<details>` elements. The icons they use can be found in `MyTutorials.github.io/public/svg/`.

To create one, type the Markdown prefix `ddd` (for **d**etails). You'll be asked to choose one of the following styles:

![The dialog for the Details snippet](images/Details.webp)


## What the different `details` classes look like

<details open>
<summary>Generic</summary>
This has no class.

</details>

<details class="note" open>
<summary>Note</summary>
This is a note.

</details>

<details class="feedback" open>
<summary>Feedback</summary>
This is a request for feedback.

</details>

<details class="sandbox" open>
<summary>Sandbox</summary>
This is a sandbox: a place to experiment and make mistakes.

</details>

<details class="tip" open>
<summary>Tip</summary>
This is a tip.

</details>

<details class="trouble" open>
<summary>Troubleshooting</summary>
Help with troubleshooting. Usually closed

</details>

</details>
<details class="warn" open>
<summary>Warn</summary>
This is a warning.

</details>

<details class="alert" open>
<summary>Alert</summary>
This is an alert.

</details>

<details class="question" open>
<summary>Question</summary>
This is a question, to make you think ahead.

</details>

<details class="challenge" open>
<summary>Challenge</summary>
This is a challenge. You will be asked to find your own way to deal with a task before you reveal the solution.

<details class="hint" open>
<summary>Hint</summary>
You'll find some clues about how to solve the challenge here.

</details>

<details class="solution" open>
<summary>Solution</summary>
You'll find the solution here.

</details>
</details>

<details class="tldr"open>
<summary>TL;DR</summary>
This is a deep dive into a topic. It's usually closed.

</details>

<details class="pivot" open>
<summary>Pivot</summary>
This concludes a section and introduces the next topic.

</details>

<details class="env" open>
<summary>Environment</summary>
Information about code editing and other useful programs.

</details>

<details class="story" open>
<summary>Story</summary>
A personal anecdote or business case study. Usually closed.

</details>

## Styling
The "light" colors for the `<details>` elements are defined in the `:root` section of `MyTutorials.github.io/public/styles/`:

```css-#51
/* Details */
  --alert:     #f99;
  --challenge: #ecf;
  --env:       #aef;
  --feedback:  #beb;
  --note:      #dfd;
  --pivot:     #9cf;
  --question:  #fbd;
  --sandbox:   #fec;
  --solution:  #d9f6;
  --story:     #cfe;
  --tip:       #fe9;
  --tldr:      #77b;
  --trouble:   #fc9;
  --warn:      #fbb;
  --code:      #0001;
```

Colors for "dark" mode are defined a little lower down:

```css-#100
body:has(#theme-dark:checked) {
```
```css-s
/* lines skipped */
```
```css-#111
  /* Details */
  --alert:     #800;
```
```css-s
/* and so on... */
```
```css-#133
}
```




The `background-color`s are generated using the newly available `color-mix` functional notation:

```css-#867
  background-color: color-mix(
    in oklab,
    var(--bg-color),
    var(--darker)
  );
```

In older browsers, the backgrounds should just appear plain.


</section>
