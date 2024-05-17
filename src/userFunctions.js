function getUserData(users, userId) {
    const userInfo = users.find(user => {
        return user.id === userId
    }); 
    return userInfo
};

function getAverageStepGoalAllUsers(users) {
    const avgStepGoalAllUsers = users.reduce((accumulator, user) => {
        return accumulator += (user.dailyStepGoal / users.length)
    }, 0)
    return avgStepGoalAllUsers
}; 

function getRandomUser(users) {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex]
};


export {
    getUserData,
    getAverageStepGoalAllUsers,
    getRandomUser
}

