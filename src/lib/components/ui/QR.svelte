<script>
    export let data = "";
    import qrcode from 'qrcode';
    let code;

    console.log("Data: ", data)

    qrcode.toString(data,{type:'svg'}, function (err, url) {
        if (url) {
            code = url.toString();
        }

        if (err) console.log(err);

    })

    export function reload() {
        qrcode.toString(data,{type:'svg'}, function (err, url) {
            if (url) {
                code = url.toString();
            }

        })
    }

</script>
<div>
    {@html code}
</div>


