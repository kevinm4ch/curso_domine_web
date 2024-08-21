let altura;
let largura;


function criarPalco() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

criarPalco();

//Aqui inicia toda a função do jogo
function mataMosca(nivel){


const vidas = nivel.vidas
//Tempo do jogo em segundos
const tempo = nivel.tempo

function criarVidas(vidas){
    // Cria a div que guarda os corações
    let painel_vidas = document.createElement('div')
    painel_vidas.setAttribute('id', 'painel_vidas')
    painel_vidas.classList.add('vidas')

    //Adiciona a nova div na tela
    document.getElementById('painel').insertAdjacentElement('afterbegin', painel_vidas)

    for (let i = 1; i <= vidas; i++) {
        let coracao = document.createElement('img')

        coracao.setAttribute('id', `v${i}`)
        coracao.setAttribute('src', '../img/coracao_cheio.png')
        
        document.getElementById('painel_vidas').appendChild(coracao)
    }
    
}

criarVidas(vidas)
// Cria uma contadora para as vidas
let contVidas = vidas

//cronometro
let tempo_restante = tempo
document.getElementById('tempo').innerText = tempo_restante

let cronometro = setInterval(() => {
    tempo_restante--
    if(tempo_restante < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('tempo').innerText = tempo_restante
    }
}, 1000)

function posicaoRandomica(){

    //Cria  o elemento da mosca, esse elemento vai sr manipulado direto aqui
    let mosca = document.createElement('img')
    mosca.setAttribute('id', 'mosca')
    mosca.setAttribute('src', '../img/mosca.png')

    //Verifica se o elemento já existe na tela
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove()

        
        document.getElementById('v'+contVidas).setAttribute('src', '../img/coracao_vazio.png')
        console.log('v'+contVidas)
        contVidas--

        if(contVidas == 0){
            window.location.href = 'fim_de_jogo.html'
            clearInterval()
        }
    }

    // Cria interação com o elemento
    mosca.addEventListener('click', () => {
        mosca.remove()
    })

    // Evite sempre os números mágicos ;)
    const tamMinMosca = 50
    const tamMaxMosca = 200
    const margemMoscaBordaDaTela = 40

    const tamanhoDaMosca = Math.floor(Math.random() * (tamMaxMosca - tamMinMosca) + tamMinMosca);

    let posicaoX = Math.abs(Math.floor(Math.random() * largura) - (tamanhoDaMosca + margemMoscaBordaDaTela))
    let posicaoY = Math.abs(Math.floor(Math.random() * altura) - (tamanhoDaMosca + margemMoscaBordaDaTela))

    //Tamanho da mosca
    mosca.style.width = tamanhoDaMosca + 'px'
    mosca.style.height = tamanhoDaMosca + 'px'

    //Posicao da mosca
    mosca.classList.add('mosca')
    mosca.style.position = 'absolute'
    mosca.style.top = posicaoY + 'px'
    mosca.style.left = posicaoX + 'px'

    //Inverte a mosca
    ladoAleatorio(mosca)

    document.body.appendChild(mosca)

    
}

function ladoAleatorio(mosca){
    let moscaInversa = Math.floor(Math.random() * 2)
    
    if(moscaInversa){
        mosca.style.transform = 'scaleX(-1)'
    }
}

let criaMosca = setInterval(() => {
    posicaoRandomica()
}, nivel.mosca)


}
// Aqui termina toda a função do jogo

// Aqui é resposável por pegar o nivel do jogo pela url
let nivel_url = window.location.search
nivel_url = nivel_url.replace('?', '')

let nivel_conf =  [
    {
        tempo: 30,
        vidas: 5,
        mosca: 1000
    },
    {
        tempo: 25,
        vidas: 3,
        mosca: 800
    },
    {
        tempo: 10,
        vidas: 1,
        mosca: 700
    }
]
console.log(nivel_conf[nivel_url])

mataMosca(nivel_conf[nivel_url])