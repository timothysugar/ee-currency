const { exit } = require('process')
const { app } = require('./server')

const main = () => {
    try {
        app.listen(3000)
    } catch(e) {
        console.error("An unhandled error occured", e)
        exit(1)
    }
}

main()