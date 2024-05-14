// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

import sampleUserDataset from './data/sample-users-test-data.js' 

function returnUserData(userId) {
    const usersData = sampleUserDataset.sampleUserDataset
    const userInfo = usersData.find(user => {
       return user.id === userId
    }); 
    return userInfo
};

function returnAverageStepGoalAllUsers(usersData) {
    const avgStepGoalAllUsers = usersData.reduce((accumulator, user) => {
        return accumulator += (user.dailyStepGoal / usersData.length)
    }, 0)
    return avgStepGoalAllUsers
}; 

function getRandomUser(array) {
    return Math.floor(Math.random() * array.length);
};

export {
    returnUserData,
    returnAverageStepGoalAllUsers, 
    getRandomUser,
}

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
import userData from './data/users';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
import { exampleFunction1, exampleFunction2 } from './domUpdates';

exampleFunction1('Travis');
exampleFunction2('Travis')