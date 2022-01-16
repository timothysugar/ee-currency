const assert = require('assert')
const dollarRates = require('./testRates.json')
const { createRateProvider } = require('../src/currency')

const rateProvider = createRateProvider(dollarRates)

context('currency', function () {
    [
        { from: 'USD', to: 'EUR', expected: 0.87815 },
        { from: 'EUR', to: 'USD', expected: 1.1387576154415533  },
        { from: 'USD', to: 'GBP', expected: 0.78569 }
    ].forEach(tc => {
        const rates = rateProvider(tc)
        it(`should provide a rate from ${tc.from} to ${tc.to}`, function () {
            const result = rates.getRate()

            assert.strictEqual(result, tc.expected)
        })
    })
})