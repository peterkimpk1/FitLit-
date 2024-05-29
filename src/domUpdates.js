import { fetchData } from './apiCalls.js'
import { createFriendChart, createSleepHoursAverageChart,
  createSleepQualityAverageChart,
  createSleepQualityDailyChart,
  createSleepHoursDailyChart,
  createSleepHoursAndQualityWeekChart,
  createStepCharts,
  createHydrationWeekChart,
  createHydrationDayChart } from './domCharts.js'
import { getRandomUser, getUserData} from '../src/userFunctions.js'
import { getCurrentDayWaterConsumption, getConsumedWaterForWeek, getConsumedWaterDates } from '../src/hydration.js';
import { getHoursSleptForCurrentDay, getSleepHoursForWeek, getSleepDates, getSleepQualityForWeek, getUserAverageHoursSlept, getUserAverageSleepQuality } from './sleep.js';

let userId = 0;
const welcomeMessage = document.querySelector('.welcome-message');
const userEmail = document.querySelector('.user-email');
const userAddress = document.querySelector('.user-address');
const userStrideLength = document.querySelector('.user-stride-length');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');
const OpenModalBtn = document.getElementById('openModalBtn');
const submitBtn = document.getElementById('submitBtn')
const form = document.getElementById('detailsModal');


const hoursSleptInput = document.getElementById('hours-slept');
const qualitySleptInput = document.getElementById('quality-of-sleep')
const dateInput = document.getElementById('date')
const dateErrorMessage = document.querySelector('.date-error-message')
const hoursSleptErrorMessage = document.querySelector('.hours-slept-error-message')
const qualitySleptErrorMessage = document.querySelector('.sleep-quality-error-message')


window.addEventListener('load', () => {
  fetchUserData()
})

OpenModalBtn.addEventListener('click', function(){
  form.style.display = 'block';
})


submitBtn.addEventListener('click', function(e){
  e.preventDefault(); 
  postSleepData(userId,dateInput.value,hoursSleptInput.value,qualitySleptInput.value)
})

hoursSleptInput.addEventListener('input', updateHoursSleptValidationStatus)
qualitySleptInput.addEventListener('input', updateSleepQualityValidationStatus)

function updateHoursSleptValidationStatus() {
  const isValidHours = isValidHoursSlept(hoursSleptInput.value);
  if (!isValidHours) {
    hoursSleptErrorMessage.classList.remove('hidden'); 
    submitBtn.disabled = true;
  } else {
    hoursSleptErrorMessage.classList.add('hidden'); 
    submitBtn.disabled = false;
  }
}

function updateSleepQualityValidationStatus() {
  const isValidQuality = isValidSleepQuality(qualitySleptInput.value)
  if (!isValidQuality) {
    qualitySleptErrorMessage.classList.remove('hidden')
    submitBtn.disabled = true;
  } else {
    qualitySleptErrorMessage.classList.add('hidden')
    submitBtn.disabled = false;
  }
}

function isValidHoursSlept(hours) {
  return hours >= 0 && hours <= 24
}

function isValidSleepQuality(quality) {
  return quality >= 0 && quality <= 5
}

function updateHydrationData(data, id) {
  const AllHydrationData = data
  const hydrationWeekWaterData = getConsumedWaterForWeek(AllHydrationData,id)
  const hydrationWeekDateData = getConsumedWaterDates(AllHydrationData,id).map(data => new Date(data))
  const hydrationDayData = getCurrentDayWaterConsumption(AllHydrationData,id)
  createHydrationWeekChart(hydrationWeekWaterData,hydrationWeekDateData)
  createHydrationDayChart(hydrationDayData,hydrationWeekDateData)
}

function updateSleepData(data, id) {
  const allSleepData = data
  const sleepWeekDateData = getSleepDates(allSleepData,id)
  const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,id)
  const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
  const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, id)
  const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, id)
  const sleepHoursAverageData = getUserAverageHoursSlept(allSleepData, id)
  const sleepQualityAverageData = getUserAverageSleepQuality(allSleepData, id)
  createSleepHoursAverageChart(sleepHoursAverageData)
  createSleepQualityAverageChart(sleepQualityAverageData)
  createSleepQualityDailyChart(sleepQualityWeekData,sleepHoursWeekDataConverted)
  createSleepHoursDailyChart(sleepHoursDayData,sleepHoursWeekDataConverted)
  createSleepHoursAndQualityWeekChart(sleepHoursWeekData,sleepQualityWeekData,sleepHoursWeekDataConverted)
}

function updateUserData(data, id) {
  const user = getUserData(data, id)
  updateUserCard(user)
  const friendsSteps = updatedUserFriends(user, data)
  createStepCharts(user, friendsSteps)
  
}

function fetchUserData() {
  Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep')]).then(e => {
    const randomUser = getRandomUser(e[0].users)
    userId = randomUser.id
    updateUserMessage(randomUser);
    updateUserData(e[0].users,randomUser.id)
    updateHydrationData(e[1].hydrationData, randomUser.id)
    updateSleepData(e[2].sleepData,randomUser.id)
  }).catch(err => alert('Could not display user info!!', err))
}

function postSleepData(id, date, hoursSlept, sleepQuality) {
  let formattedDate = date.split("-").join("/")
  fetch('http://localhost:3001/api/v1/sleep',{
    method:"POST",
    body: JSON.stringify({
      userID: id,
      date: formattedDate,
      hoursSlept: hoursSlept,
      sleepQuality: sleepQuality
    }),
    headers: {'Content-Type': 'application/json'}
  }).catch(err => alert('Could not post new sleep data.', err))
}

function updatedUserFriends(user, users) {
  let sortedFriends = user.friends.sort((a,b)=> a-b)
  let friendNames = sortedFriends.map(id => users.filter(user => user.id === id)[0].name)
  let friendsStepGoals = sortedFriends.map(friend => {
    const singleUser = users.filter(user => user.id === friend)
    return singleUser[0].dailyStepGoal
  })
  let friendsTotal = friendsStepGoals.reduce((total,friend) => {
    total+= friend
    return total;
  },0)
  for (var i = 0; i < user.friends.length; i++) {
    friendsWrapper.innerHTML += `<div class=user-friend> <canvas id="friendChart${i}" width="400" height="400"></canvas></div>`;
    let id = "friendChart" + i;
    let index = i;
    setTimeout(() => {createFriendChart(id, friendNames,friendsStepGoals, index);}, 100)
  }
  return friendsTotal / friendsStepGoals.length;
}



function updateUserCard(user) {
  userEmail.innerHTML = `<b>Email:</b> ${user.email}`
  userAddress.innerHTML = `<b>Address:</b> ${user.address}`
  userStrideLength.innerHTML = `<b>Stride Length:</b> ${user.strideLength}`
}

const updateUserMessage = (user) => {  
  let fullName = user.name.split(' ')
  let welcomeEmoji = ['🏅','👟','🎽']
  let randomEmoji = welcomeEmoji[Math.floor(Math.random() * 3)]
  welcomeMessage.innerText = `Welcome, ${fullName[0]}! ${randomEmoji}`;
  userInfo.innerText = `${user.name}`
};

export {
  fetchUserData
}
