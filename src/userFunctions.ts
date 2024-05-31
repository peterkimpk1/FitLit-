export interface User {
    id: number;
    dailyStepGoal: number;
}

function getUserData(users: User[], userId: number): User | undefined {
    const userInfo = users.find(user => user.id === userId)
    return userInfo
};

function getAverageStepGoalAllUsers(users: User[]): number {
    const avgStepGoalAllUsers = users.reduce((accumulator: number, user: User) => {
        return accumulator += (user.dailyStepGoal / users.length)
    }, 0)
    return avgStepGoalAllUsers
}; 

function getRandomUser(users: User[]): User | undefined {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex]
};


export {
    getUserData,
    getAverageStepGoalAllUsers,
    getRandomUser
}

