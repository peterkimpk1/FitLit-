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
    // consumedWaterForDay, 
    // averageWaterConsumedPerDay
}