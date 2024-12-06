import { PYTHON_API_ENDPOINT } from '$lib/env'

export const ApiService = {
    async request(route, options) {
        return await fetch(PYTHON_API_ENDPOINT + route, options)
    },
}
