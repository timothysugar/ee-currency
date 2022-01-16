const { exit } = require('process')
const { app } = require('./server')

const port = 3000

const main = () => {
    try {
        console.log(`listening on port ${port}`)
        app.listen(port)
    } catch(e) {
        console.error("An unhandled error occured", e)
        exit(1)
    }
}

main()