const randomUser = "https://randomuser.me/api/";
const cardsContainer = document.getElementById("cardsContainer");
const newCards = document.querySelector(".singel-btn");
const breedDropdown = document.getElementById("hundeFiltering");
const filterBtn = document.getElementById("filterBtn");
const randomGreeting = [
  "Voff voff",
  "Grrr!",
  "Mjau??",
  "Voff!",
  "Voff voff voff",
  "WRAFF!!!",
];
const chattBoxImg = document.getElementById("chatBtnImg");
const chatParentContainer = document.querySelector(".chat-container");

async function fetchDogImage(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

async function fetchRandomUser() {
  try {
    const response = await fetch(randomUser);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error("Error fetching random user:", error);
  }
}

const displayProfile = async (url) => {
    const dogImg = await fetchDogImage(url);
    const profile = await fetchRandomUser();
    const div = document.createElement('div');
    const ownerDiv = document.createElement('div');
    const dogDiv = document.createElement('div');
    ownerDiv.classList = 'owner-img'
    dogDiv.classList = 'dog-img'
    div.classList = 'card';
    const pCity = document.createElement('p');
    const pName = document.createElement('p');
    const imgDog = document.createElement('img');
    const imgUser = document.createElement('img');
    const chatBtn = document.createElement('button')
    let deleteBtn;
 
    if (url === 'https://dog.ceo/api/breeds/image/random') {
        deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => {
            div.remove();
            displayProfile(url);
        });
        deleteBtn.textContent = 'delete';
        deleteBtn.style.backgroundColor = '#C70000';
    }
 
    chatBtn.addEventListener('click', () =>{
        chatBox(`Hey, God Evening!!`);
    })    
    chatBtn.textContent = 'chat';
    imgDog.setAttribute('src', dogImg);
    imgUser.setAttribute('src', profile.picture.large);
    console.log(profile.picture.large);
 
    pName.textContent = `${profile.name.first} ${profile.name.last}`;
    pCity.textContent = profile.location.city;
 
    ownerDiv.appendChild(imgUser);
    dogDiv.appendChild(imgDog);
 
    div.appendChild(ownerDiv);
    div.appendChild(dogDiv);
    div.appendChild(pName);
    div.appendChild(pCity);
    div.appendChild(chatBtn);
    if (deleteBtn) {
        div.appendChild(deleteBtn);
    }
    cardsContainer.appendChild(div);
 
    div.addEventListener('click', () =>{
        const randomIndex = Math.floor(Math.random() * randomGreeting.length);
        const h2 = document.createElement('h2');
        h2.setAttribute('style', 'background-color: whitesmoke; color: blue; padding: 10px; border-radius: 20px; display: inline-block; position: relative; font-size: 1rem');
        h2.textContent = randomGreeting[randomIndex];
        div.insertAdjacentElement('beforeend', h2)
        setTimeout(() =>{
            h2.remove()
        },2000)
    })
};