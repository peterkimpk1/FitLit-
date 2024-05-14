import { expect } from 'chai';
const {consumedWaterForWeek, consumedWaterForDay, averageWaterConsumedPerDay} = require('../src/hydration.js')

describe('consumedWaterForWeek', () => {
    it('should return the correct amount of fluid ounces consumed each day over a course of a week', () => {
        const user1 = consumedWaterForWeek(1)
        expect(user1).to.equal(145);
    })
})