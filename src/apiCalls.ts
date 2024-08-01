function fetchData(dataType: string) {
    const root = 'https://fitlit-api-pi.vercel.app/api/v1/'
    const url = `${root}${dataType}`
    const promise = fetch(url)
                    .then(response => response.json());
    return promise
    }
    
export {
fetchData
}

