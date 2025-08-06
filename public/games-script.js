// Sistema de minijuegos para ganar dinero
class GameSystem {
    constructor() {
        this.playerMoney = 1500;
        this.currentGame = null;
        this.earnings = [];
        this.init();
    }

    init() {
        this.loadPlayerData();
        this.updateMoneyDisplay();
        this.setupEventListeners();
    }

    loadPlayerData() {
        const savedMoney = localStorage.getItem('playerMoney');
        if (savedMoney) {
            this.playerMoney = parseInt(savedMoney);
        }
    }

    savePlayerData() {
        localStorage.setItem('playerMoney', this.playerMoney.toString());
        // También actualizar en la tienda
        if (window.opener) {
            window.opener.postMessage({
                type: 'updateMoney',
                money: this.playerMoney
            }, '*');
        }
    }

    updateMoneyDisplay() {
        document.getElementById('player-money').textContent = `$${this.playerMoney}`;
    }

    addEarning(amount, game, description) {
        this.playerMoney += amount;
        this.updateMoneyDisplay();
        this.savePlayerData();
        
        const earning = {
            amount,
            game,
            description,
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.earnings.unshift(earning);
        this.updateEarningsDisplay();
    }

    updateEarningsDisplay() {
        const list = document.getElementById('earnings-list');
        list.innerHTML = this.earnings.slice(0, 10).map(earning => `
            <div class="earning-item ${earning.amount > 0 ? 'win' : 'loss'}">
                ${earning.timestamp} - ${earning.game}: ${earning.description} 
                <strong>${earning.amount > 0 ? '+' : ''}$${earning.amount}</strong>
            </div>
        `).join('');
    }

    setupEventListeners() {
        document.getElementById('back-to-shop').addEventListener('click', () => {
            window.location.href = '/shop.html';
        });

        document.getElementById('logout-games').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userEmail');
                window.location.href = '/';
            }
        });

        document.getElementById('quit-game').addEventListener('click', () => {
            this.quitCurrentGame();
        });
    }

    quitCurrentGame() {
        if (this.currentGame) {
            this.currentGame.stop();
            this.currentGame = null;
        }
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('blackjack-game').style.display = 'none';
        document.querySelector('.games-selector').style.display = 'grid';
    }
}

// Juego Snake
class SnakeGame {
    constructor(gameSystem) {
        this.gameSystem = gameSystem;
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.nextDirection = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.moneyEarned = 0;
        this.gameLoop = null;
        this.isRunning = false;
        this.gameStarted = false;
    }

    start() {
        this.setupControls();
        this.isRunning = true;
        this.gameStarted = true;
        this.draw(); // Dibujar estado inicial
        this.updateDisplay();
        
        // Mostrar instrucciones
        this.showStartMessage();
        
        // Iniciar el loop del juego
        this.gameLoop = setInterval(() => this.update(), 200);
    }

