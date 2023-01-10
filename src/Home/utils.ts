export const fetchAPI = async (path: string, paramObj?: any, options?: RequestInit) => {
    const uri = `${path}?${new URLSearchParams(paramObj)}`
    
    return fetch(uri, options).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw Error(`request failed with status ${res.status}`);
    }).then(data => data).catch(error => console.error(error));
}