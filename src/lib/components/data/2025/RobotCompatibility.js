export const ApiService = {
    async request(route) {
        let endpoint = 'https://micro.apisb.me'
        return await fetch(endpoint + route)
    }
}
