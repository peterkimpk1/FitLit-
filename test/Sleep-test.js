import { expect } from 'chai';
import sleepData from "../src/data/sample-sleep-test-data.js"
const sampleData = sleepData.sleepData
const {getUserAverageHoursSlept, getUserAverageSleepQuality, getSleepHoursAndQualityForAnyWeek, getHoursSleptForCurrentDay, getSleepQualityForWeek, getSleepHoursForWeek, getUserSleepQualityForGivenDay} = require('../src/sleep')

describe ('getUserAverageHoursSlept', () => {
    it ('should return a user/s average hours slept for all time', () => {
        const userId = 1;
        const e = getUserAverageHoursSlept(sampleData,userId);
        expect(e).to.equal('7.09')
    })
})

describe ('getUserAverageSleepQuality', () => {
    it ('should return a user/s average sleep quality for all time', () => {
        const userId = 1;
        const e = getUserAverageSleepQuality(sampleData, userId);
        expect(e).to.equal('3.51')
    })
})

describe ('getSleepHoursAndQualityForWeek', () => {
    it ('should return a user/s hours slept and sleep quality for a given week starting from the date', () => {
        const userId = 1;
        const date = '2023/03/25'
        const e = getSleepHoursAndQualityForAnyWeek(sampleData, userId, date)
        expect(e).to.deep.equal([
            {hoursSlept: 6.3, sleepQuality: 3.3},
            {hoursSlept: 8.5, sleepQuality: 3.6},
            {hoursSlept: 4.3, sleepQuality: 3.2},
            {hoursSlept: 5.5, sleepQuality: 2.2},
            {hoursSlept: 10.5, sleepQuality: 4.3},
            {hoursSlept: 6.5, sleepQuality: 2.4},
            {hoursSlept: 8.2, sleepQuality: 4.2}
          ])
    })
    
})

describe ('getSleepQualityForWeek', () => {
    it ('should return a user/s latest week/s sleep quality from the available data', () => {
        const userId2 = 2;
        const userId3 = 3;
        const user2 = getSleepQualityForWeek(sampleData, userId2);
        const user3 = getSleepQualityForWeek(sampleData, userId3);
        expect(user2).to.deep.equal([4.4, 3.9, 1.7, 1.6, 3.5, 2.6, 4.7])
        expect(user3).to.deep.equal([3.1, 1.8, 4.9, 4.7, 1.3, 3.4, 4.7])
    })
})

describe ('getSleepHoursForWeek', () => {
    it ('should return a user/s latest week/s hours slept from the availble data', () => {
        const userId1 = 1;
        const userId3 = 3;
        const user1 = getSleepHoursForWeek(sampleData, userId1);
        const user3 = getSleepHoursForWeek(sampleData, userId3);
        expect(user1).to.deep.equal([4.4, 8.2, 6.5, 10.5, 5.5, 4.3, 8.5])
        expect(user3).to.deep.equal([9.2, 10.8, 7.5, 7.4, 4.3, 9.9, 10.9])
    })
})
describe ('getHoursSleptForCurrentDay', () => {
    it ('should return how many hours a user slept for the current day', () => {
        const userId1 = 1;
        const userId2 = 2;
        const user1HoursSleptCurrentDay = getHoursSleptForCurrentDay(sampleData, userId1)
        const user2HoursSleptCurrentDay = getHoursSleptForCurrentDay(sampleData, userId2)
        expect(user1HoursSleptCurrentDay).to.equal(4.4)
        expect(user2HoursSleptCurrentDay).to.equal(6.2)
    })
    it('should return an error if no data exists for the current day', () => {
        const userId = 4; 
        const result = getHoursSleptForCurrentDay(sampleData, userId);
        expect(result).to.have.property('error', true);
        expect(result.message).to.equal('No data found for the current day');
    });
})

describe ('getUserSleepQualityForGivenDay', () => {
    it ('should return the quality of sleep for a given day', () => {
        const userId = 3;
        const givenDay = '2023/03/27';
        const givenDaySleepQuality = getUserSleepQualityForGivenDay(sampleData, userId, givenDay)
        expect(givenDaySleepQuality).to.equal(3.4)
    })
})
