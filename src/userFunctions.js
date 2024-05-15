import { updateUserMessage } from "./domUpdates.js";
import users from "./data/users.js"

const allUsers = users.users


function getUserData(allUsers,userId) {
    const userInfo = allUsers.find(user => {
        return user.id === userId
    }); 
    return userInfo
};

function getAverageStepGoalAllUsers(usersData) {
    const avgStepGoalAllUsers = usersData.reduce((accumulator, user) => {
        return accumulator += (user.dailyStepGoal / usersData.length)
    }, 0)
    return avgStepGoalAllUsers
}; 
function getRandomUser(allUsers) {
    const randomIndex = Math.floor(Math.random() * allUsers.length);
    return allUsers[randomIndex]
};

function updateRandomUserMessage(users) {
    const randomUser = getRandomUser(users);
    updateUserMessage(randomUser);
}

function updatedUserHydration(hydration, user){
    const userHydrationData = hydration.filter(hydrate => hydrate.userID === user);

    // Check if there's any data for the user on the specified date(s)
    if (userHydrationData.length === 0) {
        return;
    }

    // Calculate the average fluid ounces drank per day for the user
    const totalFluidOunces = userHydrationData.reduce((total, hydrate) => total + hydrate.numOunces, 0);
    const averageFluidOuncesPerDay = totalFluidOunces / userHydrationData.length;

    return averageFluidOuncesPerDay;
}

export {
    getUserData,
    getAverageStepGoalAllUsers,
    updateRandomUserMessage,
    updatedUserHydration
}

