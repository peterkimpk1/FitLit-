import users from "./data/users.js"

const allUsers = users.users

function getUserData(allUsers,userId) {
    const userInfo = allUsers.find(user => {
        return user.id === userId
    }); 
    return userInfo
};

function getAverageStepGoalAllUsers(allUsers) {
    const avgStepGoalAllUsers = allUsers.reduce((accumulator, user) => {
        return accumulator += (user.dailyStepGoal / allUsers.length)
    }, 0)
    return avgStepGoalAllUsers
}; 

function getRandomUser(allUsers) {
    const randomIndex = Math.floor(Math.random() * allUsers.length);
    return allUsers[randomIndex]
};



export {
    getUserData,
    getAverageStepGoalAllUsers,
    getRandomUser
}

