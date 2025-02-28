export const ApiService = {
    async request(route) {
        // let endpoint = 'https://micro.apisb.me'
        // return await fetch(endpoint + route)

        let data = await fetch('http://127.0.0.1:5000/number')

        let compatibility = await data.json()

        return { compatibility: await compatibility.compatibility }
    }
}
