export const createApplication = (obj) => {
    return new Promise((resolve, reject) => {
        const requestType = btoa(obj.bookingType);
        return fetch(`${process.env.REACT_APP_BASE_API}/application/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-request-type': requestType
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(obj)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}