    showStartMessage() {
        this.ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        this.ctx.fillRect(50, 150, 300, 100);
        this.ctx.fillStyle = '#000';
        this.ctx.font = '16px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Usa las flechas para moverte', 200, 180);
        this.ctx.fillText('Presiona cualquier flecha para empezar', 200, 200);
        this.ctx.fillText('¡Come la comida roja!', 200, 220);
    }

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        this.isRunning = false;
        this.gameStarted = false;
        // Remover event listeners
        document.removeEventListener('keydown', this.keyHandler);
    }

    setupControls() {
        // Crear función de manejo de teclas con bind para poder removerla después
        this.keyHandler = (e) => {
            if (!this.isRunning) return;
            
            let newDirection = {...this.direction};
            let validMove = false;
            
            switch(e.key) {
                case 'ArrowUp':
                    if (this.direction.y === 0) {
                        newDirection = {x: 0, y: -this.gridSize};
                        validMove = true;
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction.y === 0) {
                        newDirection = {x: 0, y: this.gridSize};
                        validMove = true;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction.x === 0) {
                        newDirection = {x: -this.gridSize, y: 0};
                        validMove = true;
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction.x === 0) {
                        newDirection = {x: this.gridSize, y: 0};
                        validMove = true;
                    }
                    break;
            }
            
            if (validMove) {
                this.nextDirection = newDirection;
                e.preventDefault();
            }
        };
        
        document.addEventListener('keydown', this.keyHandler);
    }

    update() {
        if (!this.gameStarted) return;
        
        // Actualizar dirección
        this.direction = {...this.nextDirection};
        
        // Si no se está moviendo, no actualizar
        if (this.direction.x === 0 && this.direction.y === 0) {
            this.draw();
            return;
        }
        
        // Calcular nueva posición de la cabeza
        const head = {
            x: this.snake[0].x + this.direction.x, 
            y: this.snake[0].y + this.direction.y
        };

        // Verificar colisiones con paredes
        if (head.x < 0 || head.x >= this.canvas.width || 
            head.y < 0 || head.y >= this.canvas.height) {
            this.gameOver();
            return;
        }

        // Verificar colisión con el cuerpo
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        // Agregar nueva cabeza
        this.snake.unshift(head);

        // Verificar si comió la comida
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.moneyEarned += 10;
            this.food = this.generateFood();
            this.gameSystem.addEarning(10, 'Snake', 'Comida consumida');
            // No remover la cola cuando come
        } else {
            // Remover la cola si no comió
            this.snake.pop();
        }

        this.draw();
        this.updateDisplay();
    }

    generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)) * this.gridSize,
                y: Math.floor(Math.random() * (this.canvas.height / this.gridSize)) * this.gridSize
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        
        return newFood;
    }

    draw() {
        // Limpiar canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar serpiente
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                // Cabeza - verde más brillante
                this.ctx.fillStyle = '#00ff00';
            } else {
                // Cuerpo - verde más oscuro
                this.ctx.fillStyle = '#008800';
            }
            this.ctx.fillRect(segment.x + 1, segment.y + 1, this.gridSize - 2, this.gridSize - 2);
        });

        // Dibujar comida
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(this.food.x + 1, this.food.y + 1, this.gridSize - 2, this.gridSize - 2);
        
        // Agregar brillo a la comida
        this.ctx.fillStyle = '#ff6666';
        this.ctx.fillRect(this.food.x + 3, this.food.y + 3, this.gridSize - 6, this.gridSize - 6);
    }

    gameOver() {
        this.stop();
        this.gameSystem.addEarning(-20, 'Snake', 'Game Over - Penalización');
        
        // Dibujar mensaje de game over
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        this.ctx.fillRect(50, 150, 300, 100);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', 200, 180);
        this.ctx.font = '16px Courier New';
        this.ctx.fillText(`Puntuación: ${this.score}`, 200, 200);
        this.ctx.fillText(`Dinero: $${this.moneyEarned - 20}`, 200, 220);
        
        setTimeout(() => {
            alert(`¡Game Over! Puntuación: ${this.score}\nDinero ganado: $${this.moneyEarned - 20}`);
        }, 100);
    }

    updateDisplay() {
        document.getElementById('score-display').textContent = `Puntos: ${this.score}`;
        document.getElementById('money-earned').textContent = `Dinero ganado: $${this.moneyEarned}`;
    }
}

// Juego Tetris
class TetrisGame {
    constructor(gameSystem) {
        this.gameSystem = gameSystem;
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.blockSize = 20;
        this.cols = 10;
        this.rows = 20;
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.currentPiece = null;
        this.score = 0;
        this.lines = 0;
        this.moneyEarned = 0;
        this.gameLoop = null;
        this.isRunning = false;
        this.dropTime = 0;
        this.dropInterval = 1000;
        
        this.pieces = [
            { shape: [[1,1,1,1]], color: '#0ff' }, // I
            { shape: [[1,1],[1,1]], color: '#ff0' }, // O
            { shape: [[0,1,0],[1,1,1]], color: '#800080' }, // T
            { shape: [[0,1,1],[1,1,0]], color: '#0f0' }, // S
            { shape: [[1,1,0],[0,1,1]], color: '#f00' }, // Z
            { shape: [[1,0,0],[1,1,1]], color: '#ffa500' }, // L
            { shape: [[0,0,1],[1,1,1]], color: '#00f' } // J
        ];
    }

