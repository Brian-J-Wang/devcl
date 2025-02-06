class CollectionAPI {
    constructor(
        private readonly url: string = "",
        public token: string = ""
    ) {}

    AddNewCollection(title: string) {
        console.log(this.token);
        
        return fetch(`${this.url}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                name: title,
                user: "test"
            })
        }).then((res) => {
            return res.ok
                ? res.json()
                : Promise.reject();
        })
    }
}

export default CollectionAPI;