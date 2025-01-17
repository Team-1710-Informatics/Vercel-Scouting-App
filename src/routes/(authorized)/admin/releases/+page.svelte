<script lang="ts">
    export let data: any

    let releases = JSON.parse(data.releases)
    let users = JSON.parse(data.users)

    function findName(username: string) {
        let name = ['']
        users.forEach((e: any) => {
            if (e.username == username) {
                name.unshift(e.name.first)
                name.unshift(e.name.last)
            }
        })
        if (name[0] == '') {
            return username
        } else {
            return name[1] + ' ' + name[0].charAt(0)
        }
    }

    function stringPreview(string: string) {
        let newString = string
        if (string.length > 13) {
            newString = ''
            for (let i = 0; i < 7; i++) {
                newString = newString + string.charAt(i)
            }
            newString = newString + '...'
        }
        return newString
    }

    function formatTime(time: any) {
        let finalTime = time
        if (time > 12) {
            let newTime = time - 12
            finalTime = newTime + ':00 P.M.'
        } else {
            finalTime = time + ':00 A.M.'
        }
        return finalTime
    }

    let reason = ''
    let full = false
</script>

<middle>
    <div class="flex flex-wrap gap-2">
        {#each releases as release}
            <div class="bg-gray-800 rounded-2xl p-1 m-2 w-40">
                <div class="bg-gray-700 rounded-lg px-2 py-1 m-1">
                    {findName(release.name)}
                </div>
                <div class="bg-gray-700 rounded-lg px-2 py-1 m-1">
                    {release.day}
                </div>
                <div class="bg-gray-700 rounded-lg px-2 py-1 m-1">
                    {formatTime(release.start)}<br />
                    to<br />
                    {formatTime(release.end)}
                </div>
                <div class="bg-gray-700 rounded-lg px-2 py-1 m-1">
                    {#if release.reason.length <= 13}
                        {stringPreview(release.reason)}
                    {:else}
                        <button
                            on:click={() => {
                                ;(reason = release.reason), (full = true)
                            }}
                        >
                            {stringPreview(release.reason)}
                        </button>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    {#if full == true}
        <div
            on:click={() => {
                full = false
            }}
            class="overlay"
        ></div>
        <div class="msg bg-gray-700 h-min p-2 rounded-2xl">
            <middle>
                {reason}
            </middle>
        </div>
    {/if}
</middle>

<style>
    .overlay {
        z-index: 1;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        opacity: 0.4;
    }

    .msg {
        z-index: 2;
        width: 200px;
        font-weight: bold;
        text-align: center;
        position: fixed;
        top: 40%;
        opacity: 2;
    }
</style>
