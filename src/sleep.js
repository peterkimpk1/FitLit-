function getUserAverageHoursSlept(data, userId) {
   const totalHours = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.hoursSlept
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return (totalHours / dayCount).toFixed(2)
}

function getUserAverageSleepQuality(data, userId) {
    const totalSleepQuality = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.sleepQuality
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return (totalSleepQuality / dayCount).toFixed(2)
}

function getHoursSleptForCurrentDay(data, userId) {
    const sleepDataForSpecificUser = data.filter(userData => {
        return userData.userID === userId;
    });
    if (sleepDataForSpecificUser.length === 0) {
        return {
            error: true,
            message: 'No data found for the current day',
        };
    }
    sleepDataForSpecificUser.forEach(specificUserData => {
        specificUserData.date = new Date(specificUserData.date);
    });
    const sortedSleepDataForSpecificUser = sleepDataForSpecificUser.sort((dateA, dateB) => {
        return dateB.date - dateA.date;
    });
    return sortedSleepDataForSpecificUser[0].hoursSlept;
}

function getSleepHoursAndQualityForAnyWeek(data, userId, startingDate) {
    let singleUserData = data.filter(user => user.userID === userId)
    let startDateIndex = singleUserData.findIndex(user => user.userID === userId && user.date === startingDate)
    return singleUserData.splice(startDateIndex,startDateIndex + 6).map(user => ({
        hoursSlept: user.hoursSlept, sleepQuality: user.sleepQuality}))
    }
    
function getUserSleepQualityForGivenDay(data, userId, date) {
    const givenDay = data.find( userData => {
        return userData.userID === userId && userData.date === date
    })
    return givenDay.sleepQuality
}

function getSleepQualityForWeek(data,userId) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => new Date(b.date) - new Date(a.date))
    return sortedSingleUserData.splice(0,7).map(user => user.sleepQuality)
}

function getSleepHoursForWeek(data,userId) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => new Date(b.date) - new Date(a.date))
    return sortedSingleUserData.splice(0,7).map(user => user.hoursSlept)
}

function getSleepDates(data, userId) {
    const userEntries = data.filter(user => user.userID === userId);
    if (userEntries.length === 0) {
        return null; 
    }
    let sortedUserEntries = userEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedUserEntries.splice(0, 7).map(user => user.date);
}


function getSleepDatesForAllTime(data, userId) {
    return data.filter(user => user.userID === userId).sort((a,b) => new Date(b.date) - new Date(a.date)).map(user => ({month: user.date.getMonth() + 1, date: user.date.getDate()}))
}

export {
    getUserAverageHoursSlept,
    getUserAverageSleepQuality,
    getSleepHoursAndQualityForAnyWeek,
    getHoursSleptForCurrentDay,
    getSleepHoursForWeek,
    getSleepQualityForWeek,
    getSleepDates,
    getUserSleepQualityForGivenDay,
    getSleepDatesForAllTime
}