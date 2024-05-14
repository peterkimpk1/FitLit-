import users from './data/users.js';
import {updateRandomUserMessage} from '../src/userFunctions.js'
const allUsers = users.users
const userMessageInfo = document.querySelector('.welcome-message');

window.addEventListener('load', () => {
  updateRandomUserMessage(allUsers);
});

const updateUserMessage = (users) => {
  userMessageInfo.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${users.name}</h1>
  </header>`;
};

export {
  updateUserMessage
};

