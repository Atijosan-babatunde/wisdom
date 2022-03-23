
export const createBusiness = (data) => {
    return new Promise((resolve, reject) => {
        // history.push("/bank-information/")
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

export const getSupportedNubans = () => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/miscellaneous/get-supported-banks/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const resolveNuban = (req) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/miscellaneous/resolve-account-number/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(req)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const addNuban = (req) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/nuban/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(req)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const getNubans = () => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/nuban/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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