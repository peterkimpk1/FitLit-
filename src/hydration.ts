interface Data {
    userID: number,
    date: string | Date,
    numOunces: number
}

function getConsumedWaterForSpecificDate(data:Data[], userId: number, date:string) {
    const userDataByUserIdAndDate = data.filter(userData => userData.userID === userId && userData.date === date)
    if(userDataByUserIdAndDate.length === 0){
        return undefined;
    }
    let totalOunces = 0
    userDataByUserIdAndDate.forEach(entry => {
        totalOunces += entry.numOunces
    })
    return totalOunces
}

function getCurrentDayWaterConsumption(data:Data[], userId: number) {
    const hydrationDataForSpecificUser = data.filter(userData => {
        return userData.userID === userId
    })
    hydrationDataForSpecificUser.forEach(specificUserData => {
        specificUserData.date = new Date(specificUserData.date)
    })
    const sortedhydrationDataForSpecificUser = hydrationDataForSpecificUser.sort((dateA, dateB) => {
        if (dateB.date > dateA.date) {
            return 1; 
        }
        if (dateB.date < dateA.date) {
            return -1;
        }
        return 0;      
    })
    return sortedhydrationDataForSpecificUser[0].numOunces
}

function getConsumedWaterForWeek(data:Data[], userId: number) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => {
       if (new Date(b.date) > new Date(a.date)) {
            return 1;
       }
       if (new Date(b.date) > new Date(a.date)) {
            return -1; 
       }
       return 0
    })
    return sortedSingleUserData.splice(0,7).map(user => user.numOunces)
}

function getConsumedWaterDates(data:Data[], userId: number) {
    let sortedSingleUserData = data.filter(user => user.userID === userId).sort((a,b) => {
        if (new Date(b.date) > new Date(a.date)) {
            return 1; 
        }
        if (new Date(b.date) < new Date(a.date)) {
            return -1;
        }
        return 0
    })
    return sortedSingleUserData.splice(0,7).map(user => user.date)
}

function updatedUserHydration(hydration, user){
    const userHydrationData = hydration.filter(hydrate => hydrate.userID === user);

    if (userHydrationData.length === 0) {
        return;
    }

    const totalFluidOunces = userHydrationData.reduce((total:number, hydrate) => total + hydrate.numOunces, 0);
    const averageFluidOuncesPerDay = totalFluidOunces / userHydrationData.length;

    return averageFluidOuncesPerDay;
}

export {
    getConsumedWaterForWeek, 
    getConsumedWaterForSpecificDate, 
    updatedUserHydration,
    getCurrentDayWaterConsumption,
    getConsumedWaterDates
}