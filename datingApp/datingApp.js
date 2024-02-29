const Showscore = document.getElementById('score');
const womenButton = document.getElementById('filter-women');
const menButton = document.getElementById('filter-men');
const allButton = document.getElementById('filter-all');
const cardContainer = document.querySelector('.card-container');
const likedProfiles = document.querySelector('.likedProfils-container');
 
let likedProfilArray = [];
 
 
let score = 10;
 
//fetching
 
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
 
let currentGender = '';
let profile;
 
// Viser filterte profiler
 
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
 
// legger inn på localstorage
 
const saveLikedProfilesToLocalStorage = () => {
    localStorage.setItem('likedProfiles', JSON.stringify(likedProfilArray));
};
 
 
//De likte profilene
 
const addToLikedProfiles = async () => {
    const currentProfile = {
        name: `${profile.name.first} ${profile.name.last}`,
        city: profile.location.city,
        age: profile.dob.age
    };
 
    likedProfilArray.push(currentProfile);
 
    const likedDiv = document.createElement('div');
    likedDiv.classList.add('liked-profile');
 
    const h4 = document.createElement('h4');
    h4.textContent = currentProfile.name;
    const p = document.createElement('p');
    p.textContent = currentProfile.city;
    const ageP = document.createElement('p');
    ageP.textContent = currentProfile.age;
 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        const index = likedProfilArray.indexOf(likedDiv);
            likedProfilArray.splice(index, 1);
            saveLikedProfilesToLocalStorage();
            likedDiv.remove();
    });
 
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const newName = prompt('Enter the new name:');
        const newAge = prompt('Enter the new age:');
        const newCity = prompt('Enter the new city:');
        const index = likedProfilArray.indexOf(currentProfile);
        if (newName) {
            h4.textContent = newName;
            likedProfilArray[index].name = newName;
        }
        if (newAge) {
            ageP.textContent = newAge;
            likedProfilArray[index].age = newAge;
        }
        if (newCity) {
            p.textContent = newCity;
            likedProfilArray[index].city = newCity;
        }
        saveLikedProfilesToLocalStorage();
    });
    
 
    likedDiv.appendChild(h4);
    likedDiv.appendChild(p);
    likedDiv.appendChild(ageP);
    likedDiv.appendChild(deleteButton);
    likedDiv.appendChild(editButton);
 
    if (likedProfilArray.length < 10) {
        likedProfiles.appendChild(likedDiv);
        saveLikedProfilesToLocalStorage();
    } else {
        alert('Du kan kun ha 10 likte profiler. Fjern minst én profil før du fortsetter.');
    }
};
 
 
//Click event på knappene for å filtere kjønn.
womenButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    displayProfile('female');
});
menButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    displayProfile('male');
});
allButton.addEventListener('click', () => {
    cardContainer.innerHTML = '';
    displayProfile('');
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