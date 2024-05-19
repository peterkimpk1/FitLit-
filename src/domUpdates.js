import { fetchUser } from './fetchData/userData.js'
import { fetchHydration } from './fetchData/hydrationData.js'
import { fetchSleep } from './fetchData/sleepData.js'
import { getRandomUser, getUserData, getAverageStepGoalAllUsers } from '../src/userFunctions.js'
import { getCurrentDayWaterConsumption, getConsumedWaterForWeek, getConsumedWaterDates } from '../src/hydration.js';
import { getHoursSleptForCurrentDay, getSleepHoursForWeek, getSleepDates, getSleepQualityForWeek, getUserAverageHoursSlept, getUserAverageSleepQuality } from './sleep.js';
import Chart from 'chart.js/auto';

const welcomeMessage = document.querySelector('.welcome-message');
const userStepGoalDisplay = document.getElementById('display-step-goal');
const averageStepDisplay = document.getElementById('display-average-goal-steps');
const userIdAddressEmail = document.querySelector('.user-id-address-email');
const userStrideLength = document.querySelector('.user-stride-length');
const userDailyHydration = document.getElementById('display-user-hydration-day');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');
const userWeeklySleepHours = document.getElementById('display-user-sleep-week');
const sleepDay = document.querySelector('.user-sleep-day');
const allTimeSleep = document.querySelector('.user-sleep-alltime');


window.addEventListener('load', () => {
  fetchUserData()
})

const updateUserGoal = (user) => {
  userStepGoalDisplay.innerText = `${user.dailyStepGoal} 👟`
}

const updateAverageSteps = (steps) => {
  averageStepDisplay.innerText = `${steps}`
}

const updateUserDailyHydration = (data,userId) => {
  userDailyHydration.innerText = `${getCurrentDayWaterConsumption(data,userId)} ounces 🥤`
}

const updateWeeklySleepData = (data,userId) => {
  userWeeklySleepHours.innerText = `${getSleepHoursForWeek(data,userId)}`
}

function fetchUserData() {
  Promise.all([fetchUser(), fetchHydration(), fetchSleep()]).then(e => {
    const userList = e[0].users
    const randomUser = getRandomUser(userList)
    const user = getUserData(userList, randomUser.id)
    updateUserCard(user)
    const friendsSteps = updatedUserFriends(user, userList)
    updateUserMessage(randomUser);
    const AllHydrationData = e[1].hydrationData;
    updateUserDailyHydration(AllHydrationData,randomUser.id)
    const hydrationWeekWaterData = getConsumedWaterForWeek(AllHydrationData,randomUser.id)
    const hydrationWeekDateData = getConsumedWaterDates(AllHydrationData,randomUser.id)
    const hydrationDayData = getCurrentDayWaterConsumption(AllHydrationData,randomUser.id)
    const allSleepData = e[2].sleepData
    const sleepWeekDateData = getSleepDates(allSleepData,randomUser.id)
    const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,randomUser.id)
    const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
    const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, randomUser.id)
    // updateDailySleep(allSleepData, randomUser.id)
    updateWeeklySleepData(allSleepData, randomUser.id)
    const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, randomUser.id)
    getUserAverageHoursSlept(allSleepData, randomUser.id)
    getUserAverageSleepQuality(allSleepData, randomUser.id)
    updateAllTimeSleep(allSleepData, randomUser.id)
    getSleepDates(allSleepData, randomUser.id)
    new Chart(document.getElementById('sleepQualityDailyChart'), {
      type: 'doughnut',
      data: {
        labels: [`Day: ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}, Sleep Quality: ${sleepQualityWeekData[0]}/5`],
        datasets: [{
          label: 'Sleep Quality',
          data: [sleepQualityWeekData[0], 2],
          backgroundColor: [
            'rgba(213, 184, 255)',
            'rgba(0, 0, 0, 0.2)'
          ],
         borderColor: [
            'rgba(213, 184, 255)',
            'rgba(0, 0, 0, 0.2)'
          ]
        }]
      },
      options: {
        cutout: '80%',
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0;
            }
          }
        }
      }     
    });
    new Chart(document.getElementById('sleepHoursDailyChart'), {
      type: 'doughnut',
      data: {
        labels: [`Day: ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}, Hours Slept: ${sleepHoursDayData} hours`],
        datasets: [{
          label: 'Hours Slept',
          data: [sleepHoursDayData, 3],
          backgroundColor: [
            'rgba(213, 184, 255)',
            'rgba(0, 0, 0, 0.2)'
          ],
         borderColor: [
            'rgba(213, 184, 255)',
            'rgba(0, 0, 0, 0.2)'
          ]
        }]
      },
      options: {
        cutout: '80%',
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0;
            }
          }
        }
      }     
    });
    new Chart(document.getElementById('sleepHoursWeekChart'), {
      type: 'bar',
      data: {
        labels: sleepHoursWeekDataConverted.map(date => `${date.getMonth() + 1}/${date.getDate()}`),
        datasets: [{
          data: sleepHoursWeekData.map(hours => hours),
          backgroundColor: 'rgba(213, 184, 255)'
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Hours Slept'
            }
          },
          x: {
            display: true,
            title: {
              display: true,
              text: `Week: ${sleepHoursWeekDataConverted[0].getMonth() + 1}/${sleepHoursWeekDataConverted[0].getDate()} - ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}`
            }
          },
        }
      }
    });
    new Chart(document.getElementById('user-step-goal-chart'), {
      type: 'doughnut',
      data: {
        labels: [`Daily Step Goal: ${user.dailyStepGoal}`],
        datasets: [{
          label: 'Step Goal',
          data: [`${user.dailyStepGoal}`,3000],
          backgroundColor: [
            'rgba(166,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(166,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ]
        }]
      },
      options: {
        circumference: 180,
        rotation: 270,
        aspectRatio: 1.5,
        cutout: '80%',
        plugins: {
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0;
            }
          },
        }
      },
    });
    new Chart(document.getElementById('user-friends-average-goal-chart'), {
      type: 'doughnut',
      data: {
        labels: [`Average Friend's Step Goal: ${Math.round(friendsSteps)}`],
        datasets: [{
          label: 'Step Goal',
          data: [`${Math.round(friendsSteps)}`,3000],
          backgroundColor: [
            'rgba(166,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(166,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ]
        }]
      },
      options: {
        circumference: 180,
        rotation: 270,
        aspectRatio: 1.5,
        cutout: '80%',
        plugins: {
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0;
            }
          },
        }
      },
    });
    new Chart(document.getElementById('hydrationWeekChart'), {
      type: 'bar',
      data: {
        labels: hydrationWeekDateData.reverse().map(date => `${date.getMonth() + 1}/${date.getDate()}`),
        datasets: [{
          data: hydrationWeekWaterData.map(ounces => ounces),
          backgroundColor: 'rgba(39, 76, 245, 0.8)'
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Fluid Ounces'
            }
          },
          x: {
            display: true,
            title: {
              display: true,
              text: `Week: ${hydrationWeekDateData[0].getMonth() + 1}/${hydrationWeekDateData[0].getDate()} - ${hydrationWeekDateData[6].getMonth() + 1}/${hydrationWeekDateData[6].getDate()}`
            }
          }
        }
      }
    });
    new Chart(document.getElementById('hydrationDayChart'), {
      type: 'doughnut',
      data: {
        labels: [`Day: ${hydrationWeekDateData[6].getMonth() + 1}/${hydrationWeekDateData[6].getDate()}, Water Consumption: ${hydrationDayData} fl oz`],
        datasets: [{
          label: 'Fluid Ounces',
          data: [hydrationDayData, 30],
          backgroundColor: [
            'rgba(39, 76, 245, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
         borderColor: [
            'rgba(39, 76, 245, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ]
        }]
      },
      options: {
        aspectRatio: 2,
        cutout: '80%',
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            filter: (tooltipItem) => {
              return tooltipItem.dataIndex === 0;
            }
          }
        }
      }     
    });
  })
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

