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

const displayProfile = async (gender) => {
 
  while (score === 0) {
      let answer = prompt('Har du lyst til å swipe mer? Ja/Nei').toLowerCase();
      if (answer === 'ja') {
          score = 10;
          Showscore.textContent = score;
      } else {
          continue;
      }
  }

  if (gender && score > 0) {
      currentGender = gender;
  }

  profile = await fetchRandomUserProfile(currentGender);

  const div = document.createElement('div');
  if(profile.gender == 'male'){
      div.style.backgroundColor = '#0003ff'
  } else if (profile.gender == 'female'){
      div.style.backgroundColor = '#ff00d9'
  }
  div.classList = 'card';
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  const img = document.createElement('img');
  img.setAttribute('src', profile.picture.large);

  h4.textContent = `${profile.name.first} ${profile.name.last}`;
  p.textContent = profile.location.city;

  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(img);

  cardContainer.appendChild(div);

  score--;
  Showscore.textContent = score;
}


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