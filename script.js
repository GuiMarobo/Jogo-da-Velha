const celulas = document.querySelectorAll(".cell");
const mensagemStatus = document.getElementById("status-message");
const botaoReiniciar = document.getElementById("restart-button");

// tabuleiro do jogo, inicialmente vazio
let tabuleiroJogo = ["", "", "", "", "", "", "", "", ""];
// jogador atual, começando com X
let jogadorAtual = "X";
// fala se o jogo está ativo ou se já terminou
let jogoAtivo = true;

// Condições de vitória para o Jogo da Velha
const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cliqueCelula(eventoClique) {
    const celulaClicada = eventoClique.target;
    const indiceCelulaClicada = parseInt(celulaClicada.getAttribute("data-cell-index"));

    if (tabuleiroJogo[indiceCelulaClicada] !== "" || !jogoAtivo) {
        return;
    }

    // Preenche a célula com a marca do jogador atual
    tabuleiroJogo[indiceCelulaClicada] = jogadorAtual;
    celulaClicada.innerHTML = jogadorAtual;

    verificarResultado();
}

// Função para verificar o resultado do jogo (vitória ou empate)
function verificarResultado() {
    let rodadaVencida = false;
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const condicaoVitoria = condicoesVitoria[i];
        let a = tabuleiroJogo[condicaoVitoria[0]];
        let b = tabuleiroJogo[condicaoVitoria[1]];
        let c = tabuleiroJogo[condicaoVitoria[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            rodadaVencida = true;
            break;
        }
    }

    // se tiver vencedor
    if (rodadaVencida) {
        mensagemStatus.innerHTML = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
        return;
    }

    // velha / empate
    let rodadaEmpate = !tabuleiroJogo.includes("");
    if (rodadaEmpate) {
        mensagemStatus.innerHTML = `Empate!`;
        jogoAtivo = false;
        return;
    }

    // troca o jogador
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    mensagemStatus.innerHTML = `É a vez do jogador ${jogadorAtual}`;
}

function reiniciarJogo() {
    tabuleiroJogo = ["", "", "", "", "", "", "", "", ""];
    jogadorAtual = "X";
    jogoAtivo = true;
    mensagemStatus.innerHTML = `É a vez do jogador ${jogadorAtual}`;
    celulas.forEach(celula => celula.innerHTML = "");
}

celulas.forEach(celula => celula.addEventListener("click", cliqueCelula));
botaoReiniciar.addEventListener("click", reiniciarJogo);

mensagemStatus.innerHTML = `É a vez do jogador ${jogadorAtual}`;


