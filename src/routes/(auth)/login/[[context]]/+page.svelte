<script lang="ts">
    import Form from '$lib/components/Form.svelte'

    const title = 'Login'

    export let data: any
    export let form: any
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="middle">
    <Form
            action="login"
            {data}
            {form}
            inputs={[
            {
                label: 'Username or Email',
                placeholder: 'Username',
                type: 'text',
                name: 'username',
                cols: 6,
            },
            {
                label: 'Password',
                placeholder: 'Password',
                type: 'password',
                name: 'password',
                cols: 6,
            },
        ]}
            {title}
    />
    <a class="my-2" href="signup">
        <button>Create an account</button>
    </a>
    <a class="my-2" href="forgot-password">
        <button>Forgot Password?</button>
    </a>
</div>
