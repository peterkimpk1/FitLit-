function getUserAverageHoursSlept(data, userId) {
   const userRoundedAverage = Math.round(data.reduce((total,sleep) => {
        if (sleep.userID === userId) {
            total += sleep.hoursSlept
        }
    },0) / (sleepData.filter(sleep => sleep.userID === userId).length))
    return userRoundedAverage
}

export {
    getUserAverageHoursSlept
}