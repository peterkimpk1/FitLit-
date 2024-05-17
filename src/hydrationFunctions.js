function getConsumedWaterForDay(data,userId,date) {
    let totalOunces = 0
    const userDataByUserIdAndDate = data.filter(userData => {
        return userData.userID === userId && userData.date === date   
    })
    userDataByUserIdAndDate.forEach(entry => {
        totalOunces += entry.numOunces
    })
    return totalOunces
}

function getCurrentDayWaterConsumption(data,userId) {
    const waterConsumedBySpecificUser = data.filter(userData => {
        return userData.userID === userId
    })
    waterConsumedBySpecificUser.forEach(specificUserData => {
        specificUserData.date = new Date(specificUserData.date)
    })
    const sortedWaterConsumedBySpecificUser = waterConsumedBySpecificUser.sort((dateA, dateB) => {
        return dateB.date - dateA.date
    })
    return sortedWaterConsumedBySpecificUser[0].numOunces
}

function getConsumedWaterForWeek(data,userId, startingDate) {
    let singleUserData = data.filter(user => user.userID === userId)
    let startDateIndex = singleUserData.findIndex(user => user.userID === userId && user.date === startingDate)
    return singleUserData.splice(startDateIndex,startDateIndex + 7).map(user => user.numOunces)
}

function updatedUserHydration(hydration, user){
    const userHydrationData = hydration.filter(hydrate => hydrate.userID === user);

    if (userHydrationData.length === 0) {
        return;
    }

    const totalFluidOunces = userHydrationData.reduce((total, hydrate) => total + hydrate.numOunces, 0);
    const averageFluidOuncesPerDay = totalFluidOunces / userHydrationData.length;

    return averageFluidOuncesPerDay;
}

export {
    getConsumedWaterForWeek, 
    getConsumedWaterForDay, 
    updatedUserHydration,
    getCurrentDayWaterConsumption
}