    start() {
        this.setupControls();
        this.spawnPiece();
        this.isRunning = true;
        this.gameLoop = setInterval(() => this.update(), 50);
        this.updateDisplay();
        this.draw();
    }

    stop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        this.isRunning = false;
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.isRunning || !this.currentPiece) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    this.movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    this.movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    this.rotatePiece();
                    break;
            }
        });
    }

    spawnPiece() {
        const pieceType = this.pieces[Math.floor(Math.random() * this.pieces.length)];
        this.currentPiece = {
            shape: pieceType.shape,
            color: pieceType.color,
            x: Math.floor(this.cols / 2) - Math.floor(pieceType.shape[0].length / 2),
            y: 0
        };

        if (this.checkCollision(this.currentPiece)) {
            this.gameOver();
        }
    }

    update() {
        this.dropTime += 50;
        if (this.dropTime >= this.dropInterval) {
            this.movePiece(0, 1);
            this.dropTime = 0;
        }
        this.draw();
    }

    movePiece(dx, dy) {
        const newPiece = {...this.currentPiece, x: this.currentPiece.x + dx, y: this.currentPiece.y + dy};
        
        if (!this.checkCollision(newPiece)) {
            this.currentPiece = newPiece;
        } else if (dy > 0) {
            this.lockPiece();
        }
    }

    rotatePiece() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        
        const newPiece = {...this.currentPiece, shape: rotated};
        if (!this.checkCollision(newPiece)) {
            this.currentPiece = newPiece;
        }
    }

    checkCollision(piece) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x;
                    const newY = piece.y + y;
                    
                    if (newX < 0 || newX >= this.cols || newY >= this.rows) {
                        return true;
                    }
                    
                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lockPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardY = this.currentPiece.y + y;
                    const boardX = this.currentPiece.x + x;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }
        
        this.clearLines();
        this.spawnPiece();
    }

    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.cols).fill(0));
                linesCleared++;
                y++; // Revisar la misma línea otra vez
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            const points = linesCleared * 100 * linesCleared; // Bonus por combo
            const money = linesCleared * 5 + (linesCleared > 1 ? linesCleared * 2 : 0);
            this.score += points;
            this.moneyEarned += money;
            
            this.gameSystem.addEarning(money, 'Tetris', 
                `${linesCleared} línea${linesCleared > 1 ? 's' : ''} completada${linesCleared > 1 ? 's' : ''}`);
            this.updateDisplay();
        }
    }

    draw() {
        // Limpiar canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar tablero
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    this.ctx.fillStyle = this.board[y][x];
                    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, 
                                     this.blockSize - 1, this.blockSize - 1);
                }
            }
        }

        // Dibujar pieza actual
        if (this.currentPiece) {
            this.ctx.fillStyle = this.currentPiece.color;
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        this.ctx.fillRect(
                            (this.currentPiece.x + x) * this.blockSize,
                            (this.currentPiece.y + y) * this.blockSize,
                            this.blockSize - 1, this.blockSize - 1
                        );
                    }
                }
            }
        }
    }

    gameOver() {
        this.stop();
        alert(`¡Game Over! Puntuación: ${this.score}\nLíneas: ${this.lines}\nDinero ganado: $${this.moneyEarned}`);
    }

    updateDisplay() {
        document.getElementById('score-display').textContent = `Puntos: ${this.score} | Líneas: ${this.lines}`;
        document.getElementById('money-earned').textContent = `Dinero ganado: $${this.moneyEarned}`;
    }
}

