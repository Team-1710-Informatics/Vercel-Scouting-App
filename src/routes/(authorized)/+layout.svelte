<script>
    import logo from '$lib/assets/logo.png'
    import Dropdown from '$lib/components/ui/Dropdown.svelte'

    export let data
</script>

<div class="min-h-screen flex flex-col">
    <div class="header w-full flex flex-rows-8 p-4 font-extrabold">
        <div class="grow flex flex-row">
            <a href="/hub"
            ><img alt="1710" class="mr-3" src={logo} width="36px"/></a
            ><a class="text-3xl" href="/hub">Scouting</a>
        </div>
        <div
                class="rounded-2xl border-slate-900 border-2 bg-slate-800 py-2 lg:px-5 sm:px-2 lg:ml-2 mr-1 text-center"
        >
            <a href="/hub">Hub</a>
        </div>
        <div
                class="rounded-2xl border-slate-900 border-2 bg-slate-800 py-2 lg:px-5 sm:px-2 lg:mr-2 ml-1 text-center"
        >
            <a href="/logout">Logout</a>
        </div>
    </div>
    <slot/>
</div>


