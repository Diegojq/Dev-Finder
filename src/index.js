const buttonDark = document.getElementById("btn-dark");
const buttonSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");

var profileName = document.getElementById("profile-name");
var profileUser = document.getElementById("profile-username");
var profileJoined = document.getElementById("profile-joined");

buttonDark.addEventListener("click", toggleDarkMode);
buttonSearch.addEventListener("click", searchUser);

function toggleDarkMode() {
  document.body.classList.toggle("light");
}

async function searchUser() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${inputSearch.value}`
    );
    const data = await response.json();
    resetUi(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatJoinedDate(dateString) {
  const date = new Date(dateString);
  return `Joined ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

function resetUi(data) {
  const name = data.name;
  const user = data.login;
  const joined = data.created_at;

  profileName.textContent = name;
  profileUser.textContent = `@${user}`;
  profileJoined.textContent = formatJoinedDate(joined);
}
