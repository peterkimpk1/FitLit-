import users from './data/users.js';

const userMessageInfo = document.querySelector('.welcome-message');

// Select a random user for demonstration


// window.addEventListener('load', () => {
//   updateUserMessage(randomUser);
// });

const updateUserMessage = (user) => {
  userMessageInfo.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${user.name}</h1>
  </header>`;
};

export {
  updateUserMessage
};

