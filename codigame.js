// --- Seleção dos Elementos do DOM (Document Object Model) ---
//"Ponte" entre o JS e o HTML
// As constantes criam referências aos elementos HTML com base em seus IDs e classes.
// Isso torna o código mais limpo e fácil de manipular esses elementos.
const screens = document.querySelectorAll('.screen');
const startScreen = document.getElementById('start-screen'); // Faz a busca por todos os elementos que têm a classe CSS .screen"
const rulesScreen = document.getElementById('rules-screen'); // Seleciona o elemento com o ID "rules-screen".
const gameScreen = document.getElementById('game-screen'); // Seleciona o elemento com o ID "game-screen".
const scoreScreen = document.getElementById('score-screen'); // Seleciona o elemento com o ID "score-screen".
const endScreen = document.getElementById('end-screen'); // Seleciona o elemento com o ID "end-screen".
const questionBox = document.getElementById('question-box'); // Seleciona o elemento com o ID "question-box".
const startBtn = document.getElementById('start-btn'); // Seleciona o botão com o ID "start-btn".
const rulesBtn = document.getElementById('rules-btn'); // Seleciona o botão com o ID "rules-btn".
const backToStartBtn = document.getElementById('back-to-start-btn'); // Seleciona o botão com o ID "back-to-start-btn".
const playBtn = document.getElementById('play-btn'); // Seleciona o botão com o ID "play-btn".
const rollDiceBtn = document.getElementById('roll-dice-btn'); // Seleciona o botão com o ID "roll-dice-btn".
const showScoreBtn = document.getElementById('show-score-btn'); // Seleciona o botão com o ID "show-score-btn".
const backToGameBtn = document.getElementById('back-to-game-btn'); // Seleciona o botão com o ID "back-to-game-btn".
const restartBtn = document.getElementById('restart-btn'); // Seleciona o botão com o ID "restart-btn".
// Seleciona o botão de reiniciar na tela final
const restartEndBtn = document.getElementById('restart-end-btn'); // Seleciona o botão de reiniciar na tela final.
const diceValueElement = document.getElementById('dice-value'); // Seleciona o elemento para exibir o valor do dado.
const boardElement = document.getElementById('board'); // Seleciona o elemento do tabuleiro.
const currentPlayerNameElement = document.getElementById('current-player-name'); // Seleciona o elemento para exibir o nome do jogador atual.
const currentPositionElement = document.getElementById('current-position'); // Seleciona o elemento para exibir a posição do jogador atual.
const scorePlayer1Element = document.getElementById('score-player1'); // Seleciona o elemento para exibir a pontuação do jogador 1.
const scorePlayer2Element = document.getElementById('score-player2'); // Seleciona o elemento para exibir a pontuação do jogador 2.
const winnerNameElement = document.getElementById('winner-name'); // Seleciona o elemento para exibir o nome do vencedor.
const finalScoreElement = document.getElementById('final-score'); // Seleciona o elemento para exibir a pontuação final.
const questionText = document.getElementById('question-text'); // Seleciona o elemento para o texto da pergunta.
const optionButtons = document.querySelectorAll('.option-btn'); // Seleciona todos os botões de opção de resposta.

// --- Variáveis de Estado do Jogo ---
// Estas variáveis controlam o estado atual do jogo.
let playerPositions = [0, 0]; // Posição dos jogadores (índice 0 para Jogador 1, 1 para Jogador 2).
let scores = [0, 0]; // Pontuação dos jogadores.
let currentPlayer = 0; // O jogador atual, 0 (Jogador 1) ou 1 (Jogador 2).
const totalCells = 16; // O número total de casas no tabuleiro.
// As casas que contêm perguntas (o número corresponde à casa no tabuleiro).
const questionCells = [2, 4, 6, 9, 11, 13, 14];
// Array com as perguntas e respostas do jogo.
const questions = [
    {
        question: "Quem é a irmã mais velha em Frozen?",
        options: ["Anna", "Elsa", "Olaf"],
        answer: "Elsa"
    },
    {
        question: "Qual é o nome do boneco de neve que adora abraços quentinhos?",
        options: ["Sven", "Kristoff", "Olaf"],
        answer: "Olaf"
    },
    {
        question: "Qual música famosa Elsa canta no primeiro filme?",
        options: ["Vou Fazer o que quiser", "Livre Estou", "O Amor É Uma Porta Aberta"],
        answer: "Livre Estou"
    },
    {
        question: "Qual animal é o companheiro leal de Kristoff?",
        options: ["Um urso", "Uma rena", "Um lobo"],
        answer: "Uma rena"
    },
    {
        question: "Em que reino se passa a história de Frozen?",
        options: ["Arendelle", "Corona", "Atlantica"],
        answer: "Arendelle"
    },
    {
        question: "Qual é o nome do príncipe que Anna conhece no início do filme?",
        options: ["Hans", "Flynn Rider", "Eric"],
        answer: "Hans"
    },
    {
        question: "Quem estava no navio que naufragou no mar sombrio?",
        options: ["Honeymaren e Ryder", "Tenente Matias e Yelena", "O rei e a rainha de Arendelle"],
        answer: "O rei e a rainha de Arendelle"
    }
];
let usedQuestionIndexes = []; // Garante que as perguntas não se repitam.

