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

function getConsumedWaterForWeek(data,userId) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => new Date(b.date) - new Date(a.date))
    return sortedSingleUserData.splice(0,7).map(user => user.numOunces)
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