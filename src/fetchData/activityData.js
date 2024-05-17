const fetchActivities = () => {
    const newFetch = fetch('https://fitlit-api.herokuapp.com/api/v1/activity').then(response => response.json())
    return newFetch
}
fetchActivities()
export {
    fetchActivities
}