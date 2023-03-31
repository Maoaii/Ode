const nav = document.getElementById("navbar");
const topButton = document.getElementById("top-button");
const dropdown = document.getElementById("dropdown");
const messagesContainer = document.getElementById("messages-container");
const newMessageButton = document.getElementById("new-message-button");
const historyContainer = document.getElementById("history-container");
const historyForm = document.getElementById("history-form");
const historyImageInput = document.getElementById("image-input");


const pastHistoryElements = [
  {month: "04", year: "2019", imagePath: "img/elementor-placeholder-image.webp", description: "hello", historyIndex: 0, isPast: true}
];
let historyElements = [];
let currentIndex = 0;
let messages = ["Hello", "How are you?", "I'm fine", "Goodbye"];


topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
dropdown.addEventListener("click", showDropdown);
newMessageButton.addEventListener("click", displayNewMessage);
historyForm.addEventListener("submit", submitHistoryEvent);
historyImageInput.addEventListener("change", updateImageSaved);

// Event listeners for scrolling.
// Make the "go to top" button appear when scrolling down.
window.onscroll = function() {
  if (document.body.scrolLTop > window.innerHeight || 
      document.documentElement.scrollTop > window.innerHeight) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};


topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
dropdown.addEventListener("click", () => document.getElementById("menu").classList.toggle("hidden"));
newMessageButton.addEventListener("click", displayNewMessage);

$(window).on("load", function()  {
  setTimeout(showWebsite, 1000);
  getHistoryElements();
  getCurrentIndex();
  saveData("image", null);
});


function showWebsite() {
  $(".heart").fadeOut();
  $(".back").fadeOut();
  document.querySelector("header").classList.remove("hidden");
  document.querySelector("main").classList.remove("hidden");
  document.querySelector("footer").classList.remove("hidden");
}

// Past history elements that won't be available for change
pastHistoryElements.forEach((historyElement) => {
  addHistoryElement(historyElement.month, historyElement.year, 
                    historyElement.imagePath, historyElement.description, historyElement.historyIndex, isPast=true);
});

function getHistoryElements() {
  const tmpHistoryElements = retrieveData("historyElements");
  
  // Populate history elements
  if (tmpHistoryElements) {
    historyElements = tmpHistoryElements;

    historyElements.forEach(historyElement => {
      addHistoryElement(historyElement.month, historyElement.year, historyElement.imagePath, historyElement.description, historyElement.historyIndex, isPast=false);
    });
  }
}

function getCurrentIndex() {
  const tmpIndex = retrieveData("historyIndex");

  if (tmpIndex) {
    currentIndex = tmpIndex;
  }
}

function updateImageSaved() {
  const image = historyImageInput.files[0];
  const imageName = document.getElementById("image-name");
  imageName.textContent = event.target.files[0].name;
  
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    saveData("image", reader.result);
  });
}

function submitHistoryEvent(event) {
  event.preventDefault();

  const dateInput = document.getElementById("date-input");
  const descriptionInput = document.getElementById("description-input");
  const imageInput = document.getElementById("image-input-container");

  const date = dateInput.value.split("-"); 
  const description = descriptionInput.value;
  const image = retrieveData("image");

  if (!isValidInput(date, description, image, dateInput, descriptionInput, imageInput)) {
    return;
  }
  
  const element = {
    month: date[1],
    year: date[0],
    imagePath: image,
    description: description,
    historyIndex: currentIndex++
  };
  
  historyElements.push(element);
  addHistoryElement(element.month, element.year, element.imagePath, element.description, element.historyIndex);

  saveData("historyElements", historyElements);
  saveData("historyIndex", currentIndex);
  cleanInputs();
}

function isValidInput(date, description, image, dateInput, descriptionInput, imageInput) {
  const isDateValid = date.length === 3;
  const isDescriptionValid = description !== "";
  const isImageValid = image !== null;

  isDateValid ? dateInput.classList.remove("invalid") : dateInput.classList.add("invalid");
  isDescriptionValid ? descriptionInput.classList.remove("invalid") : descriptionInput.classList.add("invalid");
  isImageValid ? imageInput.classList.remove("invalid") : imageInput.classList.add("invalid");

  return isDateValid && isDescriptionValid && isImageValid;
}

