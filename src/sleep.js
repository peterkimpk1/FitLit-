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

export {
    getUserAverageHoursSlept,
    getUserAverageSleepQuality
}