<script lang="ts">
    import Form from '$lib/Form.svelte';

    const title = "Verify email";

    export let data:any;
    export let form:any = data?.form ?? {};
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<middle>
    <Form {title} {form} action="verify" inputs={[
        {label:"Verification Code", placeholder:"", type:"text", name:"key", cols:6}
    ]}/>
</middle>