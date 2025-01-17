<script>
    import { onMount } from 'svelte'

    let elements

    const Mario = {
        position: [200, 400],
        velocity: [0, 0],
    }

    onMount(() => {
        elements = document.getElementsByTagName('*')
    })

    function controller(e) {
        let key = e.keyCode

        switch (key) {
            case 38:
                Mario.velocity[1] -= 10
                break
            case 40:
                Mario.velocity[1] += 10
                break
            case 37:
                Mario.velocity[0] -= 10
                break
            case 39:
                Mario.velocity[0] += 10
                break
        }
    }

    setInterval(() => {
        Mario.velocity[0] = Math.trunc(Mario.velocity[0] / 2)
        Mario.velocity[1] = Math.trunc(Mario.velocity[1] / 2)

        Mario.position[0] += Mario.velocity[0]
        Mario.position[1] += Mario.velocity[1]
    }, 1000 / 60)
</script>

<svelte:window on:keydown={controller} />

<div
    style="
    position:fixed;
    left:{Mario.position[0]}px;
    top:{Mario.position[1]}px;
    width:10px;
    height:10px;

    background-color:white;
"
></div>
