function getConsumedWaterForDay(data,userId,date) {
    console.log("data:", data)
    console.log("userId:", userId)
    console.log("date:", date)
    if(data.user.userID === userId && user.date === date) {
        console.log("hello")
    }
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