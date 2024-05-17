import { expect } from 'chai';
import sleepData from "../src/data/sample-sleep-test-data.js"
const sampleData = sleepData.sleepData
const {getUserAverageHoursSlept, getUserAverageSleepQuality} = require('../src/sleep')

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