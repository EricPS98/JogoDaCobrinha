let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // Tamanho de cada quadrado

let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function criarBG() {
    context.fillStyle = "lightgreen"; 
    context.fillRect(0, 0, 16 * box, 16 * box); // Posição de X, Y, Altura e Largura
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box); // Tamanho de X e Y definidos na linha 8 e 9 do código, e o tamanho de box definido na linha 32
    }
}

criarBG();
criarCobrinha();