<script lang="ts">
    import {onMount} from 'svelte'
    import {writable} from 'svelte/store'

    export let url: string
    export let name: string

    let status = writable('Online')
    let color = writable('bg-green-500')

    onMount(async () => {
        try {
            const response = await fetch(url, {method: 'HEAD'})
            if (response.ok) {
                status.set('Online')
                color.set('bg-green-500')
            } else {
                status.set('Offline')
                color.set('bg-red-500')
            }
        } catch (error) {
            console.error('Error pinging the service:', error)
            status.set('Offline')
            color.set('bg-red-500')
        }
    })
</script>

<div class="flex flex-row items-center mt-2">
    <div class="text-xs text-gray-500">{name} | {url}</div>
    <div class="justify-self-end w-2 h-2 {$color} rounded-xl ml-2.5 mt-0.5"></div>
</div>
