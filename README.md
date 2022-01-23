# Currency Converter
Instructions version: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

### Requirements
node 16

### Initial setup
`$> npm install`

### Running locally
`$> node src/index.js`

### Using the API
#### EUR to USD rate example
`$> curl 'localhost:3000/rate?from=EUR&to=USD'`

#### USD to GBP convert example
`$> curl -X POST 'localhost:3000/convert?to=GBP' -H 'Content-Type: application/json' -d '{"amount":13.12,"currency":"USD"}'`

#### EUR to GBP convert example
`$> curl -X POST 'localhost:3000/convert?to=GBP' -H 'Content-Type: application/json' -d '{"amount":13.12,"currency":"EUR"}'`

#### Sum EUR and GBP to CAD
`$> curl -X POST 'localhost:3000/sum?to=CAD' -H 'Content-Type: application/json' -d '[{"amount":13.12,"currency":"EUR"},{"amount":99,"currency":"GBP"}]'`

### Running unit tests
`$> npm t`

