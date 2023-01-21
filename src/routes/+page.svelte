<script lang="ts">
    import { enhance } from '$app/forms';

    const inputs:{label?:string, placeholder:string, type:string, name:string, cols:number, value?:number|string|boolean}[] = [
        {label:"Email",    placeholder:"Enter Email",      type:"text",     name:"email", cols:6},
        {label:"First",    placeholder:"First Name",       type:"text",     name:"fname", cols:3},
        {label:"Last",     placeholder:"Last Name",        type:"text",     name:"lname", cols:3},
        {label:"Username", placeholder:"Enter Username",   type:"text",     name:"uname", cols:6},
        {label:"Password", placeholder:"Password",         type:"password", name:"pass1", cols:6},
        {                  placeholder:"Confirm Password", type:"password", name:"pass2", cols:6},
        {label:"Team",     placeholder:"Team",             type:"number",   name:"team",  cols:2, value:1710},
        {label:"Authkey",  placeholder:"Authkey",          type:"text",     name:"auth",  cols:4},
    ]
    function width(cols:number):number{ return 203 * (cols/6) - (6 - cols); }
</script>
<svelte:head>
    <title>Sign Up</title>
</svelte:head>

<middle><form class="my-20 grid grid-cols-6 box" method="POST" action="?/signup" use:enhance>
    <center class="col-span-6"><h6>Sign Up</h6></center>

    {#each inputs as field}
        <label style="grid-column: span {field.cols} / span {field.cols};">
            <p hidden={field?.label == undefined}>{field?.label}</p>
            <input style="width:{width(field.cols)}px" class="mb-1" 
                placeholder={field.placeholder} 
                type={field.type} 
                name={field.name} 
                value={field?.value ? field?.value : ""}
            >
        </label>
    {/each}

    <center class="col-span-6 bg-green mt-2"><button class="submit">Submit</button></center>
</form></middle>
