function getConsumedWaterForDay(data,userId,date) {
    let totalOunces = 0
    const userDataByUserIdAndDate = data.filter(userData => {
        return userData.userID === userId && userData.date === date   
    })
    userDataByUserIdAndDate.forEach(entry => {
        totalOunces += entry.numOunces
    })
    console.log("totalOunces:", totalOunces)
    return totalOunces
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