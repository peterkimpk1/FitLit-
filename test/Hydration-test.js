import { expect } from 'chai';
import hydrationSampleData from "../src/data/hydration-sample-data.js"
const sampleData = hydrationSampleData.hydrationSampleData
const {consumedWaterForWeek, getConsumedWaterForDay, updatedUserHydration} = require('../src/hydration')
const hydrationSamples = hydrationSampleData.hydrationSampleData

describe('should return the user/s fluid ounces for a specific day', () => {
    it('should return the user/s fluid ounces for a specific day', () => {
        const date = "2023/03/24"
        const user1NumOunces = getConsumedWaterForDay(sampleData,1,date)
        expect(user1NumOunces).to.equal(10)
    });
});

describe('consumedWaterForWeek', () => {
    it('should return the correct amount of fluid ounces consumed each day over a course of a week', () => {
        const user1 = consumedWaterForWeek(sampleData,1)
        expect(user1).to.equal(145);
    })
})

describe('Hydration', ()=> {
    it('Should return the average fluid ounces drank per day', ()=>{
      const user = 1
      const hydrationUpdates1 = updatedUserHydration(hydrationSamples, user)
  
      expect(hydrationUpdates1).to.deep.equal(18.125)
  
      const user2 = 2
      const hydrationUpdates2 = updatedUserHydration(hydrationSamples, user2)
    
      expect(hydrationUpdates2).to.deep.equal(21.875)
    })
  })