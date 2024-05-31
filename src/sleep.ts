interface Data {
    userID: number, date: string | Date, hoursSlept: number, sleepQuality: number
}

function getUserAverageHoursSlept(data: Data[], userId: number) {
   const totalHours = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.hoursSlept
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return (totalHours / dayCount).toFixed(2)
}

function getUserAverageSleepQuality(data: Data[], userId: number) {
    const totalSleepQuality = data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.sleepQuality
        }
        return total;
    },0)
    const dayCount = data.filter(sleep => sleep.userID === userId).length
    return (totalSleepQuality / dayCount).toFixed(2)
}

function getHoursSleptForCurrentDay(data: Data[], userId: number) {
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
        if (dateB.date > dateA.date) {
            return 1;
        }
        if (dateB.date < dateA.date) {
            return -1;
        }
        return 0;
    });
    return sortedSleepDataForSpecificUser[0].hoursSlept;
}

function getSleepHoursAndQualityForAnyWeek(data: Data[], userId: number, startingDate: Date) {
    let singleUserData = data.filter(user => user.userID === userId)
    let startDateIndex = singleUserData.findIndex(user => user.userID === userId && user.date === startingDate)
    return singleUserData.splice(startDateIndex,startDateIndex + 6).map(user => ({
        hoursSlept: user.hoursSlept, sleepQuality: user.sleepQuality}))
    }
    
function getUserSleepQualityForGivenDay(data: Data[], userId: number, date: Date) {
    const givenDay = data.find( userData => {
        return userData.userID === userId && userData.date === date
    })
    return givenDay.sleepQuality
}

function getSleepQualityForWeek(data: Data[], userId: number) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => {
        if (new Date(b.date) > new Date(a.date)) {
            return 1;
        }
        if (new Date(b.date) < new Date(a.date)) {
            return -1;
        }
        return 0;
    })
    return sortedSingleUserData.splice(0,7).map(user => user.sleepQuality)
}

function getSleepHoursForWeek(data: Data[], userId: number) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => {
        if (new Date(b.date) > new Date(a.date)) {
            return 1;
        }
        if (new Date(b.date) < new Date(a.date)) {
            return -1;
        }
        return 0;
})
    return sortedSingleUserData.splice(0,7).map(user => user.hoursSlept)
}

function getSleepDates(data: Data[], userId: number) {
    const userEntries = data.filter(user => user.userID === userId);
    if (userEntries.length === 0) {
        return null; 
    }
    let sortedUserEntries = userEntries.sort((a, b) => {
        if (new Date(b.date) > new Date(a.date)) {
            return 1;
        }
        if (new Date(b.date) < new Date(a.date)) {
            return -1;
        }
        return 0;
    })
    return sortedUserEntries.splice(0, 7).map(user => user.date);
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
}