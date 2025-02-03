// file = open("data.json", "r")
// data = file.read()
// file.close()
//
// file = open("tokens.json", "r")
// tokens = file.read()
// tokens = json.loads(tokens)
// file.close()
//
// def maketokens(data, mode):
// splitdata = data.split('"')
//
// tokensencode = {}
// tokensdecode = {}
//
// number = 0
//
// for i in splitdata:
// if i not in tokensencode:
// tokensencode.update({i: number})
// tokensdecode.update({number: i})
// number += 1
//
// if mode == 0:
// return tokensencode
// elif mode == 1:
// return tokensdecode
//
// def compress_json(data):
// """Compress JSON object using gzip and encode in base64."""
// json_string = json.dumps(data, separators=(',', ':'))  # Minify JSON
// compressed_data = gzip.compress(json_string.encode())
// return base64.b64encode(compressed_data).decode()  # Convert to base64 string
//
// def decompress_json(compressed_base64):
// """Decode base64 and decompress JSON object."""
// compressed_data = base64.b64decode(compressed_base64)
// decompressed_json = gzip.decompress(compressed_data).decode()
// return json.loads(decompressed_json)  # Convert back to JSON
//
// def keyshorten(data, encodetokens):
// splitdata = data.split('"')
//
// output = ''
//
// keys = list(encodetokens.keys())
// values = list(encodetokens.values())
//
// for i in splitdata:
// if i in values:
// output += keys[values.index(i)]
// else:
// output += str(i)
//
// output += '"'
//
// return compress_json(output[:-2])
//
//
// def keylongen(data, decodetokens):
// splitdata = data.split('"')
//
// output = ''
//
// keys = list(decodetokens.keys())
// values = list(decodetokens.values())
//
// for i in splitdata:
// if i in keys:
// output += values[keys.index(i)]
// else:
// output += str(i)
//
// output += '"'
//
// return decompress_json(output[:-2])
//
// print(keyshorten(data, tokens))
// print(keylongen(keyshorten(data, tokens), tokens))

import tokens from "./tokens.json"

export function compress(jsondata) {
    if (!jsondata) {
        console.log("No data provided")
        return
    }

    const data = JSON.stringify(jsondata)

    const splitdata = data.split('"');
    console.log(splitdata);

    const keys  = Object.keys(tokens);

    const values = Object.values(tokens);

    console.log(values)

    let output = '';

    if (!values) {
        console.log(values)
        return
    }

    for (let i = 0; i < splitdata.length; i++) {
        const word = splitdata[i]
        if (values.includes(word)) {
            output += keys[values.indexOf(word)];
        } else {
            output += word.toString();
        }
        output += '"'
    }

    console.log(output)
    return output;

}


export function decompress(jsondata) {
    if (!jsondata) {
        console.log("no data provided")
        return
    }

    const data = JSON.stringify(jsondata)
    const splitdata = data.split('"');

    const keys  = Object.keys(tokens)
    const values = Object.values(tokens)

    let output = '';

    for (let i = 0; i < splitdata.length; i++) {
        if (i in keys) {
            output += values[i];
        } else {
            output += i.toString();
        }
    }

    console.log(output)
    return output;

}