// --- Funções de Lógica do Jogo ---

    /**Esconde todas as telas e exibe a tela selecionada.
 @param {HTMLElement} screen  /*O elemento da tela que deve ser exibido.*/

function showScreen(screen) { // Define uma função para exibir uma tela específica.

      // Itera sobre todas as telas e adiciona a classe 'hidden' para escondê-las.
    screens.forEach(s => s.classList.add('hidden')); 
    screen.classList.remove('hidden'); // Remove a classe 'hidden' da tela que deve ser exibida.
}

    // Cria o tabuleiro dinamicamente e adiciona as classes para as imagens intercaladas.
function createBoard() {
    boardElement.innerHTML = ''; // Limpa o tabuleiro antes de criar
    for (let i = 1; i <= totalCells; i++) {  // Inicia um loop para criar cada casa do tabuleiro.
        const cell = document.createElement('div');
        cell.classList.add('board-cell');  // Adiciona a classe CSS 'board-cell' para estilização.
        cell.textContent = i; // Define o número da casa como o texto.

        // Adiciona a classe de pergunta se a casa for uma das casas de pergunta.
        if (questionCells.includes(i)) {  // Verifica se a casa atual está na lista de casas de pergunta.
            cell.classList.add('question-cell'); // Adiciona a classe 'question-cell' se for uma casa de pergunta.
        }

        // Lógica para intercalar as classes a cada linha, criando o efeito de xadrez
        // Calcula o número da linha (de 1 a 4)
        const row = Math.ceil(i / 4);
        if (row % 2 === 0) {
            // Linhas pares (2 e 4) - ordem de cores invertida
            if (i % 2 !== 0) {
                cell.classList.add('even-cell');
            } else {
                cell.classList.add('odd-cell');
            }
        } else {
            // Linhas ímpares (1 e 3) - ordem de cores normal
            if (i % 2 !== 0) {
                cell.classList.add('odd-cell');
            } else {
                cell.classList.add('even-cell');
            }
        }

        boardElement.appendChild(cell); // Adiciona a casa criada ao elemento do tabuleiro.
    }
}

    // Atualiza a posição dos jogadores no tabuleiro, adicionando as imagens nas posições do tabuleiro.
function updateBoard() {
    const cells = document.querySelectorAll('.board-cell'); // Seleciona todas as casas do tabuleiro.

    // Remove as imagens existentes de todas as casas
    cells.forEach(cell => {  // Remove as imagens existentes de todas as casas.
        const existingImages = cell.querySelectorAll('.player-image');
        existingImages.forEach(img => img.remove());
    });

    // Adiciona a imagem do Jogador 1 na posição correta
    if (playerPositions[0] > 0) {
        const player1Image = document.createElement('img');
        player1Image.src = 'https://www.pngarts.com/files/10/Frozen-Elsa-Free-PNG-Image.png';
        player1Image.alt = 'Elsa, Anna e Olaf';
        player1Image.classList.add('player-image', 'player1-image');
        // A posição no array é 'posição - 1'
        cells[playerPositions[0] - 1].appendChild(player1Image);
    }

    // Adiciona a imagem do Jogador 2 na posição correta
    if (playerPositions[1] > 0) {
        const player2Image = document.createElement('img');
        player2Image.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/416474ba-7818-4241-8e82-32a7caded352/dgg8u87-da6447a0-e85d-4bd0-9756-cf328f16d8fb.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQxNjQ3NGJhLTc4MTgtNDI0MS04ZTgyLTMyYTdjYWRlZDM1MlwvZGdnOHU4Ny1kYTY0NDdhMC1lODVkLTRiZDAtOTc1Ni1jZjMyOGYxNmQ4ZmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1l-1lFcoqlviD-KVsXFeixYtRxAJJldQ7cV4peUgPHs';
        player2Image.alt = 'Kristoff e Sven';
        player2Image.classList.add('player-image', 'player2-image');
        // A posição no array é 'posição - 1'
        cells[playerPositions[1] - 1].appendChild(player2Image);
    }

    // Exibe a posição do jogador atual.
    currentPositionElement.textContent = playerPositions[currentPlayer];
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Simula a rolagem de um dado (número de 1 a 6). 
    diceValueElement.textContent = diceRoll;
    rollDiceBtn.disabled = true; // Desabilita o botão para evitar cliques múltiplos.
    setTimeout(() => movePlayer(diceRoll), 1000); // Espera 1 segundo e então chama a função movePlayer.
}

    // Função para criar e adicionar um floco de neve de forma dinâmica.
