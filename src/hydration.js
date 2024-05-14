import hydrationSampleData from "./data/sample-hydration-test-data";

function consumedWaterForWeek(userId) {
    return hydrationSampleData.hydrationSampleData.reduce((total,user) => {
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