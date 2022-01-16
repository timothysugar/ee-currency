const Koa = require('koa');
const Router = require('@koa/router')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const { createConverter } = require('./currency')
const dollarRates = require('./rates.json')

const app = new Koa();
const router = new Router();
const rateProvider = createConverter(dollarRates)

router.get('/rate', (ctx, next) => {
    const { from, to } = ctx.query
    const rate = rateProvider.getRate({ from, to })
    ctx.body = { rate };
});

router.post('/sum', koaBody(), (ctx, next) => {
    const { to } = ctx.query
    const monies = ctx.request.body
    const sum = rateProvider.sum(to, monies)
    ctx.body = sum;
});

app
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = {
    app
}