function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Define um tamanho aleatório para o floco de neve (entre 5 e 12 pixels).
    const size = Math.random() * 10 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Define uma posição horizontal aleatória na tela.
    const startPosition = Math.random() * 100;
    snowflake.style.left = `${startPosition}vw`;
    
    // Define um deslocamento vertical aleatório para que os flocos não se acumulem no início da tela. 
    // Isso dá a impressão que eles já estão "caindo" ao carregar a página.
    const initialTopOffset = Math.random() * -100; // Valor entre -100 e 0
    snowflake.style.top = `${initialTopOffset}vh`;

    // Define a duração e o atraso da animação de forma aleatória para um efeito natural.
    const duration = Math.random() * 10 + 5; // Duração entre 5 e 15 segundos.
    const delay = Math.random() * 5; // Atraso de até 5 segundos.
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;

    // Adiciona o floco de neve ao contêiner
    snowContainer.appendChild(snowflake);
}

// Cria um número de flocos de neve. Ajuste este valor se quiser mais ou menos neve.
const numberOfSnowflakes = 100;
for (let i = 0; i < numberOfSnowflakes; i++) {
    createSnowflake();
}

/** Move o jogador atual com base no valor do dado.
 * Adiciona pontos por cada casa andada.
 * @param {number} steps O número de casas para mover. */

// Define a função para mover o jogador.
function movePlayer(steps) {
    const newPosition = playerPositions[currentPlayer] + steps; // Calcula a nova posição.
    // Atualiza a posição do jogador, garantindo que não passe do final.
    playerPositions[currentPlayer] = Math.min(newPosition, totalCells); 
    
    // Adiciona pontos com base no número de casas andadas (1 ponto por casa).
    scores[currentPlayer] += steps;
    
    updateBoard(); // Atualiza a visualização do tabuleiro.
    
    if (playerPositions[currentPlayer] === totalCells) { // Verifica se o jogador chegou à última casa.
        endGame();
        return;
    }
    
    // Verifica se a nova posição é uma casa de pergunta
    if (questionCells.includes(playerPositions[currentPlayer])) {
        showQuestion();
    } else {
        switchPlayer(); // Se não for, passa a vez para o próximo jogador
    }
}

// Define a função para trocar a vez do jogador.
function switchPlayer() { 
    currentPlayer = 1 - currentPlayer;  // Alterna o valor de currentPlayer entre 0 e 1.

    // Nome do personagem correspondente
    if (currentPlayer === 0) { // Atualiza o nome do jogador na tela.
        currentPlayerNameElement.textContent = 'Elsa, Anna e Olaf';
    } else {
        currentPlayerNameElement.textContent = 'Kristoff e Sven';
    }
    rollDiceBtn.disabled = false;  // Habilita o botão do dado para o próximo jogador.
    updateBoard();  // Atualiza a visualização do tabuleiro.
}

/** Exibe a tela de perguntas e carrega uma pergunta aleatória.*/
function showQuestion() {
    let questionIndex;

     // Escolhe um índice de pergunta aleatório que ainda não foi usado.
    do { 
        questionIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestionIndexes.includes(questionIndex));
    usedQuestionIndexes.push(questionIndex);  // Adiciona o índice da pergunta usada ao array.
    if (usedQuestionIndexes.length === questions.length) { // Se todas as perguntas foram usadas, reseta a lista de perguntas usadas.
        usedQuestionIndexes = []; 
    }
    const currentQuestion = questions[questionIndex];  // Pega o objeto da pergunta.
    questionText.textContent = currentQuestion.question;  // Exibe o texto da pergunta.
    const shuffledOptions = shuffleArray([...currentQuestion.options]); // Embaralha as opções de resposta.
    optionButtons.forEach((btn, index) => {  // Itera sobre os botões de opção.
        btn.textContent = shuffledOptions[index]; // Define o texto do botão para a opção embaralhada.
        btn.onclick = () => checkAnswer(shuffledOptions[index], currentQuestion.answer); // Define a função a ser chamada quando o botão for clicado.
    });
    showScreen(questionBox); // Exibe a tela da pergunta.
    rollDiceBtn.disabled = true; // Desabilita o botão do dado enquanto a pergunta é respondida.
}

