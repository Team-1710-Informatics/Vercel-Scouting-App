<script>
    import '../app.css'
    import FakeProgressBar from '$lib/components/function/FakeProgressBar.svelte'

    import { beforeNavigate } from '$app/navigation'
    import { updated } from '$app/stores'

    beforeNavigate(({ willUnload, to }) => {
        if ($updated && !willUnload && to?.url) {
            location.href = to.url.href
        }
    })
</script>

<div class="h-screen">
    <slot />
</div>

<FakeProgressBar />
