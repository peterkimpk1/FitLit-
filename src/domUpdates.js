import { fetchUser } from './fetchData/userData.js'
import { hydrationData } from '../src/data/hydration.js'
import { getRandomUser, getUserData, getAverageStepGoalAllUsers } from '../src/userFunctions.js'
import { getConsumedWaterForDay } from '../src/hydrationFunctions.js'
const welcomeMessage = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')
const userStepGoalDisplay = document.querySelector('.display-step-goal')
const averageStepDisplay = document.getElementById('display-average-goal-steps')
const userIdAddressEmail = document.querySelector('.user-id-address-email')
const userStrideLength = document.querySelector('.user-stride-length')
const userDailySteps = document.querySelector('.user-daily-step-goal')
const userDailyHydration = document.querySelector('.display-user-hydration-day')


window.addEventListener('load', () => {
  fetchUserData()
});

const updateUserGoal = () => {
  userStepGoalDisplay.innerText = ``
}

const updateAverageSteps = (allUsers) => {
  averageStepDisplay.innerText = `${getAverageStepGoalAllUsers(allUsers)}`
}

function updateUserDailyHydration(hydrationData,userId,date) {
    userDailyHydration.innerText = `${getConsumedWaterForDay(hydrationData,userId,date)}`
}

function fetchUserData() {
  Promise.all([fetchUser()]).then(e => {
    const randomUser = getRandomUser(e[0].users)
    const user = getUserData(e[0].users, randomUser.id)
    updateUserCard(user)
    updateUserGoal()
    updateUserMessage(randomUser);
    updateAverageSteps(e[0].users)
  })
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
  updateUserMessage,
  updateUserDailyHydration
};

