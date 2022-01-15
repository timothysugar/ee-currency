const assert = require('assert')
const Dinero = require('dinero.js')
const targetCurrency = 'GBP'
const rates = {
    rates: {
        [targetCurrency]: 0.5000
    }
}

context('Dinero', function () {
    it('should convert between currencies based on the rates provided', async function () {
        const twoDollars = Dinero({ amount: 200, currency: 'USD' })
        const result = await twoDollars.convert('GBP', {
            endpoint: Promise.resolve(rates)
        })

        assert(result !== null)
        const onePound = Dinero({ amount: 100, currency: targetCurrency})
        assert(result.equalsTo(onePound))
    })
})