// Juego de Blackjack
class BlackjackGame {
    constructor(gameSystem) {
        this.gameSystem = gameSystem;
        this.playerHand = [];
        this.dealerHand = [];
        this.deck = [];
        this.currentBet = 25;
        this.gameInProgress = false;
        this.playerStand = false;
        this.gameResult = '';
    }

    createDeck() {
        const suits = ['♠', '♥', '♦', '♣'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({ 
                    value, 
                    suit, 
                    numericValue: this.getCardValue(value)
                });
            }
        }

        return this.shuffleDeck(deck);
    }

    getCardValue(value) {
        if (value === 'A') return 11;
        if (['J', 'Q', 'K'].includes(value)) return 10;
        return parseInt(value);
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                aces++;
                value += 11;
            } else {
                value += card.numericValue;
            }
        }

        // Ajustar ases si es necesario
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }

        return value;
    }

    start() {
        if (this.gameSystem.playerMoney < this.currentBet) {
            alert('No tienes suficiente dinero para jugar al Blackjack. Necesitas $25.');
            return;
        }

        this.gameSystem.addEarning(-this.currentBet, 'Blackjack', 'Apuesta inicial');
        this.deck = this.createDeck();
        this.playerHand = [];
        this.dealerHand = [];
        this.playerStand = false;
        this.gameResult = '';
        this.gameInProgress = true;

        // Repartir cartas iniciales
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop());
        this.playerHand.push(this.deck.pop());
        this.dealerHand.push(this.deck.pop()); // Carta oculta del dealer

        this.setupBlackjackControls();
        this.updateBlackjackDisplay();
        this.displayCards();

        // Verificar blackjack natural
        if (this.calculateHandValue(this.playerHand) === 21) {
            this.playerStand = true;
            this.dealerPlay();
        }
    }

    setupBlackjackControls() {
        document.getElementById('hit-btn').onclick = () => this.hit();
        document.getElementById('stand-btn').onclick = () => this.stand();
        document.getElementById('double-btn').onclick = () => this.doubleDown();
        document.getElementById('new-game-btn').onclick = () => this.start();
    }

    hit() {
        if (!this.gameInProgress || this.playerStand) return;

        this.playerHand.push(this.deck.pop());
        this.displayCards();

        const playerValue = this.calculateHandValue(this.playerHand);
        if (playerValue > 21) {
            this.endGame('bust');
        } else if (playerValue === 21) {
            this.stand();
        }
    }

    stand() {
        if (!this.gameInProgress) return;
        
        this.playerStand = true;
        this.dealerPlay();
    }

    doubleDown() {
        if (!this.gameInProgress || this.playerHand.length !== 2) return;
        if (this.gameSystem.playerMoney < this.currentBet) {
            alert('No tienes suficiente dinero para doblar.');
            return;
        }

        this.gameSystem.addEarning(-this.currentBet, 'Blackjack', 'Doblar apuesta');
        this.currentBet *= 2;
        this.hit();
        
        if (this.calculateHandValue(this.playerHand) <= 21) {
            this.stand();
        }
    }

    dealerPlay() {
        // Revelar carta oculta del dealer
        this.displayCards(true);

        const dealerAction = () => {
            const dealerValue = this.calculateHandValue(this.dealerHand);
            
            if (dealerValue < 17) {
                this.dealerHand.push(this.deck.pop());
                this.displayCards(true);
                setTimeout(dealerAction, 1000);
            } else {
                this.endGame('compare');
            }
        };

        setTimeout(dealerAction, 1000);
    }

    endGame(result) {
        this.gameInProgress = false;
        const playerValue = this.calculateHandValue(this.playerHand);
        const dealerValue = this.calculateHandValue(this.dealerHand);
        let winnings = 0;
        let message = '';

        switch (result) {
            case 'bust':
                message = `¡Te pasaste! (${playerValue}). Perdiste $${this.currentBet}`;
                break;
            case 'compare':
                if (dealerValue > 21) {
                    winnings = this.currentBet * 2;
                    message = `¡Dealer se pasó! (${dealerValue}). Ganaste $${this.currentBet}`;
                } else if (playerValue > dealerValue) {
                    winnings = this.currentBet * 2;
                    message = `¡Ganaste! ${playerValue} vs ${dealerValue}. Ganaste $${this.currentBet}`;
                } else if (playerValue < dealerValue) {
                    message = `Perdiste. ${playerValue} vs ${dealerValue}. Perdiste $${this.currentBet}`;
                } else {
                    winnings = this.currentBet;
                    message = `¡Empate! ${playerValue} vs ${dealerValue}. Recuperaste tu apuesta.`;
                }
                break;
        }

        if (winnings > 0) {
            this.gameSystem.addEarning(winnings, 'Blackjack', 
                winnings > this.currentBet ? '¡Partida ganada!' : 'Empate - apuesta devuelta');
        }

        document.getElementById('game-result').textContent = message;
        this.currentBet = 25; // Resetear apuesta
        
        setTimeout(() => alert(message), 500);
    }

    displayCards(showDealerHidden = false) {
        // Cartas del jugador
        const playerContainer = document.getElementById('player-cards');
        playerContainer.innerHTML = this.playerHand.map(card => `
            <div class="card">
                <div class="card-number">${card.value}</div>
                <div class="card-suit">${card.suit}</div>
            </div>
        `).join('');

        // Cartas del dealer
        const dealerContainer = document.getElementById('dealer-cards');
        dealerContainer.innerHTML = this.dealerHand.map((card, index) => {
            if (index === 1 && !showDealerHidden && this.gameInProgress) {
                return `<div class="card card-back">🂠</div>`;
            }
            return `
                <div class="card">
                    <div class="card-number">${card.value}</div>
                    <div class="card-suit">${card.suit}</div>
                </div>
            `;
        }).join('');

        // Actualizar valores
        const playerValue = this.calculateHandValue(this.playerHand);
        document.getElementById('player-value').textContent = playerValue;
        
        if (showDealerHidden || !this.gameInProgress) {
            const dealerValue = this.calculateHandValue(this.dealerHand);
            document.getElementById('dealer-value').textContent = dealerValue;
        } else {
            document.getElementById('dealer-value').textContent = '?';
        }
    }

    updateBlackjackDisplay() {
        document.getElementById('current-bet-bj').textContent = this.currentBet;
    }
}

