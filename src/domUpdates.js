import users from './data/users.js';

const userMessageInfo = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')


const displayUserGoal = () => {}
const displayAverageSteps = () => {}


const updateUserMessage = (users) => {  
  userMessageInfo.innerHTML = `<header>
  <h1 class="welcome-message">Welcome ${users.name}</h1>
  </header>`;
};

export {
  displayUserGoal,
  displayAverageSteps,
  updateUserMessage
};

