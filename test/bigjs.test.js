const assert = require('assert')
const Big = require('big.js')

context('big.js', function () {
    it('without big.js should demonstrate common floating point errors', async function () {
        const result = 0.2 + 0.1
        assert.strictEqual(0.30000000000000004, result)
    })

    it('with big.js should handle common floating point errors', async function () {
        const result = new Big(0.2).add(0.1).toNumber()
        assert.strictEqual(0.3, result)
    })
})