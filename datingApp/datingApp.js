const Showscore = document.getElementById("score");
const womenButton = document.getElementById("filter-women");
const menButton = document.getElementById("filter-men");
const allButton = document.getElementById("filter-all");
const cardContainer = document.querySelector(".card-container");
const likedProfiles = document.querySelector(".likedProfils-container");

//Variabel for score og funksjon for å oppdatere det.
let score = 10;

let likedProfilArray = [];

const fetchRandomUserProfile = async (gender) => {
  let url = "https://randomuser.me/api/";
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


//ArrowLeft & ArrowRight
document.addEventListener('keydown', async function(event) {
    if (event.key === 'ArrowLeft' && currentGender) {
        cardContainer.innerHTML = '';
        await displayProfile();
    } else if (event.key === 'ArrowRight' && currentGender){
        addToLikedProfiles();
        cardContainer.innerHTML = '';
        displayProfile();
    }
});