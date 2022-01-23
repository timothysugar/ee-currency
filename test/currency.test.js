const assert = require('assert')
const dollarRates = require('./testRates.json')
const { createConverter } = require('../src/currency')

const currency = createConverter(dollarRates)

context('currency', function () {
    [
        { from: 'USD', to: 'EUR', expected: 0.87815 },
        { from: 'EUR', to: 'USD', expected: 1.1387576154415533 },
        { from: 'USD', to: 'GBP', expected: 0.78569 }
    ].forEach(tc => {
        it(`should provide a rate from ${tc.from} to ${tc.to}`, function () {
            const result = currency.getRate(tc)

            assert.strictEqual(result, tc.expected)
        })
    })

    it(`should convert money to a different currency`, function () {
        const to = 'CAD'
        const money = { amount: 13.12, currency: 'EUR' }
        const expected = { amount: 19.68, currency: 'CAD' }

        const result = currency.convert(to, money)

        assert.deepStrictEqual(result, expected)
    })

    it(`should sum monies of different currencies`, function () {
        const to = 'CAD'
        const monies = [{ amount: 13.12, currency: 'EUR' }, { amount: 99, currency: 'GBP'}]
        const expected = { amount: 185.64, currency: 'CAD' }

        const result = currency.sum(to, monies)

        assert.deepStrictEqual(result, expected)
    })
})