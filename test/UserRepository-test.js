import { expect } from 'chai';
const { returnUserData } = require('../src/scripts.js'); 

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

describe('Return User Data', () => { 
  it('should return user data based on their id', function () {
    const userId = 1;
    const user1 = returnUserData(userId)
   
    expect(user1).to.deep.equal({
      "id": 1,
      "name": "Peter Kim",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Peter.Kim@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    });
  });
}); 
