<script lang="ts">
    import Form from '$lib/components/Form.svelte'

    const title = 'Verify Email'

    export let data: any
    export let form: any
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<middle>
    <Form
        {title}
        {data}
        {form}
        action="verify"
        inputs={[
            {
                label: 'Verification Code',
                placeholder: '',
                type: 'text',
                name: 'key',
                cols: 6,
            },
        ]}
    />
</middle>
