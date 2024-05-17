import { expect } from 'chai';
import hydrationSampleData from "../src/data/hydration-sample-data.js"
const sampleData = hydrationSampleData.hydrationSampleData
const {getConsumedWaterForWeek, getConsumedWaterForDay, updatedUserHydration, getCurrentDayWaterConsumption} = require('../src/hydration')

describe('getConsumedWaterForDay', () => {
    it('should return the user/s fluid ounces for a specific day', () => {
        const date = "2023/03/24"
        const user1NumOunces = getConsumedWaterForDay(sampleData,1,date)
        expect(user1NumOunces).to.equal(10)
    });
});

describe('getCurrentDayWaterConsumption', () => {
    it('should return the user/s fluid ounces for current day', () => {
        const user1NumOunceCurrentDay = getCurrentDayWaterConsumption(sampleData,1)
        expect(user1NumOunceCurrentDay).to.equal(20)
    });
});

describe('getCurrentDayWaterConsumption', () => {
    it('should return a different user/s fluid ounces for current day', () => {
        const user2NumOunceCurrentDay = getCurrentDayWaterConsumption(sampleData,2)
        expect(user2NumOunceCurrentDay).to.equal(25)
    });
});

describe('consumedWaterForWeek', () => {
    it('should return the latest week/s user fluid ounces consumed each day', () => {
        const user1 = getConsumedWaterForWeek(sampleData,1)
        const user2 = getConsumedWaterForWeek(sampleData,2)
        expect(user1).to.deep.equal([20,20,20,20,20,20,15]);
        expect(user2).to.deep.equal([25,25,25,25,25,25,5]);
    })
})

describe('Hydration', ()=> {
    it('should return user/s average fluid ounces consumed per day for all time', ()=>{
      const user = 1
      const hydrationUpdates1 = updatedUserHydration(sampleData, user)
  
      expect(hydrationUpdates1).to.deep.equal(18.125)
  
      const user2 = 2
      const hydrationUpdates2 = updatedUserHydration(sampleData, user2)
    
      expect(hydrationUpdates2).to.deep.equal(21.875)
    })
  })