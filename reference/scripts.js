// console.print: console.log without filename/line number
console.print = function (...args) {
  queueMicrotask(console.log.bind(console, ...args));
};
console.print("Hello there!\nWelcome to my site!\n\n\n");

//menu
let isMenuOpen = false;
const hamburgerMenu = document.querySelector(".hamburger-container");
const menu = document.querySelector(".menu");
const overlay = document.querySelector("#overlay");

//this function will show the menu when it is not visible
//and hide the menu when it is visible. The magic
//is happening in CSS, this just adds the classes to
//modify the styling
const showMenu = () => {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    hamburgerMenu.classList.add("open");
    menu.classList.add("menu-open");
    overlay.classList.add("overlay");
  } else {
    hamburgerMenu.classList.remove("open");
    menu.classList.remove("menu-open");
    overlay.classList.remove("overlay");
  }
};

hamburgerMenu.addEventListener("click", showMenu);
overlay.addEventListener("click", showMenu);

//function to play when the cartoon ryan is clicked.
//it just prints funny messages to the console.
const speak = () => {
  let word = [
    "Yes?",
    "What?",
    "Why?",
    "Stop.",
    "Did you expect something to happen?",
    "lol",
    "Oh my",
    "Howdy!",
    "Thanks for the poke.",
    "This is a little weird",
    "Ouch!",
    "What's going on?",
    "Oof!",
    "Can I help you?",
    "OMG",
    "Seriously?",
    "Don't you have something better to do?",
    "Haha",
    "I was made in powerpoint",
    "...",
    "I'm more of a cat person",
    "My favorite drink is apple cider",
    "I was born on May 20th",
    "My favorite movie series is Lord of the Rings",
    "I can whistle and hum at the same time",
    "I don't think aliens have visited earth",
    "My favorite dessert is snickerdoodle cookie",
  ];
  return word[Math.floor(Math.random() * word.length)];
};

const cartoonRyan = document.querySelector("#profile-picture");
let dark = true;
const cartoonChange = false;

//Change the color theme of the website
const changeTheme = (mainColor, secondaryColor) => {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondaryColor
  );
};
