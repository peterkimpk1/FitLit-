import { fetchData } from './apiCalls'
import { createFriendChart, createSleepHoursAverageChart,
  createSleepQualityAverageChart,
  createSleepQualityDailyChart,
  createSleepHoursDailyChart,
  createSleepHoursAndQualityWeekChart,
  createStepCharts,
  createHydrationWeekChart,
  createHydrationDayChart } from './domCharts'
import { getRandomUser, getUserData} from './userFunctions'
import { getCurrentDayWaterConsumption, getConsumedWaterForWeek, getConsumedWaterDates } from './hydration';
import { getHoursSleptForCurrentDay, getSleepHoursForWeek, getSleepDates, getSleepQualityForWeek, getUserAverageHoursSlept, getUserAverageSleepQuality } from './sleep';
import { Chart} from 'chart.js'
let userId = 0;
let sleepHoursChart: Chart<"doughnut", number[], string>;
let sleepQualityChart: Chart<"doughnut", number[], string>;
let sleepQualityDailyChart: Chart<"doughnut", number[], string>;
let sleepHoursDailyChart: Chart<"doughnut", number[], string>;
let sleepHoursAndQualityChart: Chart;
interface UserData {
  id: number, name: string, address: string, email: string, strideLength: number, dailyStepGoal: number, friends: number[]
}

interface HydrationData {
  userID: number, date: string, numOunces: number
}

interface SleepData {
  userID: number, date: string, hoursSlept: number, sleepQuality: number
}

const welcomeMessage = document.querySelector('.welcome-message');
const userEmail = document.querySelector('.user-email');
const userAddress = document.querySelector('.user-address');
const userStrideLength = document.querySelector('.user-stride-length');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');
const OpenModalBtn = document.getElementById('openModalBtn');
const submitBtn = <HTMLInputElement>document.getElementById("submitBtn")
const form = document.getElementById('detailsModal');

const dateInput = document.getElementById('date')
let dateInputValue: string
const hoursSleptInput = document.getElementById('hours-slept');
let hoursSleptInputValue: number
const qualitySleptInput = document.getElementById('quality-of-sleep')
let qualitySleptInputValue: number

const hoursSleptErrorMessage = document.querySelector('.hours-slept-error-message')
const qualitySleptErrorMessage = document.querySelector('.sleep-quality-error-message')
const dateErrorMessage = document.getElementById('date-error-message')
const formField = document.getElementById('sleep-input-form') as HTMLFormElement;



window.addEventListener('load', () => {
  fetchUserData()
})

OpenModalBtn.addEventListener('click', function(){
  form.style.display = 'block';
  OpenModalBtn.setAttribute("aria-expanded", 'true');
})

submitBtn.addEventListener('click', function(e){
  e.preventDefault();
  formField.reset()
  form.style.display = 'none'
  postSleepData(userId,dateInputValue,hoursSleptInputValue,qualitySleptInputValue)
  updateCurrentSleepData()
  submitBtn.setAttribute('disabled', '')
  submitBtn.style.backgroundColor = '';
})

hoursSleptInput.addEventListener('input', validateInputs)
qualitySleptInput.addEventListener('input', validateInputs)
dateInput.addEventListener('input', validateInputs)

function validateInputs() {
  validateHoursSleptInput()
  validateSleepQualityInput()
  validateDateInput()
  if (validateHoursSleptInput() && validateSleepQualityInput() && validateDateInput()) {
    submitBtn.disabled = false;
  }
  else if (!dateInputValue || !hoursSleptInputValue || !qualitySleptInputValue){
    submitBtn.disabled = true;
  }
}

function validateDateInput() {
  dateInputValue = (<HTMLInputElement>document.getElementById('date')).value
  const date = dateInputValue;
  let newDate = new Date(date)
  if ((newDate.getMonth() + 1 <= 12 && newDate.getMonth() + 1 >=1) && (newDate.getDate() <=31 && newDate.getDate() >= 1) &&
 (newDate.getFullYear() <= 2024 && newDate.getFullYear() >= 1900)) {
    dateErrorMessage.classList.add('hidden'); 
    return true;
  }
  else if (newDate.getFullYear() > 2024) {
    dateErrorMessage.classList.remove('hidden')
    return false;
  }
}



function validateHoursSleptInput() {
  hoursSleptInputValue = +(<HTMLInputElement>document.getElementById('hours-slept')).value
  const hours = hoursSleptInputValue;
  if(hours >= 0 && hours <= 24 && hours) {
    hoursSleptErrorMessage.classList.add('hidden'); 
    return true;
  } else {
    hoursSleptErrorMessage.classList.remove('hidden'); 
    return false;
  }
}

