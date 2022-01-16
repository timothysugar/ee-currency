const Big = require('big.js')

const createRateProvider = (dollarRates) => {
    const createRates = () => {
        const rates = {
            'USD': dollarRates
        }

        const codes = Object.keys(dollarRates)

        Object.entries(dollarRates).map(kv => {
            const [code, dollarRate] = kv
            rates[code] = { 'USD': new Big(1).div(dollarRate).toNumber() }

            codes.forEach(c => {
                if (c === code) return
                rates[code][c] = new Big(dollarRates[c]).div(dollarRate).toNumber()
            })
        })

        return rates
    }

    const exchangeRates = createRates()
    console.log('built exchange rates', { exchangeRates })

    return {
        getRate: ({ from, to }) => {
            const rate = exchangeRates[from][to]
            console.log('using rate', { from, to, rate })
            return rate
        },
        sum: (to, monies) => {
            const total = monies
                .reduce((prev, curr) => {
                    const rate = exchangeRates[curr.currency][to]
                    const amount = new Big(rate).times(curr.amount)
                    return amount.add(prev)
                }, 0)

            const trucated = parseFloat(total.toFixed(2))

            console.log('summed monies', { monies, total, trucated })
            return { amount: trucated, currency: to }
        }
    }
}

module.exports = {
    createRateProvider
}