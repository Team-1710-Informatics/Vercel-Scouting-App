<script lang="ts">
    import Form from '$lib/components/Form.svelte';

    const title = "Forgot Password";

    export let data:any;
    export let form:any;
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<middle>
    <Form {title} {data} {form} action="forgot" inputs={[
        {label:"Email", placeholder:"Email", type:"text", name:"email", cols:6}
    ]}/>
</middle>