export const shareApplication = (application, via) => {
    return new Promise((resolve, reject) => {
        const requestType = btoa(via);
        return fetch(`${process.env.REACT_APP_BASE_API}/share/${application}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-request-type': requestType
            },
            method: "POST",
            credentials: "include",
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}
