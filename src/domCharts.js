import Chart from 'chart.js/auto';

function createSleepHoursAverageChart(data) {
    const chart = new Chart(document.getElementById('sleepHoursAverageChart'), {
        type: 'doughnut',
        data: {
          labels: [`Average Hours Slept: ${data} hours`],
          datasets: [{
            label: 'Sleep Hours',
            data: [+data, 10/[+data]],
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
            },
          }
        }     
      });
      return chart;
}

function createSleepQualityAverageChart(data) {
    const chart = new Chart(document.getElementById('sleepQualityAverageChart'), {
        type: 'doughnut',
        data: {
          labels: [`Average Sleep Quality: ${data}/5`],
          datasets: [{
            label: 'Sleep Quality',
            data: [+data, 5/[+data]],
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
          },
          }
        }     
      });
      return chart;
}
function createSleepQualityDailyChart(data, dates) {
    const chart = new Chart(document.getElementById('sleepQualityDailyChart'), {
        type: 'doughnut',
        data: {
          labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Sleep Quality: ${data[0]}/5`],
          datasets: [{
            label: 'Sleep Quality',
            data: [data[0], 5/data[0]],
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
            },
          }
        }     
      });
      return chart;
}
function createSleepHoursDailyChart(data, dates) {
    const chart = new Chart(document.getElementById('sleepHoursDailyChart'), {
        type: 'doughnut',
        data: {
          labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Hours Slept: ${data} hours`],
          datasets: [{
            label: 'Hours Slept',
            data: [data, 10/data],
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
          },
          }
        }     
      });
      return chart;
}
function createSleepHoursAndQualityWeekChart(hoursData, qualityData, dates) {
    const chart = new Chart(document.getElementById('sleepHoursandQualityWeekChart'), {
        type: 'bar',
        data: {
          labels: dates.map(date => `${date.getMonth() + 1}/${date.getDate()}`),
          datasets: [{
            data: hoursData.map(hours => hours),
            backgroundColor: 'rgba(213, 184, 255)'
          },
          {
            data: qualityData.map(quality => quality),
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
                text: `Week: ${dates[0].getMonth() + 1}/${dates[0].getDate()} - ${dates[6].getMonth() + 1}/${dates[6].getDate()}`
              }
            },
          }
        }
      });
      return chart;
}   

function createStepCharts(user, friendsSteps) {
    new Chart(document.getElementById('user-step-goal-chart'), {
        type: 'doughnut',
        data: {
          labels: [`Daily Step Goal: ${user.dailyStepGoal}`],
          datasets: [{
            label: 'Step Goal',
            data: [`${user.dailyStepGoal}`,10000* (3000/`${user.dailyStepGoal}`)],
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
            data: [`${Math.round(friendsSteps)}`,10000* (3000/`${Math.round(friendsSteps)}`)],
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
}

function createHydrationWeekChart(data, dates) {
    new Chart(document.getElementById('hydrationWeekChart'), {
        type: 'bar',
        data: {
          labels: dates.reverse().map(date => `${date.getMonth() + 1}/${date.getDate()}`),
          datasets: [{
            data: data.map(ounces => ounces),
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
                text: `Week: ${dates[0].getMonth() + 1}/${dates[0].getDate()} - ${dates[6].getMonth() + 1}/${dates[6].getDate()}`
              }
            }
          }
        }
      });
}
function createHydrationDayChart(data,dates) {
    new Chart(document.getElementById('hydrationDayChart'), {
        type: 'doughnut',
        data: {
          labels: [`Day: ${dates[6].getMonth() + 1}/${dates[6].getDate()}, Water Consumption: ${data} fl oz`],
          datasets: [{
            label: 'Fluid Ounces',
            data: [data, 100* (20/data)],
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
}
     
  
  

function createFriendChart(id, friendIds, friendSteps, i) {
    new Chart(document.getElementById(id), {
      type: 'doughnut',
      data: {
        labels: [`${friendIds[i]}`],
        datasets: [{
          label: 'Step Goal',
          data: [`${friendSteps[i]}`,10000* (3000/`${friendSteps[i]}`)],
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

export {
    createFriendChart,
    createSleepHoursAverageChart,
    createSleepQualityAverageChart,
    createSleepQualityDailyChart,
    createSleepHoursDailyChart,
    createSleepHoursAndQualityWeekChart,
    createStepCharts,
    createHydrationWeekChart,
    createHydrationDayChart
}