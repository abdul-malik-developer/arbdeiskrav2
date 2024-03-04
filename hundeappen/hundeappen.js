const dogApiUrl = 'https://dog.ceo/api/breeds/image/random'
const userApiUrl = 'https://randomuser.me/api/?results=10'

// Fetch data from RandomUser API
async function fetchRandomUser() {
    try {
        const response = await fetch(userApiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching random user data:', error);
        return [];
    }
}

// Fetch data from Dog API
async function fetchDogImage() {
    try {
        const response = await fetch(dogApiUrl);
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching dog image:', error);
    }
}
// Function to display profile cards
async function displayProfileCards(profiles) {
    try {
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = ''; // Clear previous cards

        for (let profile of profiles) {
            const card = document.createElement('div');
            card.classList.add('profile-card');

            // Add dog image
            const dogImage = await fetchDogImage();
            const image = document.createElement('img');
            image.src = dogImage;
            card.appendChild(image);

            // Add user name
            const name = document.createElement('p');
            name.textContent = ${profile.name.first} ${profile.name.last};
            card.appendChild(name);

            // Add location
            const location = document.createElement('p');
            location.textContent = ${profile.location.city}, ${profile.location.country};
            card.appendChild(location);

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Slett';
            deleteButton.addEventListener('click', () => {
                card.remove(); // Remove the card when delete button is clicked
            });
            card.appendChild(deleteButton);

            // Add chat button
            const chatButton = document.createElement('button');
            chatButton.textContent = 'Chat';
            chatButton.addEventListener('click', () => {
                // Logic to open chat box
                alert('Chat functionality will be implemented here');
            });
            card.appendChild(chatButton);

            profileContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error displaying profile cards:', error);
    }
}
// Event listener for "Show 10 new cards" button
document.getElementById('show-new-cards').addEventListener('click', async () => {
    displayProfileCards(await fetchRandomUser());
});

// Initial setup when the page loads
window.addEventListener('load', async () => {
    displayProfileCards(await fetchRandomUser());
});