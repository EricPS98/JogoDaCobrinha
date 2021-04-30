let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // Tamanho de cada quadrado

let snake = [];

snake[0] = {
    x: 8 * box, //x -> direção horizontal (esquerda e direita)
    y: 8 * box //y -> direção vertical (cima e baixo)
}

let direction = "right";
let food = { //Comida aparecerá em lugares ramdômicos sem ultrapassar o tamanho da tela
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

let score = 0;

function criarBG() {
    context.fillStyle = "lightgreen"; 
    context.fillRect(0, 0, 16 * box, 16 * box); // Posição de X, Y, Altura e Largura
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box); // Tamanho de X e Y definidos na linha 8 e 9 do código, e o tamanho de box definido na linha 32
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); // Captura a tecla de seta para baixo do teclado e chama a função update

function update(event){
    //Numero do código:
    // 37 -> direita
    // 38 -> baixo 
    // 39 -> esquerda
    // 40 -> cima

    //A direção não pode ser oposta, se não ela recebe 2 cabeças ao voltar pra trás 
    //Ela só muda a direção, se a direção anterior não for oposta

    if(event.keyCode == 37  && direction != "right") { //Se o botão for 37 e a direção não for direita, a direção muda para esquerda
        direction = "left";
    } 
    if(event.keyCode == 38 && direction != "down") {
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left") {
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function iniciarJogo() {
    //Condição para a cobrinha não sumir da tela (voltar para a tela pela direção oposta)
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box;
    }

    for (i =  1; i < snake.length; i++){ //Começa da posição 1 (cabeça da cobrinha)
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){ //Posição X[i] e Y[i] significa qualquer parte corpo da cobrinha
            clearInterval(jogo);
            alert("Game over ;(");
            alert("Voce comeu " + score + " frutas");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Acrescenta e diminui um "box" dependendo da direção em que a cobrinha estiver andando
    if (direction == "right") {
        snakeX += box;
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "up") {
        snakeY -= box;
    }
    if (direction == "down") {
        snakeY += box;
    }

    //Cobrinha não cresce se não passar na comida, se passar, cresce 1 "Box"
    if (snakeX != food.x || snakeY != food.y) {
        //Retira o ultimo "box" da cobrinha (array)
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score ++;
        console.log(score);
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}


let jogo = setInterval(iniciarJogo, 200); //Intervalo de 200milissegundos para iniciar o jogo / dar continuidade caso travar

