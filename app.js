//Para que el html5 cargue antes del script que está creado en index
document.addEventListener('DOMContentLoaded', () =>{
    //Pickeamos el primer elemento, en este caso el pajarito, lo dejamos en const para poder usarlo después
    const bird = document.querySelector('.bird')
    //Pickeamos tambien el game-container
    const gameDisplay = document.querySelector('.game-container')
    //Pickeamos también el ground
    const ground = document.querySelector('.ground')
    //Pickeamos sky
    const sky = document.querySelector('.sky')

    //Acá dejamos nuestro flappy bird en el centro del cielo 
    /* Añadimos espacio entre la izquierda del cielo y la izquierda de flappy bird*/ 
    let birdLeft = 220
    let birdBottom = 100

    let gravity = 2

    //Si el juego está terminado
    isGameOver = false

    //Espacio entre los tubos
    let gap = 430 

    //Variable para score, parte en 0 y se incrementa a medida que vas pasando los tubos
    var gameScore = 0
    
    //Function btn

    //Función para agregar los cambios de style
    function startGame(){   
        gameScore += 1
        //Contador de Score
        document.getElementById('score').innerHTML = "Score: " + gameScore;
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    //Set interval para ejecutar otra y otra vez para que parezca que está volando
    let gameTimerId = setInterval(startGame,20)


    //Función para que no salte con cualquier tecla
    function control(e){
        //keyCode===32 porque 32 es la barra espacio
        if(e.keyCode === 32){
            jump()
        }
    }

    //Función para que flappy bird salte
    function jump(){
        //Para que el flappy llegue a volar hasta un punto
        if(birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    //Presionando la tecla, permitirá a flappy bird saltar
    document.addEventListener('keyup', control)

    //Generando los obstaculos del flappybird
    function generateObstacle(){
        let obstacleLeft = 500
        //Queremos que los obstaculos se generen aleatoriamente en tamaño
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        //Creando un div para las barritas de obstaculos
        const obstacle = document.createElement('div')
        //Lo mismo para las barritas de arriba
        const topObstacle = document.createElement('div')
        //Si el juego no está terminado seguimos creando obstaculos
        if(!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        //Ponemos los obstaculos dentro de game-container
        gameDisplay.appendChild(obstacle)
        //Ponemos los obstaculos de arriba dentro del game-container
        gameDisplay.appendChild(topObstacle)
        //Lo coloamos en la posición donde tienen que ir las barritas (arriba del piso)
        obstacle.style.left = obstacleLeft +'px'
        obstacle.style.bottom = obstacleBottom +'px'
        //Lo mismo para topObstacle
        topObstacle.style.left = obstacleLeft +'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        //Moviendo los obstaculos
        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            //Para que se mueva el de arriba
            topObstacle.style.left = obstacleLeft +'px'
            //Para que desaparezca y pare el obstaculo cuando llegue al final del grid
            if(obstacleLeft === -60){
                //Limpiamos el historial para que pause el obstaculo
                clearInterval(timerId)
                //Removemos el child para que desaparezca el obstaculo
                gameDisplay.removeChild(obstacle)
                //Lo mismo para el de arriba
                gameDisplay.removeChild(topObstacle)
            }

            //Determina si el pajaro esta en el suelo
            if(birdBottom < 80) {
                gameOver()
                clearInterval(timerId)
            }

            //Determina si el pajaro esta pasando a travez de un tubo
            else if(obstacleLeft < birdLeft + 60 && obstacleLeft > 160) {

                //Determina si el pajaro esta tocando el tubo de arriba o el tubo de abajo
                if(birdBottom + 45 > obstacleBottom + gap || birdBottom < obstacleBottom + 300) {
                    gameOver()
                    clearInterval(timerId)
                }
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        //Generamos nuevos obstaculos cuando el obstaculo principal se fue del grid
        if(!isGameOver)setTimeout(generateObstacle, 3000)
    }
    generateObstacle()


    //Funcion gameOver()
    function gameOver(){
        clearInterval(gameTimerId)
        alert('Game Over :(')
        console.log('Game Over :(')
        isGameOver = true
        //Ya no podremos apretar espacio para subir porque se acabó el juego
        document.removeEventListener('keyup', control)
        //Para que se pause  el ground cuando perdemos el juego
        ground.classList.add('ground')
        ground.classList.remove('animation')
    }

})
