import { removeCookie } from "../helpers/cookie";

export const obtainAuthToken = (data) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/obtain/?authType=2`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

export const resetPassword = (data) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/reset/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

export const requestPasswordReset = (data) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/reset/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
}

export const verifyOTP = (props) => {
    console.log(props)
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/otp/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify(props)
        }).then((res) => {
            return res.json()
        }).then((data) => {
            resolve(data)
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

export const resendOTP = (props) => {
    return new Promise((resolve, reject) => {
        return fetch(`${process.env.REACT_APP_BASE_API}/otp/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify(props)
        }).then((res) => {
            return res.json()
        }).then((data) => {
            resolve(data)
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

export const logout = () => {
    // Make api call to server to remove cookie
    removeCookie("1Q_SPA");
    removeCookie("_token");
}