// Inicialización global
let gameSystem;
let snakeGame;
let tetrisGame;
let blackjackGame;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticación
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert('Debes iniciar sesión para acceder a los juegos');
        window.location.href = '/';
        return;
    }

    gameSystem = new GameSystem();
    
    // Escuchar mensajes de la tienda
    window.addEventListener('message', function(event) {
        if (event.data.type === 'requestMoney') {
            event.source.postMessage({
                type: 'updateMoney',
                money: gameSystem.playerMoney
            }, '*');
        }
    });
});

function startGame(gameType) {
    document.querySelector('.games-selector').style.display = 'none';
    
    switch(gameType) {
        case 'snake':
            document.getElementById('game-area').style.display = 'block';
            document.getElementById('game-title').textContent = '🐍 Snake';
            document.getElementById('game-canvas').width = 400;
            document.getElementById('game-canvas').height = 400;
            snakeGame = new SnakeGame(gameSystem);
            gameSystem.currentGame = snakeGame;
            snakeGame.start();
            break;
            
        case 'tetris':
            document.getElementById('game-area').style.display = 'block';
            document.getElementById('game-title').textContent = '🧩 Tetris';
            document.getElementById('game-canvas').width = 200;
            document.getElementById('game-canvas').height = 400;
            tetrisGame = new TetrisGame(gameSystem);
            gameSystem.currentGame = tetrisGame;
            tetrisGame.start();
            break;
            
        case 'blackjack':
            document.getElementById('blackjack-game').style.display = 'block';
            blackjackGame = new BlackjackGame(gameSystem);
            gameSystem.currentGame = blackjackGame;
            blackjackGame.start();
            break;
    }
}