/** Verifica se a resposta selecionada está correta e atualiza a pontuação.
 * Adiciona 2 pontos por uma resposta correta.
 * @param {string} selectedOption A opção escolhida pelo jogador.
 * @param {string} correctAnswer A resposta correta da pergunta.*/

// Define a função para verificar a resposta.
function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Adiciona 2 pontos para uma resposta correta.
        scores[currentPlayer] += 2;
        alert("Resposta correta! Você ganhou mais 2 pontos.");
    } else {
        // A regra de não ganhar pontos por resposta incorreta já é a lógica padrão.
        alert(`Resposta incorreta. A resposta correta era: ${correctAnswer}.`);
    }
    showScreen(gameScreen); // Volta para a tela do jogo.
    switchPlayer(); // Troca a vez do jogador.
}

/** Embaralha um array usando o algoritmo de Fisher-Yates.
 * @param {Array} array O array a ser embaralhado.
 * @returns {Array} O array embaralhado. */

// Define a função para embaralhar um array.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { // Itera de trás para frente.
        const j = Math.floor(Math.random() * (i + 1)); // Gera um índice aleatório.
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição.
    }
    return array;
}

/* * Atualiza o placar na tela. */
function updateScores() {
    scorePlayer1Element.textContent = scores[0];
    scorePlayer2Element.textContent = scores[1];
}

/* * Encerra o jogo e exibe a tela de fim de jogo.
 * O primeiro jogador a chegar ao final vence, dessa forma não existindo empate por placar. */
function endGame() {
    // O jogador que chegar ao final primeiro é o vencedor.
    const winnerName = currentPlayer === 0 ? 'Elsa, Anna e Olaf' : 'Kristoff e Sven';  // Determina o nome do vencedor.
    winnerNameElement.textContent = `Incrível!! ${winnerName} venceram o jogo!`;  // Exibe a mensagem de vitória.
     // Exibe a pontuação final.
    finalScoreElement.textContent = `Placar Final: Elsa, Anna e Olaf: ${scores[0]}, Kristoff e Sven: ${scores[1]}`;
    showScreen(endScreen); // Exibe a tela final.
}

// Reinicia todas as variáveis e a interface do jogo para o estado inicial.
function resetGame() {
    playerPositions = [0, 0]; 
    scores = [0, 0];
    currentPlayer = 0;
    usedQuestionIndexes = []; // Reseta todas as variáveis de estado.
    currentPlayerNameElement.textContent = 'Elsa, Anna e Olaf';  // Define o nome do jogador inicial.
    diceValueElement.textContent = '?'; // Reseta o valor do dado.
    createBoard(); 
    updateBoard(); // Recria e atualiza o tabuleiro.
}

// --- Event Listeners dos Botões ---
// Adiciona um "ouvinte" para o clique de cada botão, chamando assim a função apropriada.
startBtn.addEventListener('click', () => { // Quando o botão 'startBtn' é clicado, reseta o jogo e mostra a tela do jogo.
    resetGame(); 
    showScreen(gameScreen);
});

rulesBtn.addEventListener('click', () => { // Quando 'rulesBtn' é clicado, mostra a tela de regras.
    showScreen(rulesScreen);
});

backToStartBtn.addEventListener('click', () => { // Quando 'backToStartBtn' é clicado, volta para a tela inicial.
    showScreen(startScreen);
});

playBtn.addEventListener('click', () => { // Quando 'playBtn' é clicado, reseta o jogo e mostra a tela do jogo.
    resetGame();
    showScreen(gameScreen);
    rollDiceBtn.disabled = false;
});

rollDiceBtn.addEventListener('click', rollDice); // Quando 'rollDiceBtn' é clicado, chama a função rollDice.

showScoreBtn.addEventListener('click', () => { // Quando 'showScoreBtn' é clicado, atualiza o placar e mostra a tela de placar.
    updateScores();
    showScreen(scoreScreen);
});

backToGameBtn.addEventListener('click', () => { // Quando 'backToGameBtn' é clicado, volta para a tela do jogo.
    showScreen(gameScreen);
});

// Quando 'restartBtn' é clicado, reseta o jogo e volta para a tela inicial.
restartBtn.addEventListener('click', () => { 
    resetGame();
    showScreen(startScreen);
});

//Listener para o botão de reiniciar na tela final.
restartEndBtn.addEventListener('click', () => { // Quando 'restartEndBtn' é clicado, reseta o jogo e volta para a tela inicial.

    resetGame();
    showScreen(startScreen);
});

// --- Inicialização do Jogo ---
// Quando a página é carregada, esta linha é executada para exibir a tela inicial.
showScreen(startScreen);
