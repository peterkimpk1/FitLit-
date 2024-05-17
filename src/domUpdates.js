import { fetchUser } from './fetchData/userData.js'
import { getRandomUser, getUserData, getAverageStepGoalAllUsers } from '../src/userFunctions.js'
const welcomeMessage = document.querySelector('.welcome-message');
const userStepGoalContainer = document.querySelector('.user-step-goal')
const averageStepContainer = document.querySelector('.average-goal-steps')
const userStepGoalDisplay = document.getElementById('display-step-goal')
const averageStepDisplay = document.getElementById('display-average-goal-steps')
const userIdAddressEmail = document.querySelector('.user-id-address-email')
const userStrideLength = document.querySelector('.user-stride-length')
const userDailySteps = document.querySelector('.user-daily-step-goal')
const friendsWrapper = document.querySelector('.friends-wrapper')

window.addEventListener('load', () => {
  fetchUserData()
});

const updateUserGoal = (user) => {
  userStepGoalDisplay.innerText = `${user.dailyStepGoal} 👟`
}


const updateAverageSteps = (steps) => {
  averageStepDisplay.innerText = `${steps}`
}

function fetchUserData() {
  Promise.all([fetchUser()]).then(e => {
    const userList = e[0].users
    const randomUser = getRandomUser(userList)
    const user = getUserData(userList, randomUser.id)
    updateUserCard(user)
    updateUserGoal(user)
    const friendsSteps = updatedUserFriends(user, e[0].users)
    updateUserMessage(randomUser);
    updateAverageSteps(Math.round(friendsSteps))
  })
}

function updatedUserFriends(user, users) {
  let sortedFriends = user.friends.sort((a,b)=> a-b)
  let friendsStepGoals = sortedFriends.map(friend => {
    const singleUser = users.filter(user => user.id === friend)
    return singleUser[0].dailyStepGoal
  })
  let friendsTotal = friendsStepGoals.reduce((total,friend) => {
    total+= friend
    return total;
  },0)
  for (var i = 0; i < user.friends.length; i++) {
    friendsWrapper.innerHTML += `<div class="user-friend"> id: ${sortedFriends[i]}
    <p class="display-user-friend" id="${i}">${friendsStepGoals[i]}</p></div>`
  }
  return friendsTotal / friendsStepGoals.length;
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

