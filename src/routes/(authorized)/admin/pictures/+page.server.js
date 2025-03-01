export async function load({ locals }) {
    const url = "https://script.google.com/macros/s/AKfycbzso33KVxTFnSqryxiarmKRcU2pJoWT5wVr2KDUiN3HOA2EuFBMimJOGdawCP7VSIe1Sg/exec"
    let response = await fetch(url)
    let data = await response.json()
    return data
}