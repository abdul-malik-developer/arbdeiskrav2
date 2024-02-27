const Showscore = document.getElementById('score');
const womenButton = document.getElementById('filter-women');
const menButton = document.getElementById('filter-men');
const allButton = document.getElementById('filter-all');
const cardContainer = document.querySelector('.card-container');
const likedProfiles = document.querySelector('.likedProfils-container');

let score = 10;

let likedProfilArray = [];

const fetchRandomUserProfile = async (gender) => {
    let url = 'https://randomuser.me/api/';
    if (gender) {
        url += `?gender=${gender}`;
    } 
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

