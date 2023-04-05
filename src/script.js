const nav = document.getElementById("navbar");
const topButton = document.getElementById("top-button");
const dropdown = document.getElementById("dropdown");
const messagesContainer = document.getElementById("messages-container");
const newMessageButton = document.getElementById("new-message-button");
const historyContainer = document.getElementById("history-container");
const historyForm = document.getElementById("history-form");
const historyImageInput = document.getElementById("image-input");


const pastHistoryElements = [
  {day: "06", month: "02", year: "2019", imagePath: "public/assets/img/historyphotos/2019-02-06.jpeg", description: "Lembras-te disto? Ainda não namorávamos e tivemos o nosso primeiro 'date'...\nFoi um momento muito querido e cheio de borboletas na barriga!", historyIndex: 1, isPast: true},
  {day: "06", month: "03", year: "2019", imagePath: "public/assets/img/historyphotos/2019-03-06.jpg", description: "Pouco tempo depois desse date tive a oportunidade de fazer a primeira supresa e mostrar os meus dotes engatatões haha.", historyIndex: 1, isPast: true},
  {day: "31", month: "07", year: "2019", imagePath: "public/assets/img/historyphotos/2019-07-31.jpg", description: "Já namorávamos há pouco tempo e fomos numa super viagem ao X! Verdade que não andámos em muita coisa, mas foi uma aventura em pêras!", historyIndex: 1, isPast: true},
  {day: "15", month: "01", year: "2020", imagePath: "public/assets/img/historyphotos/2020-01-15.jpg", description: "Este momento é grande hahah! O início da tua super coleção de peluches para a cama. Trazê-lo até tua casa foi a melhor parte :).", historyIndex: 1, isPast: true},
  // {day: "26", month: "03", year: "2020", imagePath: "public/assets/img/historyphotos/2020-03-26.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "30", month: "04", year: "2020", imagePath: "public/assets/img/historyphotos/2020-04-30.jpg", description: "Estas aventuras com o Gladiador vão ficar para sempre marcadas e eternizadas aqui <3", historyIndex: 1, isPast: true},
  // {day: "27", month: "05", year: "2020", imagePath: "public/assets/img/historyphotos/2020-05-27.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "15", month: "09", year: "2020", imagePath: "public/assets/img/historyphotos/2020-09-15.jpg", description: "Mais um para a coleção! ", historyIndex: 1, isPast: true},
  // {day: "27", month: "09", year: "2020", imagePath: "public/assets/img/historyphotos/2020-09-27.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "20", month: "02", year: "2021", imagePath: "public/assets/img/historyphotos/2021-02-20.jpg", description: "18 anitos da piquena! Foi a partir daqui que começaste a ganhar asas e tens crescido imenso desde então. Claro que tinha de haver uma com os zezocas hehe.", historyIndex: 1, isPast: true},
  {day: "23", month: "05", year: "2021", imagePath: "public/assets/img/historyphotos/2021-05-23.jpeg", description: "", historyIndex: 1, isPast: true},
  {day: "21", month: "08", year: "2021", imagePath: "public/assets/img/historyphotos/2021-08-21.jpg", description: "Este verão foi repleto de casamentos e, vamos ser sincero, nós arrasámos todos.", historyIndex: 1, isPast: true},
  {day: "11", month: "09", year: "2021", imagePath: "public/assets/img/historyphotos/2021-09-11.jpg", description: "", historyIndex: 1, isPast: true},
  {day: "18", month: "12", year: "2021", imagePath: "public/assets/img/historyphotos/2021-12-18.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "14", month: "02", year: "2022", imagePath: "public/assets/img/historyphotos/2022-02-14.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "13", month: "03", year: "2022", imagePath: "public/assets/img/historyphotos/2022-03-13.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "08", month: "04", year: "2022", imagePath: "public/assets/img/historyphotos/2022-04-08.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "17", month: "08", year: "2022", imagePath: "public/assets/img/historyphotos/2022-08-17.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "06", month: "10", year: "2022", imagePath: "public/assets/img/historyphotos/2022-10-06.jpg", description: "hello!", historyIndex: 1, isPast: true},
  {day: "04", month: "11", year: "2022", imagePath: "public/assets/img/historyphotos/2022-11-04.jpg", description: "hello!", historyIndex: 1, isPast: true},
];
let historyElements = [];
let currentIndex = 0;
let messages = [
  "A Martinha é desarrumada, muito dorminhoca e deixa uma pessoa louca com o seu despertador! Apesar disso tudo, é uma amiga protetora, muito doce, alegre e tenho muito orgulho nela. Amo-a muito!"
];

topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
newMessageButton.addEventListener("click", displayNewMessage);
historyForm.addEventListener("submit", submitHistoryEvent);
historyImageInput.addEventListener("change", updateImageSaved);
topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
dropdown.addEventListener("click", () => document.getElementById("menu").classList.toggle("hidden"));
newMessageButton.addEventListener("click", displayNewMessage);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

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

$(window).on("load", function()  {
  setTimeout(showWebsite, 1000);
  getHistoryElements();
  getCurrentIndex();
  displayNewMessage();
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
  addHistoryElement(historyElement.day, historyElement.month, historyElement.year, 
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
    day: date[2],
    month: date[1],
    year: date[0],
    imagePath: image,
    description: description,
    historyIndex: currentIndex++
  };
  
  historyElements.push(element);
  addHistoryElement(element.day, element.month, element.year, element.imagePath, element.description, element.historyIndex);

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



function addHistoryElement(day, month, year, imagePath, descriptionText, index, isPast) {
  const container = document.createElement("div");
  const dateContainer = document.createElement("div");
  const date = document.createElement("p");
  const historyBox = document.createElement("div");
  const image = document.createElement("img");
  const description = document.createElement("p");

  container.classList.add("flex", "items-center", "gap-4", "place-content-center");
  dateContainer.classList.add("date-circle");
  historyBox.classList.add("history-box");
  description.classList.add("mt-4");
  date.classList.add("break-words", "my-auto", "p-2")
  
  container.setAttribute("data-historyIndex", index)
  image.setAttribute("src", imagePath);
  
  date.textContent = day + "/" + month + "/" + year;
  description.textContent = descriptionText;
  
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
  popupHeader.classList.add("lg:text-2xl")
  buttonContainer.classList.add("mt-2", "flex", "gap-2", "place-content-center");
  noButton.classList.add("border-b-4", "p-2", "dynamic-button", "bg-custom-light-purple",  "border-custom-purple");
  yesButton.classList.add("border-2", "p-2", "dynamic-button",  "border-custom-purple", "active:border-b-2");

  popupHeader.textContent = "Tens a certeza que queres apagar a história?";
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