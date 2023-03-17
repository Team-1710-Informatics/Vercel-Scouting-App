<script>
    export let ticket;
</script>

<div class="flex flex-col gap-0 m-2">
    <div class={`rounded-t p-1 ${ticket.alliance=="red"?"bg-red-500":"bg-blue-600"}`}>
        <p class="text-2xl font-bold">{ticket.match}</p>
    </div>
    <div class="rounded-b bg-white">

    </div>
</div>