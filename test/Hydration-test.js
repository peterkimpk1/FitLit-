import { expect } from 'chai';
import hydrationSampleData from "../src/data/hydration-sample-data.js"
const sampleData = hydrationSampleData.hydrationSampleData
const {getConsumedWaterForWeek, getConsumedWaterForDay, updatedUserHydration} = require('../src/hydration')

describe('getConsumedWaterForDay', () => {
    it('should return the user/s fluid ounces for a specific day', () => {
        const date = "2023/03/24"
        const user1NumOunces = getConsumedWaterForDay(sampleData,1,date)
        expect(user1NumOunces).to.equal(10)
    });
});

describe('consumedWaterForWeek', () => {
    it('should return the user/s fluid ounces consumed each day over a course of a week', () => {
        const date = "2023/03/24"
        const user1 = getConsumedWaterForWeek(sampleData,1,date)
        expect(user1).to.deep.equal([10,15,20,20,20,20,20]);
    })
    it('should return the available user/s fluid ounces even if the data isn/t available for a week', () => {
        const date = "2023/03/26"
        const user1 = getConsumedWaterForWeek(sampleData,1,date)
        expect(user1).to.deep.equal([20,20,20,20,20,20]);
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