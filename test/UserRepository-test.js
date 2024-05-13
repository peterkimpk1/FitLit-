import { expect } from 'chai';
const { returnUserData } = require('../src/scripts.js'); 

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

describe('Return User Data', () => {
  it('should be a function', function () {
    expect(returnUserData).to.be.a('function');
  }); 
  it.skip('should return user data based on their id', function () {
    const userId = 1;
    const user1 = returnUserData(userId);

    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal("Trystan Gorczany");
    expect(user1.address).to.equal("9484 Lucas Flat, West Kittymouth WA 67504");
    expect(user1.email).to.equal("Taurean_Pollich31@gmail.com");
    expect(user1.strideLength).to.equal(4);
    expect(user1.dailyStepGoal).to.equal(7000);
    expect(user1.friends).to.deep.equal([5, 43, 46, 11]);

  });
}); 
