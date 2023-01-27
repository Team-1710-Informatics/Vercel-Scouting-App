<script lang="ts">
    import Form from '$lib/Form.svelte';

    const title = "Login";

    export let data:any;
    export let form:any;
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<middle>
    <Form {title} {data} {form} action="login" inputs={[
        {label:"Username or Email", placeholder:"Username", type:"text",     name:"username", cols:6},
        {label:"Password", placeholder:"Password",          type:"password", name:"password", cols:6},
    ]}/>
    <a class="my-2" href="signup"><button>Create an account</button></a>
</middle>