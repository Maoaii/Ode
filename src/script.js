const topButton = document.getElementById("top-button");
const messagesContainer = document.getElementById("messages-container");
const newMessageButton = document.getElementById("new-message-button");

let messages = ["Hello", "How are you?", "I'm fine", "Goodbye"];

window.onscroll = function() {
  scrollFunction()
};
newMessageButton.addEventListener("click", displayNewMessage);


function displayNewMessage() {
  const newMessage = messages[Math.floor(Math.random() * messages.length)];

  messagesContainer.textContent = newMessage;
}

function showDropdown() {
    var x = document.getElementById("menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function scrollFunction() {
  if (document.body.scrolLTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}