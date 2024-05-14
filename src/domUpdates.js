import users from './data/users.js';

const userMessageInfo = document.querySelector('.welcome-message');

// Select a random user for demonstration

const updateUserMessage = (users) => {
  userMessageInfo.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${users.name}</h1>
  </header>`;
};

export {
  updateUserMessage
};

