<script lang="ts">
    /**
     * This is a component for quickly creating input tag based forms
     * Should not be used for more complicated input methods
    */
    import { slide } from 'svelte/transition';
    import { enhance } from '$app/forms';

    export let form:any;
    export let data:any = {};

    //export let enhance:Function;
    export let action:string;
    export let title:string;
    export let inputs:{label?:string, 
        placeholder:string,
        type:string, 
        name:string,
        cols:number,
        value?:number|string|boolean,
        optional?:boolean
    }[];

    function width(cols:number):number { return 203 * (cols/6) - (6 - cols); }

    let loading = false;
</script>

<form class="grid grid-cols-6 box" style="width:228.6px" method="POST" action="?/{action}" use:enhance={() => {
    loading = true;
    //@ts-ignore
    return async ({ update }) => {
        await update();
        loading = false;
    };
}}>
    <center class="col-span-6"><h6>{title}</h6></center>

    <div class="grid grid-cols-1">
        {#if data?.success}
            <p transition:slide class="success" style="width:200px">{data.success}</p>
        {/if}
        {#if data?.alert}
            <p transition:slide class="alert" style="width:200px">{data.alert}</p>
        {/if}
        {#if data?.error}
            <p transition:slide class="error" style="width:200px">{data.error}</p>
        {/if}
    </div>

    {#each inputs as field}
        <label style="grid-column: span {field.cols} / span {field.cols};">
            <p hidden={field?.label == undefined}>{field?.label}</p>
            <input style="width:{width(field.cols)}px" class="mb-1" 
                placeholder={field.placeholder} 
                type={field.type} 
                name={field.name} 
                value={form?.[field.name] ?? field?.value ?? ""}
                required={!field?.optional}
                disabled={loading}
            >
        </label>
    {/each}

    <div class="grid grid-cols-1">
        {#if form?.success}
            <p transition:slide class="success" style="width:200px">{form.success}</p>
        {/if}
        {#if form?.alert}
            <p transition:slide class="alert" style="width:200px">{form.alert}</p>
        {/if}
        {#if form?.error}
            <p transition:slide class="error" style="width:200px">{form.error}</p>
        {/if}
    </div>

    <center class="col-span-6 bg-green mt-2"><button class="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button></center>
</form>