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

    return ({ from, to }) => {
        return {
            getRate: () => {
                const rate = exchangeRates[from][to]
                console.log('using rate', { from, to, rate })
                return rate
            }
        }
    }
}

module.exports = {
    createRateProvider
}