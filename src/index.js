const buttonDark = document.getElementById("btn-dark");
const buttonSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("input-search");
const spanResults = document.getElementById("span-results");

const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profileUser = document.getElementById("profile-username");
const profileJoined = document.getElementById("profile-joined");
const profileDescription = document.getElementById("profile-description");
const publicRepos = document.getElementById("public-repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const userLocation = document.getElementById("user-location");
const userBlog = document.getElementById("user-blog");
const userTiwtter = document.getElementById("user-tiwtter");
const userCompany = document.getElementById("user-company");

function toggleDarkMode() {
  document.body.classList.toggle("light");
  handleChangeIcon(buttonDark);
}

function handleChangeIcon() {
  const icon = document.querySelector(".header__icon");

  if (document.body.classList.contains("light")) {
    buttonDark.innerHTML = "Dark";
    icon.src = "./assets/icons/moon-min.svg";
    icon.alt = "icono luna";
  } else {
    buttonDark.innerHTML = "LIGHT";
    icon.src = "./assets/icons/002-sun-min.svg";
    icon.alt = "icono sol";
  }
}

async function searchUser() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${inputSearch.value}`
    );
    if (!response.ok) {
      throw new Error("No results");
    }
    const data = await response.json();
    resetUi(data);
    spanResults.innerText = "";
    spanResults.style.background = "transparent";
  } catch (error) {
    spanResults.innerText = "No results";
    spanResults.style.background = "var(--dark-blue)";
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
  const image = data.avatar_url;
  const name = data.name;
  const user = data.login;
  const joined = data.created_at;

  const bio = data.bio || "";

  const repos = data.public_repos;
  const myFollowers = data.followers;
  const myfollowing = data.following;

  const location = data.location || "Not Avilable";
  const blog = data.blog || "#";
  const tiwtter = `@${data.tiwtter_username} ` || "Not Avalible";
  const company = data.company || "Not Avalible";

  profileImage.src = image;
  profileName.textContent = name;
  profileUser.textContent = `@${user}`;
  profileJoined.textContent = formatJoinedDate(joined);
  profileDescription.textContent = bio;
  publicRepos.textContent = repos;
  followers.textContent = myFollowers;
  following.textContent = myfollowing;
  userLocation.textContent = location;
  userBlog.href = blog;
  userTiwtter.textContent = tiwtter;
  userCompany.textContent = company;
}

buttonDark.addEventListener("click", toggleDarkMode);
buttonSearch.addEventListener("click", searchUser);
inputSearch.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchUser();
  }
});
