import tokens from "./tokens.json"

export function compress(data) {
    if (!data) {
        console.log("No data provided")
        return
    }

    data = JSON.stringify(data)

    const splitdata = data.split('"');
    console.log(splitdata);

    const keys  = Object.keys(tokens);

    const values = Object.values(tokens);

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
        output += '"';
    }

    output = output.replace(/\\/g, '');

    output = output.substring(0, output.length - 1);

    return output;

}


export function decompress(data) {
    if (!data) {
        console.log("no data provided")
        return
    }
    console.log("data ", data)
    const splitdata = data.split('"');
    console.log("splitdata ", splitdata);

    const keys  = Object.keys(tokens)
    const values = Object.values(tokens)

    let output = '';

    output = output.replace(/\\/g, '');

    for (let i = 0; i < splitdata.length; i++) {
        const word = splitdata[i]

        if (word === "") {
            continue;
        }

        console.log(word)
        if (keys.includes(word)) {
            output += values[keys.indexOf(word)];
        } else {
            output += word.toString();
        }

        output += '"';

    }

    output = output.substring(0, output.length - 1);

    return output;
}