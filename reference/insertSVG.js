//top-left logo
const logoSpan = document.querySelector("#logo");
logoSpan.innerHTML = logo;

//cartoon picture
const pictureDiv = document.querySelector("#profile-picture");
pictureDiv.innerHTML = originalSVG;

const cartoonShirt = document.querySelector("#cartoon-shirt");

const languagesIcon = document.querySelector("#languages-icon");
languagesIcon.innerHTML = languagesSVG;

const technologiesIcon = document.querySelector("#technologies-icon");
technologiesIcon.innerHTML = technologiesSVG;

const strengthsIcon = document.querySelector("#strengths-icon");
strengthsIcon.innerHTML = strengthsSVG;

//recurisve function to add surprised-face functionality to profile picture click event
const generateSVGListeners = () => {
  const actualSVG = document.querySelector("#actualSVG");
  //This is where the svg is changed for 1.5 seconds
  actualSVG.addEventListener("click", function () {
    console.print(speak());
    pictureDiv.innerHTML = surprisedSVG;
    setTimeout(function () {
      pictureDiv.innerHTML = originalSVG;
      generateSVGListeners();
    }, 1500);
  });
};

//initializing the event listeners
generateSVGListeners();
