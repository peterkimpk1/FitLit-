import { fetchUser } from './fetchData/userData.js'
import { fetchHydration } from './fetchData/hydrationData.js'
import { fetchSleep } from './fetchData/sleepData.js'
import { getRandomUser, getUserData} from '../src/userFunctions.js'
import { getCurrentDayWaterConsumption, getConsumedWaterForWeek, getConsumedWaterDates } from '../src/hydration.js';
import { getHoursSleptForCurrentDay, getSleepHoursForWeek, getSleepDates, getSleepQualityForWeek, getUserAverageHoursSlept, getUserAverageSleepQuality, getSleepDatesForAllTime} from './sleep.js';
import Chart from 'chart.js/auto';

const welcomeMessage = document.querySelector('.welcome-message');
const userId = document.querySelector('.user-id');
const userEmail = document.querySelector('.user-email');
const userAddress = document.querySelector('.user-address');
const userStrideLength = document.querySelector('.user-stride-length');
const friendsWrapper = document.querySelector('.friends-wrapper');
const userInfo = document.querySelector('.user-info');


window.addEventListener('load', () => {
  fetchUserData()
})

function fetchUserData() {
  Promise.all([fetchUser(), fetchHydration(), fetchSleep()]).then(e => {
    const userList = e[0].users
    const randomUser = getRandomUser(userList)
    const user = getUserData(userList, randomUser.id)
    updateUserCard(user)
    const friendsSteps = updatedUserFriends(user, userList)
    updateUserMessage(randomUser);
    const AllHydrationData = e[1].hydrationData;
    const hydrationWeekWaterData = getConsumedWaterForWeek(AllHydrationData,randomUser.id)
    const hydrationWeekDateData = getConsumedWaterDates(AllHydrationData,randomUser.id).map(data => new Date(data))
    const hydrationDayData = getCurrentDayWaterConsumption(AllHydrationData,randomUser.id)
    const allSleepData = e[2].sleepData
    const sleepWeekDateData = getSleepDates(allSleepData,randomUser.id)
    const sleepHoursWeekData = getSleepHoursForWeek(allSleepData,randomUser.id)
    const sleepHoursWeekDataConverted = sleepWeekDateData.reverse().map(data => new Date(data))
    const sleepHoursDayData = getHoursSleptForCurrentDay(allSleepData, randomUser.id)
    const sleepQualityWeekData = getSleepQualityForWeek(allSleepData, randomUser.id)
    const sleepHoursAverageData = getUserAverageHoursSlept(allSleepData, randomUser.id)
    const sleepQualityAverageData = getUserAverageSleepQuality(allSleepData, randomUser.id)
    new Chart(document.getElementById('sleepHoursAverageChart'), {
      type: 'doughnut',
      data: {
        labels: [`Average Hours Slept: ${sleepHoursAverageData} hours`],
        datasets: [{
          label: 'Sleep Quality',
          data: [+sleepHoursAverageData, 2],
          backgroundColor: [
            'rgba(213, 184, 255)',
            'rgba(180, 153, 180, 0.3)'
          ],
         borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
    new Chart(document.getElementById('sleepQualityAverageChart'), {
      type: 'doughnut',
      data: {
        labels: [`Average Sleep Quality: ${sleepQualityAverageData}/5`],
        datasets: [{
          label: 'Sleep Quality',
          data: [+sleepQualityAverageData, 2],
          backgroundColor: [
            'rgba(213, 184, 255)',
            'rgba(180, 153, 180, 0.3)'
          ],
         borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
    new Chart(document.getElementById('sleepQualityDailyChart'), {
      type: 'doughnut',
      data: {
        labels: [`Day: ${sleepHoursWeekDataConverted[6].getMonth() + 1}/${sleepHoursWeekDataConverted[6].getDate()}, Sleep Quality: ${sleepQualityWeekData[0]}/5`],
        datasets: [{
          label: 'Sleep Quality',
          data: [sleepQualityWeekData[0], 2],
          backgroundColor: [
            'rgba(213, 184, 255)',
            'rgba(180, 153, 180, 0.3)'
          ],
         borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
            'rgba(180, 153, 180, 0.3)'
          ],
         borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
    new Chart(document.getElementById('sleepHoursandQualityWeekChart'), {
      type: 'bar',
      data: {
        labels: sleepHoursWeekDataConverted.map(date => `${date.getMonth() + 1}/${date.getDate()}`),
        datasets: [{
          data: sleepHoursWeekData.map(hours => hours),
          backgroundColor: 'rgba(213, 184, 255)'
        },
        {
          data: sleepQualityWeekData.map(quality => quality),
          backgroundColor: 'rgb(147,112,219)', 
        }
      ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                  const datasetIndex = context.datasetIndex;
                  let label = '';
                if (datasetIndex === 0 && !label) {
                  label = context.dataset.label || 'Hours Slept';
                } else if (datasetIndex === 1 && !label) {
                  label = context.dataset.label || 'Sleep Quality';
                }
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y!== null) {
                  label += context.parsed.y;
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Hours Slept and Sleep Quality'
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
            'rgba(0,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
            'rgba(0,204,112, 0.8)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0)'
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
          'rgba(0,204,112, 0.8)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0)'
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

