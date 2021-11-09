var matrice = []
var sizeX = 5
var sizeY = 12
var sizeLato = 50
var mosse = 0
var gameEnded = false
var livello = 1
var hIniz, mIniz, sIniz


function setup() {
    createCanvas(sizeLato*sizeX, sizeLato*sizeY)
    hIniz = hour()
    mIniz = minute()
    sIniz = second()
    initMatrix()
    createLevel()
    showNewLevelLable()
}

function draw() {
    if (!gameEnded && livello != 11)
        drawMatrix()
    else if (gameEnded && livello != 11) {
        initMatrix()
        createLevel()
        gameEnded = false
    }
    
    showSpeedRunTime()
    if(gameEnded && livello == 11) {
    }
    else {
        showNewLevelLable()
    }
}

function drawMatrix() {
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            if (matrice[i][j])
                fill(0, 255, 0)
            else
                fill(255, 255, 0)
            strokeWeight(0.2)
            rect(i*sizeLato, j*sizeLato, sizeLato, sizeLato)
        }
    }
}

function initMatrix() {
    for (let i = 0; i < sizeX; i++) {
        matrice[i] = []
        for (let j = 0; j < sizeY; j++) {
            matrice[i][j] = true
        
    }
}

function mod(a, b) {
    if (a < 0)
        return a+b
    else
        return a%b
}

function touchStarted() {
    cellaX = Math.floor(mouseX/sizeLato)
    cellaY = Math.floor(mouseY/sizeLato)
    if (cellaX >= sizeX || cellaY >= sizeY) {
        return
    }
    clickMatrix(cellaX, cellaY)
    mosse++
    if (checkWin()) {
        console.log(livello, mosse)
        mosse = 0
        if(livello < (sizeX*sizeY))
            livello ++
        gameEnded = true
    }
}

function checkWin() {
    for (let i = 0; i < sizeX; i++) {
        for (let j = 0; j < sizeY; j++) {
            if (!matrice[i][j])
                return false
        }
    }
    return true
}

function clickMatrix(x, y) {
    let up = [-1, 0, 1, 0]
    let right = [0, 1, 0, -1]
    matrice[x][y] = !matrice[x][y]
    for (let i = 0; i < 4; i++) {
        matrice[mod(x+up[i], sizeX)][mod(y+right[i], sizeY)] = !matrice[mod(x+up[i], sizeX)][mod(y+right[i], sizeY)]
    }
}

function createLevel() {
    for(let i=0; i<livello; i++) {
        clickMatrix (Math.floor(random(sizeX)), Math.floor(random(sizeY)))
    }
}

function calculateTime() {
    str(hour()-hIniz) + ":" + str(minute()-mIniz) + ":" + str(second()-sIniz)
}

function showSpeedRunTime() {
    textsize(32)
    fill(0)
    text(calculateTime(), 50, 80)
}

function showNewLevelLable() {
    textsize(32)
    fill(0)
    text("livello " + livello, 50, 50)
}

