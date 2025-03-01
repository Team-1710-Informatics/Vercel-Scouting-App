export async function load({ locals }) {
    const url = "https://script.google.com/macros/s/AKfycbyOLEmzso0SbfbZmmn9pfW_hvfR5hxp6a7OBwXeVxoi9_Cu6kcBSBoGXYzW7owZQVj9oQ/exec"
    let response = await fetch(url)
    let data = await response.json()
    return data
}