<script>
    import { enhance } from "$app/forms";
    export let path;
    export let name;

    let state = "Upload";
</script>

<form enctype="multipart/form-data" method=POST action="https://team1710.com/scouting/files/upload.php" use:enhance={() => {
    state = "Loading..."
    //@ts-ignore
    return async ({ update }) => {
        await update();
        state = "Upload";
    };
}}>
    <input type="hidden" value={path} name="path"/>
    <input type="hidden" value={name} name="fname"/>
    <input type="file" name="upload"/>
    <button disabled={state!="Upload"}>{state}</button>
</form>

<img crossorigin src="https://team1710.com/scouting/files/storage/{path}{name}" alt="No Image Uploaded" />