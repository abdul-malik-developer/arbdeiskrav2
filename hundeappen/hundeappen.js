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
  const div = document.createElement("div");
  const ownerDiv = document.createElement("div");
  const dogDiv = document.createElement("div");
  ownerDiv.classList = "owner-img";
  dogDiv.classList = "dog-img";
  div.classList = "card";
  const pCity = document.createElement("p");
  const pName = document.createElement("p");
  const imgDog = document.createElement("img");
  const imgUser = document.createElement("img");
  const chatBtn = document.createElement("button");
  let deleteBtn;

  if (url === "https://dog.ceo/api/breeds/image/random") {
    deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", () => {
      div.remove();
      displayProfile(url);
    });
    deleteBtn.textContent = "delete";
    deleteBtn.style.backgroundColor = "#C70000";
  }

  chatBtn.addEventListener("click", () => {
    chatBox(`Hey, God Evening!!`);
  });
  chatBtn.textContent = "chat";
  imgDog.setAttribute("src", dogImg);
  imgUser.setAttribute("src", profile.picture.large);
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

  div.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * randomGreeting.length);
    const h2 = document.createElement("h2");
    h2.setAttribute(
      "style",
      "background-color: whitesmoke; color: blue; padding: 10px; border-radius: 20px; display: inline-block; position: relative; font-size: 1rem"
    );
    h2.textContent = randomGreeting[randomIndex];
    div.insertAdjacentElement("beforeend", h2);
    setTimeout(() => {
      h2.remove();
    }, 2000);
  });
};

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    displayProfile("https://dog.ceo/api/breeds/image/random");
  }, 2000 * i);
}

newCards.addEventListener("click", () => {
  const existingCards = cardsContainer.querySelectorAll(".card");
  existingCards.forEach((card) => {
    card.remove();
  });
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      displayProfile("https://dog.ceo/api/breeds/image/random");
    }, 2000 * i);
  }
});
filterBtn.addEventListener('click', () =>{
    let breeds = breedDropdown.value;
    for (let i = 0; i < 10; i++) {
        setTimeout(() =>{
            displayProfile(`https://dog.ceo/api/breed/${breeds}/images/random`);
        }, 2000 * i);
    }
});


chattBoxImg.addEventListener('click', () =>{
    chatBox('type...')
})

function chatBox(ownerMessage) {
    chattBoxImg.style.display = 'none';
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-box');

    const chatHeader = document.createElement('div');
    chatHeader.classList.add('chat-header');
    chatHeader.textContent = 'Chat Box';

    const chatBody = document.createElement('div');
    chatBody.classList.add('chat-body');
    chatBody.setAttribute('id', 'chatBody');
    if (ownerMessage) {
        const messageFromOwner = document.createElement('p');
        messageFromOwner.textContent = ownerMessage;
        chatBody.appendChild(messageFromOwner);
    }
    const messageInput = document.createElement('input');
    messageInput.setAttribute('type', 'text');
    messageInput.classList.add('chat-input');
    messageInput.setAttribute('id', 'messageInput');
    messageInput.placeholder = 'Type your message...';

    const sendButton = document.createElement('button');
    sendButton.classList.add('send-button');
    sendButton.setAttribute('id', 'sendButton');
    sendButton.textContent = 'Send';

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.textContent = '×';

    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatBody);
    chatContainer.appendChild(messageInput);
    chatContainer.appendChild(sendButton);
    chatContainer.appendChild(closeButton);

    chatParentContainer.appendChild(chatContainer);

    closeButton.addEventListener('click', () => {
        chatContainer.remove();
        chattBoxImg.style.display = 'block';
    });

    sendButton.addEventListener('click', () => {
        const text = document.createElement('p');
        const deleteChat = document.createElement('button');
        deleteChat.textContent = 'x';
        deleteChat.style.color = 'red';
        deleteChat.style.padding = '2px 5px';
        deleteChat.style.border = 'none';
        deleteChat.style.background = 'none';
        deleteChat.style.cursor = 'pointer';
        deleteChat.addEventListener('click', () => {
            text.remove();
        });
        text.textContent = messageInput.value;
        text.appendChild(deleteChat);
        chatBody.appendChild(text);
        messageInput.value = '';
    });
}


