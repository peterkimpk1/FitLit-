import { expect } from 'chai';
import hydrationSampleData from "../src/data/hydration-sample-data.js"
const sampleData = hydrationSampleData.hydrationSampleData
const {consumedWaterForWeek, consumedWaterForDay, averageWaterConsumedPerDay} = require('../src/hydration')


describe('consumedWaterForWeek', () => {
    it('should return the correct amount of fluid ounces consumed each day over a course of a week', () => {
        const user1 = consumedWaterForWeek(sampleData,1)
        expect(user1).to.equal(145);
    })
})
