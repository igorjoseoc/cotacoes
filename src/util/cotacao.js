const request = require('request')

const access_key = '088cdac430354207eaa177dcdb56da2b'


const cotacao = (reqSymbol, callback) => {
    //const url = `http://api.marketstack.com/v1/tickers/${reqSymbol}/eod?access_key=${access_key}`

    const url = `http://api.marketstack.com/v1/eod?access_key=${access_key}&symbols=${reqSymbol}`

    request({url: url, json: true}, (err, response) => {
        if (err){
            // throw new Error(`Something went wrong: ${err}`)
            // const error = {
            //     message : `Something went wrong: ${err}`
            // }

            callback( {
                message : `Something went wrong: ${err}`,
                code : 500
            }, undefined)
        }
        else if (response.body.error){
            // const error = {
            //     message : response.body.error
            // }
            callback({
                message : response.body.error
            }, undefined)
        }
        else {
            // if(response.body.error)
            //     console.log(response.body.error)

            if (response.body === undefined || response.body.data[0] === undefined){
                // throw new Error('No data found for symbol ' + reqSymbol)
                // const error = {
                //     messge : `No data found for symbol ${reqSymbol}`
                // }

                callback({
                    message : `No data found for symbol ${reqSymbol}`,
                    code : 404
                }, undefined)
            }
            else {
                const parsedJSON = response.body

                // const data = {
                //     symbol: parsedJSON.data[0].symbol,
                //     exchange:  parsedJSON.data[0].exchange,
                //     open: parsedJSON.data[0].open,
                //     close: parsedJSON.data[0].close,
                //     high: parsedJSON.data[0].high,
                //     low: parsedJSON.data[0].low
                // }
    
                const {symbol, exchange, open, close, high, low} = parsedJSON.data[0]
                callback(undefined, {symbol, exchange, open, close, high, low})
    
                // const data = {symbol, exchange, open, close, high, low}
                // callback(data, null)
            }
        }
    })
}

module.exports = cotacao