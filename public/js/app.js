console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const open  = document.querySelector('#open')
const close = document.querySelector('#close')
const high  = document.querySelector('#high')
const low   = document.querySelector('#low')


cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'Buscando...'
    open.innerText  = ''
    close.innerText = ''
    high.innerText  = ''
    low.innerText   = ''

    event.preventDefault()

    const ativo = document.querySelector('input').value

    if(!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado'
        return
    }

    // console.log(`oi, passei por aqui ${ativo}`)

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMessage.innerText = 'Alguma coisa deu errado'
                open.innerText  = `Mensagem:  ${data.error.message}`
                close.innerText = `Código: ${data.error.code}`
            } else {
                mainMessage.innerText = data.symbol
                open.innerText  = `Open: ${data.open}`
                close.innerText = `Close: ${data.close}`
                high.innerText  = `High: ${data.high}`
                low.innerText   = `Low: ${data.low}`
                console.log(data)
            }
        })
    })

})