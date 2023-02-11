

export function load({ cookies }) {
    const previous = JSON.parse(cookies.get("scout"));

    return {
        scout:previous
    }
}