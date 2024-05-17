function getConsumedWaterForDay(data,userId,date) {
    let totalOunces = 0
    const userDataByUserIdAndDate = data.filter(userData => {
        return userData.userID === userId && userData.date === date   
    })
    userDataByUserIdAndDate.forEach(entry => {
        totalOunces += entry.numOunces
    })
    // console.log("totalOunces:", totalOunces)
    return totalOunces
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
}