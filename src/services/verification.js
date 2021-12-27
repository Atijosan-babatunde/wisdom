import { fetchCookie } from "../helpers/cookie";

export const createBusiness = (data) => {
    return new Promise((resolve, reject) => {
        const _token  = fetchCookie("token");
        // history.push("/bank-information/")
        return fetch(`${process.env.REACT_APP_BASE_API}/merchant/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${_token}`
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