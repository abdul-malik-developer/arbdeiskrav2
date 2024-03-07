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