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
let sleepHoursChart;
let sleepQualityChart;
let sleepQualityDailyChart;
let sleepHoursDailyChart;
let sleepHoursAndQualityChart;
const welcomeMessage = document.querySelector('.welcome-message');
const userEmail = document.querySelector('.user-email');
const userAddress = document.querySelector('.user-address');
const userStrideLength = document.querySelector('.user-stride-length');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');
const OpenModalBtn = document.getElementById('openModalBtn');
const submitBtn = document.getElementById('submitBtn')
const form = document.getElementById('detailsModal');

const dateInput = document.getElementById('date')
const hoursSleptInput = document.getElementById('hours-slept');
const qualitySleptInput = document.getElementById('quality-of-sleep')
const hoursSleptErrorMessage = document.querySelector('.hours-slept-error-message')
const qualitySleptErrorMessage = document.querySelector('.sleep-quality-error-message')
const dateErrorMessage = document.getElementById('date-error-message')

window.addEventListener('load', () => {
  fetchUserData()
})

OpenModalBtn.addEventListener('click', function(){
  form.style.display = 'block';
})

submitBtn.addEventListener('click', function(){
  form.style.display = 'none'
  postSleepData(userId,dateInput.value,hoursSleptInput.value,qualitySleptInput.value)
  updateCurrentSleepData()
})

hoursSleptInput.addEventListener('input', validateInputs)
qualitySleptInput.addEventListener('input', validateInputs)
dateInput.addEventListener('input', validateInputs)

function validateInputs() {
  if (validateHoursSleptInput() && validateSleepQualityInput() && validateDateInput()) {
    submitBtn.removeAttribute('disabled')
  }
}

function validateDateInput() {
  const date = dateInput.value;
  let newDate = new Date(date)
  if ((newDate.getMonth() + 1 <= 12 && newDate.getMonth() + 1 >=1) && (newDate.getDate() <=31 && newDate.getDate() >= 1) &&
 (newDate.getFullYear() <= 2024 && newDate.getFullYear() >= 1900)) {
    return true;
  }
  else if (newDate.getFullYear() > 2024) {
    dateErrorMessage.classList.remove('hidden')
    return false;
  }
}

function validateHoursSleptInput() {
  const hours = hoursSleptInput.value
  if((hours >= 0 && hours <= 24) && hours) {
    hoursSleptErrorMessage.classList.add('hidden'); 
    return true;
  } else if (hours > 24) {
    hoursSleptErrorMessage.classList.remove('hidden'); 
    return false;
  }
}

function validateSleepQualityInput() {
  const quality = qualitySleptInput.value
  if(quality >= 0 && quality <= 5 && quality) {
    qualitySleptErrorMessage.classList.add('hidden')
    return true; 
  
  } else if (quality > 5) {
    qualitySleptErrorMessage.classList.remove('hidden')
    return false; 
  }
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
  sleepHoursChart = createSleepHoursAverageChart(sleepHoursAverageData)
  sleepQualityChart = createSleepQualityAverageChart(sleepQualityAverageData)
  sleepQualityDailyChart = createSleepQualityDailyChart(sleepQualityWeekData,sleepHoursWeekDataConverted)
  sleepHoursDailyChart = createSleepHoursDailyChart(sleepHoursDayData,sleepHoursWeekDataConverted)
  sleepHoursAndQualityChart = createSleepHoursAndQualityWeekChart(sleepHoursWeekData,sleepQualityWeekData,sleepHoursWeekDataConverted)
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

function updateCurrentSleepData() {
  setTimeout(() => Promise.all([fetchData('sleep')]).then(e => {
    const allSleepData = e[0].sleepData
    const sleepWeekDateData = getSleepDates(allSleepData,userId)
    const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,userId)
    const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
    const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, userId)
    const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, userId)
    const sleepHoursAverageData = getUserAverageHoursSlept(allSleepData, userId)
    const sleepQualityAverageData = getUserAverageSleepQuality(allSleepData, userId)
    console.log(allSleepData)
    sleepHoursChart.config.data.labels = [`Average Hours Slept: ${sleepHoursAverageData} hours`]
    sleepHoursChart.config.data.datasets.data = [+sleepHoursAverageData, 10/[+sleepHoursAverageData]]
    sleepQualityChart.config.data.labels = [`Average Sleep Quality: ${sleepQualityAverageData}/5`]
    sleepHoursChart.config.data.datasets.data = [+sleepQualityAverageData, 5/[+sleepQualityAverageData]]
    
    sleepQualityDailyChart.config.data.labels = [`Day: ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}, Sleep Quality: ${sleepQualityWeekData[0]}/5`]
    sleepQualityDailyChart.config.data.datasets.data = [+sleepQualityWeekData, 5/[+sleepQualityWeekData]]
    
    sleepHoursDailyChart.config.data.labels = [`Day: ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}, Hours Slept: ${sleepHoursDayData} hours`]
    sleepHoursDailyChart.config.data.datasets.data = [sleepHoursDayData, 10/sleepHoursDayData],

    sleepHoursAndQualityChart.config.data.labels = sleepHoursWeekDataConverted.map(date => `${date.getMonth() + 1}/${date.getDate()}`)
    sleepHoursAndQualityChart.config.data.datasets = [{
      data: sleepHoursWeekData.map(hours => hours),
      backgroundColor: 'rgba(213, 184, 255)'
    },
    {
      data: sleepQualityWeekData.map(quality => quality),
      backgroundColor: 'rgb(147,112,219)', 
    }
  ]
    sleepHoursChart.update()
    sleepQualityChart.update()
    sleepQualityDailyChart.update()
    sleepHoursDailyChart.update()
    sleepHoursAndQualityChart.update()
  }),3000)
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
