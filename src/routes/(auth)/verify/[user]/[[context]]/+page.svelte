<script lang="ts">
    import Form from '$lib/components/Form.svelte'

    const title = 'Verify Email'

    export let data: any
    export let form: any
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="middle">
    <Form
            action="verify"
            {data}
            {form}
            inputs={[
            {
                label: 'Verification Code',
                placeholder: '',
                type: 'text',
                name: 'key',
                cols: 6,
            },
        ]}
            {title}
    />
</div>
