const chai = require('chai')
const { assert } = chai
const chaiHttp = require('chai-http');
const { app } = require('../src/server')

chai.use(chaiHttp);

context('API', function () {
    let server

    before(function() {
        server = app.listen()
    })

    after(function() {
        server.close()
    })

    it('should return an exchange rate', async function () {
        const response = await chai.request(server)
            .get('/rate')
            .query({ from: 'EUR'})
            .query({ to: 'USD'})

        assert(response.ok)
        assert.deepStrictEqual({ rate: 1.1387576154415533 }, response.body)
    })

    it('should return a converted money', async function () {
        const response = await chai.request(server)
            .post('/convert')
            .query({ to: 'CAD' })
            .send({ amount: 13.12, currency: 'EUR'})

        assert(response.ok)
        assert.deepStrictEqual({ amount: 19.68, currency: 'CAD' }, response.body)
    })

    it('should sum monies of different currencies', async function () {
        const response = await chai.request(server)
            .post('/sum')
            .query({ to: 'CAD' })
            .send([ { amount: 13.12, currency: 'EUR'}, { amount: 99, currency: 'GBP'}])

        assert(response.ok)
        assert.deepStrictEqual({ amount: 185.64, currency: 'CAD' }, response.body)
    })
})