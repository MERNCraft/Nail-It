<!-- A First JavaScript File -->
<section
  id="a-first-javascript-file"
  aria-labelledby="a-first-javascript-file"
  data-item="A First JavaScript File"
>
  <h2><a href="#a-first-javascript-file">A First JavaScript File</a></h2>
  
A successful business has many employees, in many different offices on many different floors, often in many buildings in many cities. A successful development project has the same level of complexity. There will be many different files, in many different folders on many different computers...

## Organizing your files

This project is simple. It will only use one file. But you should be ready to grow big quickly, and plan accordingly. It's therefore important to structure your work properly.

1. From the File menu in VS Code, choose `Open Folder`
2. Use the dialog to create a new folder that will hold all your projects that you create from tutorials, like this one. Save it in your Documents folder, or in a place where you can quickly find it again.
3. You could call it `My Learning Journey` or something like that.
4. Inside this generic folder, create a folder specifically for this project. I'm going to assume that you call it `Nail_It`, and I will refer to it by that name from now on.

![Create a folder called Nail_It](images/09NewFolder.webp)

5. Inside the `Nail_It` folder, create a file called `main.js`

![Create a file in Nail_It called main.js](images/10NewFile.webp)

The `.js` extension stands for JavaScript. The file that is at the heart of a project is often called `main`.

## Your first script

The first thing on the [list of things that the game can do](#what-needs-to-be-done) is "The game uses text". So the first thing you should get your first JavaScript file to do is to use text.

[The convention since 1978](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) is to get your very first program to say "Hello World!"

1. In your file at `Nail_it/main.js`, type the following text:

```javascript
console.log("Hello World")
```

2. Save your file.

<details class="tip" open>
<summary>Auto-save</summary>
Even better: use the menu item File > Auto Save to tell VS Code to save your file as soon as you have made a change in it. This means that every time you run your code, you can be sure that you are running the most recent version, and not a file that you have changed but forgotten to save.

![Set up Auto Save, so that your latest changes are always saved](images/05AutoSave.webp)

</details>

## Executing your script
To run this file as a program, you will need to open a Terminal.

1. Choose the menu item Terminal > New Terminal.

By default, a new Terminal will appear a the bottom of the VS Code window.

3. Check the name of the folder that is shown in the Terminal. If it is not `Nail_It`, then type `cd` (which means `change directory`) and drag the name of the Nail_It folder into the Terminal, then press Enter.

![`cd` into the Nail_It directory](images/08cdToNailit.webp)

4. When the Terminal is active in the Nail_It directory, type...

   ```bash-w
   node main.js
   ```
   ... as shown in the Figure 5 above.
   
You should see `Hello World!` printed into the Terminal.

<details class="pivot" open>
<summary>main.js and the Terminal</summary>
For the rest of the project, this window, with the `main.js` file and the Terminal below it, is where you will be working. If you close the project and come back to work on it later, use VS Code to open the Nail_It folder, so you can continue from where you left off.

</details>

</section>