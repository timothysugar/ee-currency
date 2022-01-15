const chai = require('chai')
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
            .get('/')

        chai.assert(response.ok)
    })
})