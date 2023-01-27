<script lang="ts">
    import Form from '$lib/Form.svelte';

    const title = "Sign Up";

    export let form:any;
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<middle>
    <Form {title} {form} action="signup" inputs={[
        {label:"Email",    placeholder:"Enter Email",      type:"text",     name:"email", cols:6},
        {label:"First",    placeholder:"First Name",       type:"text",     name:"fname", cols:3},
        {label:"Last",     placeholder:"Last Name",        type:"text",     name:"lname", cols:3},
        {label:"Username", placeholder:"Enter Username",   type:"text",     name:"uname", cols:6},
        {label:"Password", placeholder:"Password",         type:"password", name:"pass1", cols:6},
        {                  placeholder:"Confirm Password", type:"password", name:"pass2", cols:6},
        {label:"Team",     placeholder:"Team",             type:"number",   name:"team",  cols:2, value:1710},
        {label:"Authkey",  placeholder:"Authkey",          type:"text",     name:"auth",  cols:4},
    ]}/>
    <a class="my-2" href="login"><button>I already have an account</button></a>
</middle>


