/**
 * Class contains endpoints for a specific collection instance.
 */
class CollectionAPI {
    constructor(
        private readonly endpoint: string,
        private readonly collection: string,
        private readonly token: string
    ) {}

    getCollection() {
        return fetch(`${this.endpoint}/${this.collection}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject();
            }
        })
    }


}

export default CollectionAPI;