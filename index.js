const buttonDark = document.getElementById("buttonDark");
buttonDark.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("light");
}