function cleanInputs() {
  const imageInput = historyImageInput;
  const dateInput = document.getElementById("date-input");
  const textInput = document.getElementById("description-input");
  
  [imageInput, dateInput, textInput].forEach((inputElement) => {
    inputElement.value = null;
  });
  document.getElementById("image-name").textContent = "";
  saveData("image", null);
}



function addHistoryElement(month, year, imagePath, descriptionText, index, isPast) {
  const container = document.createElement("div");
  const dateContainer = document.createElement("div");
  const date = document.createElement("p");
  const historyBox = document.createElement("div");
  
  const image = document.createElement("img");
  const description = document.createElement("p");

  container.classList.add("flex", "items-center", "gap-4");
  container.setAttribute("data-historyIndex", index)
  dateContainer.classList.add("date-circle");
  historyBox.classList.add("history-box");
  description.classList.add("mt-4");
  

  date.textContent = month + " - " + year;
  description.textContent = descriptionText;
  

  image.setAttribute("src", imagePath);

  if (!isPast) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button", "text-xl");
    deleteButton.addEventListener("click", showConfirmation);
    historyBox.appendChild(deleteButton);
  }

  dateContainer.appendChild(date);
  historyBox.appendChild(image);
  historyBox.appendChild(description);

  container.appendChild(dateContainer);
  container.appendChild(historyBox);

  historyContainer.insertBefore(container, historyForm); 
}

function showConfirmation(event) {
  disableScroll();

  // Open popup for confirmation
  openConfirmationPopup(event);
}

function openConfirmationPopup(event) {
  const popupContainer = document.createElement("div");
  const popupHeader = document.createElement("h1");
  const buttonContainer = document.createElement("div");
  const noButton = document.createElement("button");
  const yesButton = document.createElement("button");
  
  popupContainer.classList.add("fixed", "top-1/3", "left-1/4", "w-1/2", "p-4", "bg-bg-color",
                                 "border-b-4", "border-custom-bege", "rounded-md", "shadow-md");
  buttonContainer.classList.add("mt-2", "flex", "gap-2", "place-content-center");
  noButton.classList.add("border-b-4", "p-2", "dynamic-button", "bg-custom-light-purple",  "border-custom-purple");
  yesButton.classList.add("border-b-4", "p-2", "dynamic-button", "bg-custom-light-purple",  "border-custom-purple");

  popupHeader.textContent = "Tens a certeza que queres apagar história?";
  noButton.textContent = "Não";
  yesButton.textContent = "Sim";

  noButton.addEventListener("click", () => {
    popupContainer.remove()
    enableScroll()
  });

  yesButton.addEventListener("click", () => {
    deleteHistory(event);
    popupContainer.remove();
    enableScroll()
  });

  buttonContainer.appendChild(noButton);
  buttonContainer.appendChild(yesButton);

  popupContainer.appendChild(popupHeader);
  popupContainer.appendChild(buttonContainer);
  
  historyContainer.appendChild(popupContainer);
}



function deleteHistory(event) {
  const historyElement = event.target.parentElement.parentElement;
  // Update changes to visual history boxes (remove the history box)
  historyElement.remove();

  // Remove history from local variable
  const history = historyElements.find((element) => element.historyIndex == historyElement.getAttribute("historyIndex"));
  historyElements.splice(historyElements.indexOf(history), 1);

  // Update changes to local storage
  saveData("historyElements", historyElements);
}

function displayNewMessage() {
  const newMessage = messages[Math.floor(Math.random() * messages.length)];

  messagesContainer.textContent = newMessage;
}


function saveData(key, obj) {
  if (storageAvailable('localStorage')) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}

function retrieveData(key) {
  if (storageAvailable('localStorage')) {
    return JSON.parse(localStorage.getItem(key));
  }
}

function storageAvailable(type) {
  let storage;
  try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}



// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}