function fetchData(dataType) {
const root = 'https://fitlit-api.herokuapp.com/api/v1/'
const url = `${root}${dataType}`
const promise = fetch(url)
                .then(response => response.json());
return promise
}

// function fetchHydration() {
//     return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
//     .then(response => response.json())
// }

export {
    fetchData
}