<script lang="ts">
    import Form from '$lib/components/Form.svelte'

    const title = 'Reset Password'

    export let data: any
    export let form: any
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="middle">
    <Form
            action="reset"
            {data}
            {form}
            inputs={[
            {
                label: 'Password',
                placeholder: 'Password',
                type: 'password',
                name: 'pass1',
                cols: 6,
            },
            {
                placeholder: 'Confirm Password',
                type: 'password',
                name: 'pass2',
                cols: 6,
            },
        ]}
            {title}
    />
</div>
