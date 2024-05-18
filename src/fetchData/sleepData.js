function fetchSleep() {
    return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then(response => response.json())
}

export {
    fetchSleep
}