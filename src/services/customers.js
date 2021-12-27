export const getCustomers = () => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/customer/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "GET",
            credentials: "include"
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}