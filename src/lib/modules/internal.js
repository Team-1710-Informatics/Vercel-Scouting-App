import { PUBLIC_HOST } from '$env/static/public'

export default async function (route) {
    const res = await fetch(`${PUBLIC_HOST}/api/${route}`)

    return await res.json()
}