function createFriendChart(id, friendIds, friendSteps, i) {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: {
      labels: [`${friendIds[i]}`],
      datasets: [{
        label: 'Step Goal',
        data: [`${friendSteps[i]}`,3000],
        backgroundColor: [
          'rgba(166,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(166,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ]
      }]
    },
    options: {
      circumference: 180,
      rotation: 270,
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          filter: (tooltipItem) => {
            return tooltipItem.dataIndex === 0;
          }
        },
      }
    },
  })

}

function updateUserCard(user) {
  userIdAddressEmail.innerHTML= `<strong>ID:</strong> ${user.id} <strong>Address:</strong> ${user.address} <strong>Email:</strong> ${user.email}`
  userStrideLength.innerHTML = `<strong>Stride Length:</strong> ${user.strideLength}`
}

const updateUserMessage = (user) => {  
  let fullName = user.name.split(' ')
  let welcomeEmoji = ['🏅','👟','🎽']
  let randomEmoji = welcomeEmoji[Math.floor(Math.random() * 3)]
  welcomeMessage.innerHTML = `<header>
  <h1 class="welcome-message">Welcome, ${fullName[0]}! ${randomEmoji}</h1>
  </header>`;
  userInfo.innerText = `${user.name}'s Info`
};

const updateDailySleep = (user, userId) => {
  const latestDate = getSleepDates(user, userId).map(date => new Date(date))[0]
  sleepDay.innerHTML = `Day:${latestDate.getMonth() + 1}/${latestDate.getDate()}<p id="display-user-day"></p>
  <div class="hours-slept">Hours Slept: ${getHoursSleptForCurrentDay(user, userId)}<p id="display-user-sleep-day"></p></div>
  <div class="quality-of-sleep">Quality Slept: ${getSleepQualityForWeek(user, userId)[0]}/5<p id="display-user-sleep-quality"></p></div>
</div>`
}

const updateAllTimeSleep = (user, userId) => {
  const recentDate = getSleepDates(user, userId).map(date => new Date(date))[0]
  allTimeSleep.innerHTML = `All Time: ${recentDate.getMonth() + 1}/${recentDate.getDate()}<p class="users-sleep-alltime"></p>
  <div class="hours-slept-alltime">Hours Slept: ${getUserAverageHoursSlept(user, userId)} <p id="sleep-day-hours-alltime"></p></div>
  <div class="quality-of-sleep-alltime">Quality Slept: ${getUserAverageSleepQuality(user, userId)}/5 <p id="sleep-quality-alltime"></p></div>
</div>`
}

export {
  updateUserGoal,
  updateAverageSteps,
  updateUserMessage,
  // updateUserDailyHydration, 
  updateDailySleep,
  updateAllTimeSleep
};

