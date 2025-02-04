interface newUser {
    email: string,
    username: string,
    password: string
}

export default class UserAPI {
    constructor(private readonly baseUrl:string) {}

    //should return information about the 
    addNewUser(newUser: newUser) {
        return fetch(`${this.baseUrl}/user/signup`, {
            method: "POST",
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
    logInUser(username: string, password: string) {
        return fetch(`${this.baseUrl}/user/signin`, {
            method: "POST"
        })
    }

    getUser(jwt: string) {
        return fetch(`${this.baseUrl}/user`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${jwt}`
            }
        }).then((res) => {
            return res.ok
                ? res.json()
                : Promise.reject()
        })
    }
}