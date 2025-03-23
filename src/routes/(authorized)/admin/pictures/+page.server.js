export async function load({ locals }) {
    // url for AppScript Web App, returns objects with team, photo link, and scout
    const url = "https://script.google.com/macros/s/AKfycbyT3jFLqPRAtGlseIF2Dz8fZlG-YwsKjUyibDjKa_PSLMt4u3O0pURhufsYcSqERvDD5A/exec"

    let response = await fetch(url)
    console.log(response)
    let data = await response.json()

    return data
}