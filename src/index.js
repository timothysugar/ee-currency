const { exit } = require('process')

const main = () => {
    try {
        throw Error("boom")
    } catch(e) {
        console.error("An unhandled error occured", e)
        exit(1)
    }
}

main()