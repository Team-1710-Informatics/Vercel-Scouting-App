

export async function load({ fetch }) {
    let myObject = await fetch("/api/2023test");
    let jason = await myObject.json();
    return {jason};
}
  