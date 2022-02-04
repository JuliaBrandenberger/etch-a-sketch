let container = document.getElementById("container");

let colorMode = "black";

function changeColor(event) {
  let color;
  if (colorMode === "rainbow") {
    color = randomColor();
  } else if (colorMode === "black") {
    color = "rgb(0,0,0)";
  } else if (colorMode === "greyscale") {
    let c = event.target.style.backgroundColor; 
    if (c === "") {
      c = "rgb(255,255,255)";
    }
    color = darken(c);
    c = color;
  } else {
    throw("invalid color selection");
  }
  event.target.style.backgroundColor = color;
}
// event target is the element which the event happens to, what you added the listener to 

let black = document.getElementById("black-button");
black.addEventListener("click", function () {
  colorMode = "black";
});

let rainbow = document.getElementById("rainbow-button");
rainbow.addEventListener("click", function () {
  colorMode = "rainbow";
});

function randomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomColor() {
  const r = randomNumber(0, 255);
  const g = randomNumber(0, 255);
  const b = randomNumber(0, 255); 
  return `rgb(${r},${g},${b})`; // Collect all to a css color string
}

let greyscale = document.getElementById("grey-button");
greyscale.addEventListener("click", function () {
  colorMode = "greyscale";
});

/**
 * breaks an rbg string into its red, green and blue values colors
 * @param {string} rgb
 * @returns {{r:number, g:number, b:number}} // object with r g and b numbers
 */
function separateColors (rgb) {
  let str1 = rgb.slice(4,-1); // gets rid of "rgb()"
  let strArray = str1.split(',');
  const colors = {};
  colors.r = Number(strArray[0]);
  colors.g = Number(strArray[1]);
  colors.b = Number(strArray[2]);
  return colors;
}
/**
 * given an rgb value return a new value with r, g, and b decremeneted by 10%
 * @param {string} c 
 * @returns {string} rgb string
 */
function darken(c) {
  let {r,g,b} = separateColors(c); // descructures the object that gets returned
  r = Math.floor(r-(r*.10)); // - 10%
  g = Math.floor(g-(g*.10)); // rounds to lower integer (so we don't have long decimal #s- can only have ints for rgb values)
  b = Math.floor(b-(b*.10));
  rgb = `rgb(${r},${g},${b})`;
  return rgb;
}



/**
 * creates a new "square" div and appends it to container
 */
function appendSquare() {
  let square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);
  square.addEventListener("mouseover", changeColor); 
}
// put just the name changeColor, don't call the function, just say what function you want to happen
// to think about- is my thing live, updating, or is it static -doesnt' change from when created

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);
  
let squares = container.children;
// when you call children on something it live updates, it updates itself after script has run

/**
 * asks user to change board and resets the color back to neutral
 */
function reset(){
   function newSquares() {
    let newNumber = Number(prompt("How many squares per side would you like?"));
    if (newNumber > 50) {
      alert("You cannot choose a number larger than 50.");
      newSquares();
      return;
    } else if (newNumber === 0) {
      return;
    } else if (isNaN(newNumber)) {
      alert("That is not a number.");
      newSquares();
      return; // makes irrelevant the saved value of newNumber (when calling line 12 this is NaN)
    }
    let root = document.querySelector(":root");
    root.style.setProperty("--side", newNumber);

    container.textContent = "";
    //removes elements as children and therefore listener events, they just hang out in dom but can't be accessed, and then javascript destroys them

    populateGrid(newNumber);
  }
  newSquares();
  
}


/**
 * given a number, produce number amount of squares in the container
 * @param {number} number 
 */
let populateGrid = function(number) {
  for (let index = 0; index < (number * number); index++) {
    //console.log("square");
    appendSquare();
    }
}




window.addEventListener("load", function(){
  // selects the styles on the html element of document
  const htmlStyles = window.getComputedStyle(document.querySelector("html"));
  
  let sideSize = Number(htmlStyles.getPropertyValue("--side"));
  populateGrid(sideSize);
});
// waits to run this function, which populates the squares, until after everything on the page is loaded

