export const updateMerchant = (data) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/merchant/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}