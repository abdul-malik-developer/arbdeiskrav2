const showScore = document.getElementById('score');
const womenButton = document.getElementById('filter-women');
const menButton = document.getElementById('filter-men');
const allButton = document.getElementById('filter-all');
const cardContainer = document.querySelector('.card-container');
const likedProfiles = document.querySelector('.likedProfils-container');

let likedProfileArray = JSON.parse(localStorage.getItem('likedProfiles')) || [];


let score = 10;

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

const displayProfile = async (gender) => {
    while (score === 0) {
        let answer = prompt('Har du lyst til å swipe mer? Ja/Nei').toLowerCase();
        if (answer === 'ja') {
            score = 10;
            showScore.textContent = score;
        } else {
            continue;
        }
    }

    if (gender && score > 0) {
        currentGender = gender;
    }

    profile = await fetchRandomUserProfile(currentGender);
    if (!profile) return; // Handle case where no profile is fetched

    const div = document.createElement('div');
    div.style.backgroundColor = profile.gender === 'male' ? '#0003ff' : '#ff00d9';
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
    showScore.textContent = score;
}

const saveLikedProfilesToLocalStorage = () => {
    localStorage.setItem('likedProfiles', JSON.stringify(likedProfileArray));
};

const addToLikedProfiles = async () => {
    if (!profile) return;

    const currentProfile = {
        name: `${profile.name.first} ${profile.name.last}`,
        city: profile.location.city,
        age: profile.dob.age
    };

    likedProfileArray.push(currentProfile);

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
        const index = likedProfileArray.indexOf(currentProfile);
        likedProfileArray.splice(index, 1);
        saveLikedProfilesToLocalStorage();
        likedDiv.remove();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const newName = prompt('Enter the new name:');
        const newAge = prompt('Enter the new age:');
        const newCity = prompt('Enter the new city:');
        const index = likedProfileArray.indexOf(currentProfile);
        if (newName) {
            h4.textContent = newName;
            likedProfileArray[index].name = newName;
        }
        if (newAge) {
            ageP.textContent = newAge;
            likedProfileArray[index].age = newAge;
        }
        if (newCity) {
            p.textContent = newCity;
            likedProfileArray[index].city = newCity;
        }
        saveLikedProfilesToLocalStorage();
    });

    likedDiv.appendChild(h4);
    likedDiv.appendChild(p);
    likedDiv.appendChild(ageP);
    likedDiv.appendChild(deleteButton);
    likedDiv.appendChild(editButton);

    if (likedProfileArray.length < 10) {
        likedProfiles.appendChild(likedDiv);
        saveLikedProfilesToLocalStorage();
    } else {
        alert('Du kan kun ha 10 likte profiler. Fjern minst én profil før du fortsetter.');
    }
};

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

document.addEventListener('keydown', async function(event) {
    if (event.key === 'ArrowLeft' && currentGender) {
        cardContainer.innerHTML = '';
        await displayProfile();
    } else if (event.key === 'ArrowRight' && currentGender) {
        addToLikedProfiles();
        cardContainer.innerHTML = '';
        displayProfile();
    }
});

window.addEventListener('load', () => {
    likedProfileArray = JSON.parse(localStorage.getItem('likedProfiles')) || [];
    likedProfileArray.forEach(profile => {
        const likedDiv = document.createElement('div');
        likedDiv.classList.add('liked-profile');

        const h4 = document.createElement('h4');
        h4.textContent = profile.name;
        const p = document.createElement('p');
        p.textContent = profile.city;
        const ageP = document.createElement('p');
        ageP.textContent = profile.age;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const index = likedProfileArray.indexOf(profile);
            likedProfileArray.splice(index, 1);
            saveLikedProfilesToLocalStorage();
            likedDiv.remove();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newName = prompt('Enter the new name:');
            const newAge = prompt('Enter the new age:');
            const newCity = prompt('Enter the new city:');
            if (newName) {
                h4.textContent = newName;
                profile.name = newName;
            }
            if (newAge) {
                ageP.textContent = newAge;
                profile.age = newAge;
            }
            if (newCity) {
                p.textContent = newCity;
                profile.city = newCity;
            }
            saveLikedProfilesToLocalStorage();
        });

        likedDiv.appendChild(h4);
        likedDiv.appendChild(p);
        likedDiv.appendChild(ageP);
        likedDiv.appendChild(deleteButton);
        likedDiv.appendChild(editButton);

        likedProfiles.appendChild(likedDiv);
    });
});