
let url = "https://randomuser.me/api/";
const showScore = document.getElementById("score");
const womenButton = document.getElementById("filter-women");
const menButton = document.getElementById("filter-men");
const allButton = document.getElementById("filter-all");
const cardContainer = document.querySelector(".card-container");
const likedProfiles = document.querySelector(".likedProfils-container");

//Variabel for score og funksjon for å oppdatere det.
let score = 10;

document.getElementById("yes").addEventListener("click", function () {
  updateScore;
  ("yes");
});

document.getElementById("yes").addEventListener("click", function () {
  updateScore;
  ("no");
});

function updateScore(Swiped) {
  if (swiped === "yes" || swiped === "no") {
    userScore--;
    showScore.innerHTML = "User score: " + userScore;
  } else {
    console.log("Invalid");
  }
}

// Api fetch

let likedProfilArray = [];

const fetchRandomUserProfile = async (gender) => {
  if (gender) {
    url += `?gender=${gender}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

//Filter knapper
womenButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  displayProfile("female");
});
menButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  displayProfile("male");
});
allButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  displayProfile("");
});

function displayProfile(gender) {}
