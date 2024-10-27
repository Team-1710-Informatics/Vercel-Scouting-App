<script>
    import { enhance } from '$app/forms'
    import { PUBLIC_HOST } from '$env/static/public'
    export let path
    export let name

    let state = 'Upload'
</script>

<form
    enctype="multipart/form-data"
    method="POST"
    action="{PUBLIC_HOST}/internal/upload"
    use:enhance={() => {
        state = 'Loading...'
        return async ({ update }) => {
            await update()
            state = 'Upload'
        }
    }}
>
    <input type="hidden" value={path} name="path" />
    <input type="hidden" value={name} name="fname" />
    <input type="file" name="upload" />
    <button disabled={state != 'Upload'}>{state}</button>
</form>

<!-- <img crossorigin src="https://team1710.com/scouting/files/storage/{path}{name}" alt="No Image Uploaded" /> -->
