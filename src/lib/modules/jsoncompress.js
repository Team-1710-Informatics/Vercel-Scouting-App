import tokens from './tokens.json'

export function compress(data) {
    if (!data) {
        console.log('No data provided')
        return
    }

    data = JSON.parse(data)
    const datakeys = Object.keys(data)
    console.log(datakeys)

    let output = {}

    function shortenKeys(data) {
        if (Array.isArray(data)) {
            return data.map((item) => {
                shortenKeys(item)
                return item
            })
        } else if (typeof data === 'object' && data !== null) {
            return Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    tokens[key] || key,
                    shortenKeys(value),
                ])
            )
        } else {
            return data
        }
    }

    return shortenKeys(output)
}

export function decompress(data) {
    if (!data) {
        console.log('no data provided')
        return
    }
    console.log('data ', data)
    const splitdata = data.split('"')
    console.log('splitdata ', splitdata)

    const keys = Object.keys(tokens)
    const values = Object.values(tokens)

    let output = ''

    output = output.replace(/\\/g, '')

    for (const element of splitdata) {
        let word = element

        if (word === '') {
            continue
        }

        word = word.substring(0, word.length - 2)

        console.log(word)
        if (keys.includes(word)) {
            output += values[keys.indexOf(word)]
        } else {
            output += word.toString()
        }

        output += '"'
    }

    output = output.substring(0, output.length - 1)

    console.log('decompressed ', output)
    return output
}
