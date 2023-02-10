<script>
    import Dropdown from '$lib/components/Dropdown.svelte';

    export let data;
</script>

<div class="header w-full text-3xl grid grid-cols-4 p-4 font-extrabold">
    <div class="col-span-3">
        1710 Scouting
    </div>
    <div class="text-base leading-9 justify-self-end">
        <Dropdown name={data.user.name.first} options={[
            {name:"Logout", href:"/logout"},
        ]}/>
    </div>
</div>

<div>
    <slot />
</div>