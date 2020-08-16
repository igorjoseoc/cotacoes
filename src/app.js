const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const cotacoes = require('./util/cotacao')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Bem vindo ao sistema de cotações',
        autor: 'Igor Costa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'Sobre',
        autor: 'Igor Costa'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Ajuda',
        autor: 'Igor Costa'
    })
})

// app.get('/help', (req, resp) => {
//     resp.send('Help page')
// })

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({error : {
            message : 'O ativo deve ser informado',
            code : 400
        }})
    }

    const symbol = req.query.ativo.toUpperCase()
    
    cotacoes(symbol, (err, body) => {
        if(err){
            // console.log(err)
            return res.status(err.code).json({error : {
                message : err.message,
                code : err.code
            }})
        }
        // console.log(body)
        res.status(200).json(body)
    })

    // const cotacao = {
    //     symbol : 'PETR4.BVMF',
    //     price_open: 10,
    //     price : 12,
    //     day_high : 13,
    //     day_low: 9
    // }

    // const cotacoes = new Array()

    // cotacoes.push(cotacao)
    // cotacoes.push(cotacao)

    // resp.send(cotacoes)
})

app.get('/help/*', (req, res) => {
    // res.send('404 do help')
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe pagina depois de /help',
        autor : 'Igor Costa'
    })
})

app.get('*', (req, res) => {
    // res.send('404')
    res.render('404', {
        title : '404',
        errorMessage : 'Página não encontrada',
        autor : 'Igor Costa'
    })
})

const port = process.env.port || 3000

app.listen(port, () => {
    console.log(`server is up on port 3000 ${port}`)
})