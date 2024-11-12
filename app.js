/**
 * Botão do pânico
 * @author Vitor de Assis
 */

// Variáveis e constantes
const botao = document.getElementById('botao')
const imgLamp = document.getElementById('imgLamp')


// Pré carregamentos
// Som
let som = new Audio('sound/Alarm.mp3')

// Comandos Lanterna
inicializarLanterna()

// Lanterna(TORCH) async: faz com que a função rode e background
async function inicializarLanterna() {
    // try-catch (tratamento de exceções)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })

        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

// Ligar Lanterna
async function ligarLanterna() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

// Desligar Lanterna
// Função para desligar a lanterna sem parar o stream
async function desligarLanterna() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}



// Comandos MOUSE *

// Mousedown:
botao.addEventListener('mousedown', (event) => {
    event.preventDefault() //Ignorar o comportamento padrão
    console.log("Botão pressionado")
    som.play()

    do {
        ligarLanterna()
        desligarLanterna()
    } while (botao === mousedown);
})

// Mouseup:
botao.addEventListener('mouseup', (event) => {
    event.preventDefault() //Ignorar o comportamento padrão
    console.log("Botão despressionado")
    som.pause()
})