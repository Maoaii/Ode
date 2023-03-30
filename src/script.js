const topButton = document.getElementById("top-button");
const dropdown = document.getElementById("dropdown");
const messagesContainer = document.getElementById("messages-container");
const newMessageButton = document.getElementById("new-message-button");
const historyContainer = document.getElementById("history-container");
const historyForm = document.getElementById("history-form");
const historyImageInput = document.getElementById("image-input");


const pastHistoryElements = [];
let historyElements = [];
let currentIndex = 0;
let messages = ["Hello", "How are you?", "I'm fine", "Goodbye"];


topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
dropdown.addEventListener("click", showDropdown);
newMessageButton.addEventListener("click", displayNewMessage);
historyForm.addEventListener("submit", submitHistoryEvent);
historyImageInput.addEventListener("change", (event) => {
  const image = historyImageInput.files[0];
  const imageName = document.getElementById("image-name");
  imageName.textContent = event.target.files[0].name;
  
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    saveData("image", reader.result);
  });
})


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
});


function showWebsite() {
  $(".heart").fadeOut();
  $(".back").fadeOut();
  document.querySelector("header").classList.remove("hidden");
  document.querySelector("main").classList.remove("hidden");
  document.querySelector("footer").classList.remove("hidden");
}

// Past history elements that won't be available for change
pastHistoryElements.forEach(() => {
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

function submitHistoryEvent(event) {
  event.preventDefault();

  const date = document.getElementById("date-input").value.split("-"); 
  const description = document.getElementById("description-input").value; 
  

  const element = {
    month: date[1],
    year: date[0],
    imagePath: retrieveData("image"),
    description: description,
    historyIndex: currentIndex++
  };
  
  historyElements.push(element);
  addHistoryElement(element.month, element.year, element.imagePath, element.description, element.historyIndex);

  saveData("historyElements", historyElements);
  saveData("historyIndex", currentIndex);
  cleanInputs();
}

function cleanInputs() {
  const imageInput = historyImageInput;
  const dateInput = document.getElementById("date-input");
  const textInput = document.getElementById("description-input");
  
  [imageInput, dateInput, textInput].forEach((inputElement) => {
    inputElement.value = null;
  });
  document.getElementById("image-name").textContent = "";
}

function showDropdown() {
    var x = document.getElementById("menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
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
    deleteButton.addEventListener("click", deleteHistory);
    historyBox.appendChild(deleteButton);
  }

  dateContainer.appendChild(date);
  historyBox.appendChild(image);
  historyBox.appendChild(description);

  container.appendChild(dateContainer);
  container.appendChild(historyBox);

  historyContainer.insertBefore(container, historyForm); 
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