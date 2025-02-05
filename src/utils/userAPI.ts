interface newUser {
    email: string,
    username: string,
    password: string
}
export default class UserAPI {
    constructor(private readonly baseUrl:string) {}

    //should return information about the 
    addNewUser(newUser: newUser) {
        return fetch(`${this.baseUrl}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: newUser.email,
                username: newUser.username,
                password: newUser.password
            })
        }).then((res: Response) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject();
            }
        })
    }

    //should return an authorization token
    logInUser(email: string, password: string) {
        return fetch(`${this.baseUrl}/users/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject();
            }
        })
    }

    getUser(jwt: string) {
        return fetch(`${this.baseUrl}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwt}`
            }
        }).then((res) => {
            return res.ok
                ? res.json()
                : Promise.reject()
        })
    }
}