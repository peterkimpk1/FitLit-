function getConsumedWaterForDay(data,userId,date) {
    console.log("data:", data)
    console.log("userId:", userId)
    console.log("date:", date)
    const userDataByUserId = data.filter(userData => {
        return userData.userID === userId && userData.date === date
        
    })
    console.log(userDataByUserId)
    return userDataByUserId
}

function consumedWaterForWeek(data,userId) {
    return data.reduce((total,user) => {
        if (user.userID === userId) {
            total += user.numOunces
        }
        return total;
    },0)
}

export {
    consumedWaterForWeek, 
    getConsumedWaterForDay, 
    // averageWaterConsumedPerDay
}