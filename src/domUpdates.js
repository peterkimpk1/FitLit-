import users from './data/users.js';
import {getRandomUser, getUserData} from '../src/userFunctions.js'
const allUsers = users.users
const welcomeMessage = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')
const userStepGoalDisplay = document.querySelector('.display-step-goal')
const averageStepDisplay = document.querySelector('.display-average-goal-steps')
const userIdAddressEmail = document.querySelector('.user-id-address-email')
const userStrideLength = document.querySelector('.user-stride-length')
const userDailySteps = document.querySelector('.user-daily-step-goal')


window.addEventListener('load', () => {
  updateRandomUserMessage(allUsers);
});


const updateUserGoal = () => {
  userStepGoalDisplay.innerText = `${}`
}

const updateAverageSteps = () => {
  averageStepDisplay.innerText = `${}`
}

function updateRandomUserMessage(users) {
  const randomUser = getRandomUser(users);
  const user = getUserData(allUsers,randomUser.id)
  updateUserCard(user)
  updateUserMessage(randomUser);
}

function updateUserCard(user) {
  userIdAddressEmail.innerText = `ID: ${user.id}, Address: ${user.address}, Email: ${user.email}`
  userStrideLength.innerText = `Stride Length: ${user.strideLength}`
}

const updateUserMessage = (users) => {  
  welcomeMessage.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${users.name}</h1>
  </header>`;
};

export {
  updateUserGoal,
  updateAverageSteps,
  updateUserMessage
};

