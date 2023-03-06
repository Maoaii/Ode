function showDropdown() {
    var x = document.getElementById("menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


const topButton = document.getElementById("top-button");

window.onscroll = function() {
  scrollFunction()
};

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