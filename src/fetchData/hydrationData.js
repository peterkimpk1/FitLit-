function fetchHydration() {
    return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then(response => response.json())
}

export {
    fetchHydration
}