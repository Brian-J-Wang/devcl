class CollectionAPI {
    constructor(
        private readonly url: string = "",
        public token: string = ""
    ) {}

    AddNewCollection(title: string) {
        return fetch(`${this.url}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                title: title
            })
        }).then((res) => {
            console.log(res);

            return res.ok
                ? res.json()
                : Promise.reject();
        })
    }

    GetUserCollections(user: string) {
        return fetch (`${this.url}/collections`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        }).then((res) => {
            console.log(res);
            return res.ok
                ? res.json()
                : Promise.reject();
        })
    }
}

export default CollectionAPI;