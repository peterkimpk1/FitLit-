function getUserAverageHoursSlept(data, userId) {
   const totalHours = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.hoursSlept
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return Math.round(totalHours / dayCount)
}

function getUserAverageSleepQuality(data, userId) {
    const totalSleepQuality = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.sleepQuality
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return Math.round(totalSleepQuality / dayCount)
}

function getUserSleepQualityForGivenDay(data, userId, date) {
    const sleepQuality = data.find( sleepQuality => {})
}


function getHoursSleptForCurrentDay(data, userId) {
    const sleepDataForSpecificUser = data.filter(userData => {
        return userData.userID === userId    
    })
    sleepDataForSpecificUser.forEach(specificUserData => {
        specificUserData.date = new Date(specificUserData.date)
    })
    const sortedSleepDataForSpecificUser = sleepDataForSpecificUser.sort((dateA, dateB) => {
        return dateB.date - dateA.date
    })
    return sortedSleepDataForSpecificUser[0].hoursSlept
}

//Return how many hours a user slept each day over the course of a given week

function getSleepHoursAndQualityForWeek(data, userId, startingDate) {
    let singleUserData = data.filter(user => user.userID === userId)
    let startDateIndex = singleUserData.findIndex(user => user.userID === userId && user.date === startingDate)
    return singleUserData.splice(startDateIndex,startDateIndex + 6).map(user => ({
        hoursSlept: user.hoursSlept, sleepQuality: user.sleepQuality}))
}


export {
    getUserAverageHoursSlept,
    getUserAverageSleepQuality,
    getSleepHoursAndQualityForWeek,
    getHoursSleptForCurrentDay,
}