<script>
    import Status from '$lib/components/function/Status.svelte';
    import Dropdown from '$lib/components/ui/Dropdown.svelte';
    import { onDestroy } from 'svelte';
    import logo from "$lib/assets/logo.png";
    import Logofy from '$lib/components/visual/Logofy/Logofy.svelte';

    export let data;
</script>

<div class="header w-full text-3xl grid grid-cols-4 p-4 font-extrabold">
    <div class="col-span-3 flex flex-row">
        <img src={logo} width=32px alt="1710" class="mr-3"/> Scouting
    </div>
    <div class="text-base leading-9 justify-self-end">
        <Dropdown name={data.user.name.first} options={[
            {name:"Hub", href:"/hub"},
            {name:"Logout", href:"/logout"},
        ]}/>
    </div>
</div>

<div>
    <slot />
</div>