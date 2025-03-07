export const ApiService = {
    async request(route) {
        let endpoint = 'https://micro.apisb.me'
        let data = await fetch(endpoint + route)

        // let data = await fetch('https://micro.apisb.me/')

        let compatibility = await data.json()

        return { compatibility: await compatibility.compatibility }
    },
}
