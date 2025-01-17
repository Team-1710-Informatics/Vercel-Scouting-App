import { releaseReason, User } from '$lib/server/models'

export async function load() {
    const releases = JSON.stringify(await releaseReason.find())
    const users = JSON.stringify(await User.find())

    return {
        releases: releases,
        users: users,
    }
}
