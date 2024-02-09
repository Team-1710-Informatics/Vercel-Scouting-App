export async function load({ locals }){
    return {
        events: [],
        permissions: [ "admin", "investor" ],
        user: {
            first: "Ben",
            last: "G"
        },
        team: 1710
    }
}