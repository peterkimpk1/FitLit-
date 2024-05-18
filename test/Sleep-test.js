import { expect } from 'chai';
import sleepData from "../src/data/sample-sleep-test-data.js"
const sampleData = sleepData.sleepData
const {getUserAverageHoursSlept, getUserAverageSleepQuality, getSleepHoursAndQualityForWeek, getHoursSleptForCurrentDay} = require('../src/sleep')

describe ('getUserAverageHoursSlept', () => {
    it ('should return a user/s average hours slept for all time', () => {
        const userId = 1;
        const e = getUserAverageHoursSlept(sampleData,userId);
        expect(e).to.equal(7)
    })
})

describe ('getUserAverageSleepQuality', () => {
    it ('should return a user/s average sleep quality for all time', () => {
        const userId = 1;
        const e = getUserAverageSleepQuality(sampleData, userId);
        expect(e).to.equal(4)
    })
})

describe ('getHoursSleptForCurrentDay', () => {
    it ('should return how many hours a user slept for the current day', () => {
        const userId = 1;
        const user1HoursSleptCurrentDay = getHoursSleptForCurrentDay(sampleData, userId)
        expect(user1HoursSleptCurrentDay).to.equal(4.4)
    })
})

describe ('getHoursSleptForCurrentDay', () => {
    it ('should return how many hours a different user slept for the current day', () => {
        const userId = 2;
        const user2HoursSleptCurrentDay = getHoursSleptForCurrentDay(sampleData, userId)
        expect(user2HoursSleptCurrentDay).to.equal(6.2)
    })
})

describe ('getSleepHoursAndQualityForWeek', () => {
    it ('should return a user/s hours slept and sleep quality for a given week starting from the date', () => {
        const userId = 1;
        const date = '2023/03/25'
        const e = getSleepHoursForWeek(sampleData, userId, date)
        expect(e).to.equal([
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