function validateSleepQualityInput() {
  qualitySleptInputValue = +(<HTMLInputElement>document.getElementById('quality-of-sleep')).value
  const quality = qualitySleptInputValue;
  if(quality >= 0 && quality <= 5 && quality) {
    qualitySleptErrorMessage.classList.add('hidden')
    return true; 
  } else {
    qualitySleptErrorMessage.classList.remove('hidden')
    return false; 
  }
}

function updateHydrationData(data: HydrationData[], id: number) {
  const AllHydrationData = data
  const hydrationWeekWaterData = getConsumedWaterForWeek(AllHydrationData,id)
  const hydrationWeekDateData = getConsumedWaterDates(AllHydrationData,id).map((data: string) => new Date(data))
  const hydrationDayData = getCurrentDayWaterConsumption(AllHydrationData,id)
  createHydrationWeekChart(hydrationWeekWaterData,hydrationWeekDateData)
  createHydrationDayChart(hydrationDayData,hydrationWeekDateData)
}

function updateSleepData(data: SleepData[], id: number) {
  const allSleepData = data
  const sleepWeekDateData = getSleepDates(allSleepData,id)
  const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,id)
  const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
  const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, id)
  const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, id)
  const sleepHoursAverageData = getUserAverageHoursSlept(allSleepData, id)
  const sleepQualityAverageData = getUserAverageSleepQuality(allSleepData, id)
  sleepHoursChart = createSleepHoursAverageChart(+sleepHoursAverageData)
  sleepQualityChart = createSleepQualityAverageChart(+sleepQualityAverageData)
  sleepQualityDailyChart = createSleepQualityDailyChart(sleepQualityWeekData,sleepHoursWeekDataConverted)
  sleepHoursDailyChart = createSleepHoursDailyChart(+sleepHoursDayData,sleepHoursWeekDataConverted)
  sleepHoursAndQualityChart = createSleepHoursAndQualityWeekChart(sleepHoursWeekData,sleepQualityWeekData,sleepHoursWeekDataConverted)
}

function updateUserData(data: UserData[], id: number) {
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
  }).catch(err => alert('Could not display user info!!'))
}

function postSleepData(id: number, date: string, hoursSlept: number, sleepQuality: number) {
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
  }).catch(err => err.message)
}

function updateCurrentSleepData() {
  setTimeout(() => fetchData('sleep').then(e => {
    const allSleepData = e.sleepData
    const sleepWeekDateData = getSleepDates(allSleepData,userId)
    const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,userId)
    const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
    const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, userId)
    const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, userId)
    const sleepHoursAverageData = getUserAverageHoursSlept(allSleepData, userId)
    const sleepQualityAverageData = getUserAverageSleepQuality(allSleepData, userId)
    sleepHoursChart.destroy()
    sleepQualityChart.destroy()
    sleepQualityDailyChart.destroy()
    sleepHoursDailyChart.destroy()
    sleepHoursAndQualityChart.destroy()
    sleepHoursChart = createSleepHoursAverageChart(+sleepHoursAverageData)
    sleepQualityChart = createSleepQualityAverageChart(+sleepQualityAverageData)
    sleepQualityDailyChart = createSleepQualityDailyChart(sleepQualityWeekData,sleepHoursWeekDataConverted)
    sleepHoursDailyChart = createSleepHoursDailyChart(+sleepHoursDayData,sleepHoursWeekDataConverted)
    sleepHoursAndQualityChart = createSleepHoursAndQualityWeekChart(sleepHoursWeekData,sleepQualityWeekData,sleepHoursWeekDataConverted)
  }),3000)
}

function updatedUserFriends(user: UserData, users: UserData[]) {
  let sortedFriends = user.friends.sort((a,b)=> {
    if (a >b) {
      return 1;
    }
    if (b > a) {
      return -1
    }
    return 0
})
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

function updateUserCard(user: UserData) {
  userEmail.innerHTML = `<b>Email:</b> ${user.email}`
  userAddress.innerHTML = `<b>Address:</b> ${user.address}`
  userStrideLength.innerHTML = `<b>Stride Length:</b> ${user.strideLength}`
}

const updateUserMessage = (user: UserData) => {  
  let fullName = user.name.split(' ')
  let welcomeEmoji = ['🏅','👟','🎽']
  let randomEmoji = welcomeEmoji[Math.floor(Math.random() * 3)]
  welcomeMessage.innerHTML = `Welcome, ${fullName[0]}! ${randomEmoji}`;
  userInfo.innerHTML = `${user.name}`
};

export {
  fetchUserData
}
