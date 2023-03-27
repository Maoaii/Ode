const nav = document.getElementById("navbar");
const topButton = document.getElementById("top-button");
const dropdown = document.getElementById("dropdown");
const messagesContainer = document.getElementById("messages-container");
const newMessageButton = document.getElementById("new-message-button");
const historyContainer = document.getElementById("history-container");

let messages = ["Hello", "How are you?", "I'm fine", "Goodbye"];
let historyElements = [
  {month: "Jan", year:"2020", imagePath:"img/elementor-placeholder-image.webp", description:"Hallo!"},
  {month: "Jan", year:"2020", imagePath:"img/elementor-placeholder-image.webp", description:"Hallo!"},
]
$(window).on("load", function()  {
  setTimeout(function() {
    $(".heart").fadeOut();
    $(".back").fadeOut();
    document.querySelector("header").classList.remove("hidden");
    document.querySelector("main").classList.remove("hidden");
    document.querySelector("footer").classList.remove("hidden");
  }, 1000)
});

// Populate history elements
historyElements.forEach(historyElement => {
  addHistoryElement(historyElement.month, historyElement.year, historyElement.imagePath, historyElement.description);
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

topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));
dropdown.addEventListener("click", () => document.getElementById("menu").classList.toggle("hidden"));
newMessageButton.addEventListener("click", displayNewMessage);


function addHistoryElement(month, year, imagePath, descriptionText) {
  const container = document.createElement("div");
  const dateContainer = document.createElement("div");
  const date = document.createElement("p");
  const historyBox = document.createElement("div");
  const image = document.createElement("img");
  const description = document.createElement("p");

  container.classList.add("flex", "items-center", "gap-4");
  dateContainer.classList.add("date-circle");
  historyBox.classList.add("history-box");
  description.classList.add("mt-4");

  date.textContent = month + " - " + year;
  description.textContent = descriptionText;

  image.src = imagePath;

  dateContainer.appendChild(date);
  historyBox.appendChild(image);
  historyBox.appendChild(description);

  container.appendChild(dateContainer);
  container.appendChild(historyBox);

  historyContainer.appendChild(container);
}

function displayNewMessage() {
  const newMessage = messages[Math.floor(Math.random() * messages.length)];

  messagesContainer.textContent = newMessage;
}