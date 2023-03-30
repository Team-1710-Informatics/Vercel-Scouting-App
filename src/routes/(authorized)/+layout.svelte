<script>
    import logo from "$lib/assets/logo.png";
    import Dropdown from '$lib/components/ui/Dropdown.svelte';

    export let data;
</script>

<div class="header w-full text-3xl grid grid-cols-4 p-4 font-extrabold">
    <div class="col-span-3 flex flex-row">
        <a href="/hub"><img src={logo} width=36px alt="1710" class="mr-3"/></a> Scouting
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