import { expect } from 'chai';
import sampleUserDataset from '../src/data/sample-users-test-data';
const { getUserData, getAverageStepGoalAllUsers} = require('../src/userFunctions');
const allSampleUsers = sampleUserDataset.sampleUserDataset

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

describe('Return User Data', () => { 
  it('should return user data based on their id', function () {
    const userId = 1;
    const user1 = getUserData(allSampleUsers,userId)
   
    expect(user1).to.deep.equal({
      "id": 1,
      "name": "Peter Kim",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Peter.Kim@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        2,
        3,
        5,
      ]
    });
  });
});

describe('Return Avg Step Goal for All Users', function() {
  it('should return the average step goal for all users', function () {
    const userId = 1;
    const user1 = getUserData(allSampleUsers,userId);
    
    const userId2 = 2;
    const user2 = getUserData(allSampleUsers,userId2);
    
    const userId3 = 3;
    const user3 = getUserData(allSampleUsers,userId3);
    
    const userId4 = 4;
    const user4 = getUserData(allSampleUsers,userId4);
  
    const userId5 = 5; 
    const user5 = getUserData(allSampleUsers,userId5);
  
    const usersData = [user1, user2, user3, user4, user5];
   
    const avgStepGoalAllUsers = getAverageStepGoalAllUsers(usersData);
  
        expect(avgStepGoalAllUsers).to.equal(6600);
  });
 
})