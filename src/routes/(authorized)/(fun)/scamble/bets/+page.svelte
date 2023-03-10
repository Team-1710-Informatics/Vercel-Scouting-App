<script>
    import arrowDown from "$lib/assets/icons/arrowDown.svg";
    import arrowRight from "$lib/assets/icons/arrowRight.svg";
    import { slide } from "svelte/transition";
    let expand=false;
</script>

<center>
    <div class="box">
        <center>
            <form method="POST">
                <label>
                    Amount Bet
                    <input name="email" type="email">
                  </label>
                  <label>
                    Competition
                    <button on:click={()=>{expand!=expand;}}>
                        <img style="filter:invert(100%)" src={expand?.checked?arrowDown:arrowRight} alt="collapse">
                    </button>
                  </label>
                  <button>Log in</button>
            </form>
        </center>
    </div>
</center>