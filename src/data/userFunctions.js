import { getRandomUser } from "../scripts";
import { updateUserMessage } from "../domUpdates";
import users from "./data/users.js"
const allUsers = users.users

window.addEventListener('load', () => {
    updateRandomUserMessage(allUsers);
  });

function returnUserData(allUsers) {
    const usersData = allUsers
    const userInfo = usersData.find(user => {
        console.log("USER ID:", user)
        return user
    }); 
    return userInfo
};

function getRandomUser(allUsers) {
    const randomIndex = Math.floor(Math.random() * allUsers.length);
    return allUsers[randomIndex]
};

function updateRandomUserMessage(users) {
    const randomUser = getRandomUser(users);
    updateUserMessage(randomUser);
}
