<script>
    import { JsonView } from '@zerodevx/svelte-json-view'

    export let data
</script>

<middle class="py-10">
    <div class="box">
        <p class="font-bold text-3xl">{data.pit.team}</p>
        <hr />
        <div>
            <p>Pit scouting data</p>
            <JsonView json={data.pit} />
        </div>
    </div>
</middle>
