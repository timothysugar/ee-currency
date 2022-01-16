const createRateProvider = (dollarRates) => ({ from, to }) => {
    const createRates = () => {
        const rates = {
            'USD': dollarRates
        }

        const codes = Object.keys(dollarRates)

        Object.entries(dollarRates).map(kv => {
            const [code, dollarRate] = kv
            rates[code] = {'USD': 1/dollarRate}

            codes.forEach(c => {
                if (c === code) return
                rates[code][c] = dollarRates[c] / dollarRate 
            })
        })

        return rates
    }

    const exchangeRates = createRates()
    console.log('built exchange rates', { exchangeRates })

    return {
        getRate: () => {
            const rate = exchangeRates[from][to]
            console.log('using rate', { from, to, rate })
            return rate
        }
    }
}

module.exports = {
    createRateProvider
}