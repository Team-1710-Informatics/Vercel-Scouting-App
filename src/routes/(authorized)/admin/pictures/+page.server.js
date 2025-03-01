export async function load({ locals }) {
    // url for AppScript Web App, returns objects with team, photo link, and scout
    const url = "https://script.google.com/macros/s/AKfycbwOUHmCNgmQVijp05G8pW2PJ0XvvOlQlHV8L_2jmI--zeqW-nON0ALyg3ChWMIwV7bO9A/exec"

    let response = await fetch(url)
    let data = await response.json()
    return data
}