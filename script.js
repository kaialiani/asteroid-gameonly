let lives;
let points;
let GameIsPaused = false;
let GameHasEnded = false;
let buttonSound = document.querySelector("#buttonSound");
let bgMusic = document.querySelector("#bgSound");
let badSound = document.querySelector("#badSound");
let goodSound = document.querySelector("#goodSound");
let winningSound = document.querySelector("#winningSound");
let losingSound = document.querySelector("#losingSound");

window.addEventListener("load", start);

function start() {
    console.log('start');
    lives = 3;
    points = 0;
    document.querySelector("#current_score").textContent = points;
    document.querySelector("#current_lives").textContent = lives;
    showTitle();
}

function showTitle() {
    console.log('showTitle');
    playBackgroundMusic();
    bgMusic.addEventListener("ended", playBackgroundMusic);
    hideAllScreens();
    document.querySelector("#title_screen").classList.remove("hidden");

    document.querySelector("#titlesound").addEventListener("click", playButtonSound);
    document.querySelector("#titlesound").addEventListener("click", muteSoundTitle);
    document.querySelector("#titlemute").addEventListener("click", playButtonSound);
    document.querySelector("#titlemute").addEventListener("click", muteSoundTitle);

    document.querySelector("#playgame").addEventListener("click", startGame);
    document.querySelector("#playgame").addEventListener("click", playButtonSound);

    document.querySelector("#info").addEventListener("click", showInstructions);
    document.querySelector("#info").addEventListener("click", playButtonSound);
}

function showInstructions() {
    console.log('showInstructions');
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.remove("hidden");
    document.querySelector("#instrback").addEventListener("click", showTitle);
    document.querySelector("#instrback").addEventListener("click", playButtonSound);
}

function startGame() {
    console.log(`startGame`);

    playBackgroundMusic();
    bgMusic.addEventListener("ended", playBackgroundMusic);

    document.querySelector("#soundoff").addEventListener("click", muteSound);
    document.querySelector("#soundon").addEventListener("click", muteSound);

    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#lose_screen").classList.add("hidden");
    document.querySelector("#win_screen").classList.add("hidden");

    document.querySelector("#playy").addEventListener("click", PauseGame);
    document.querySelector("#playy").addEventListener("click", playButtonSound);
    document.querySelector("#pause").addEventListener("click", PauseGame);
    document.querySelector("#pause").addEventListener("click", playButtonSound);

    document.querySelector("#asteroid_container").classList.add("diagonal", "pos3");
    document.querySelector("#plane_container").classList.add("falling3", "pos7");
    document.querySelector("#rocket_container").classList.add("falling1", "pos3");

    document.querySelector("#asteroid_container").addEventListener("click", asteroidHit);
    document.querySelector("#asteroid_container").addEventListener("click", playGoodSound);

    document.querySelector("#asteroid_container").addEventListener("animationiteration", squeezeAsteroid);


    document.querySelector("#plane_container").addEventListener("click", badHit);
    document.querySelector("#rocket_container").addEventListener("click", badHit);
    document.querySelector("#plane_container").addEventListener("click", playBadSound);
    document.querySelector("#rocket_container").addEventListener("click", playBadSound);

    document.querySelector("#plane_container").addEventListener("animationiteration", squeezeBad);
    document.querySelector("#rocket_container").addEventListener("animationiteration", squeezeBad);


}

function asteroidHit() {
    console.log(`asteroidHit`);

    this.classList.add("stop");

    this.firstElementChild.classList.add("rotate");
    
    document.querySelector("#happyface").classList.remove("hidden");

    setTimeout(function () {
        document.querySelector("#happyface").classList.add("hidden");}, 2000);

    points = points + 100;
    console.log(`Points: ${points}`);
    document.querySelector("#current_score").textContent = points;

    if(points > 400) {
        winning();
    } 
    
    this.firstElementChild.addEventListener("animationend", restartAsteroid);
    
}

function squeezeAsteroid() {
    console.log(`squeezeAsteroid`);

    this.classList.value = "";

    this.firstElementChild.classList.value = "";
    
    this.firstElementChild.removeEventListener("animationend", restartAsteroid);
     
    this.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling1", "pos" + randomPosition);
}
function restartAsteroid() {
    console.log(`restartAsteroid`);
    
    this.parentElement.classList.value = "";
    
    this.classList.value = "";
    
    this.removeEventListener("animationend", restartAsteroid);
    
    this.parentElement.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling1", "pos" + randomPosition);
}

function badHit() {
    console.log(`badHit`);
    
    this.firstElementChild.classList.add("scale");

    document.querySelector("#sadface").classList.remove("hidden");

    setTimeout(function () {
        document.querySelector("#sadface").classList.add("hidden");
    }, 2000);

    lives = lives - 1;
    console.log(`Lives: ${lives}`);
    document.querySelector("#current_lives").textContent = lives;

    document.querySelector("#life3").classList.add("hidden");
    document.querySelector("#life2").classList.remove("hidden");

    if (lives < 2) {
        document.querySelector("#life3").classList.add("hidden");
        document.querySelector("#life2").classList.add("hidden");
        document.querySelector("#life1").classList.remove("hidden");
    }

    if (lives < 1) {
        gameOver();
    }

    this.firstElementChild.addEventListener("animationend", restartBad);
}

function squeezeBad() {
    console.log(`restartBad`);

    this.classList.value = "";
    this.firstElementChild.classList.value = "";
    this.firstElementChild.removeEventListener("animationend", restartBad)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function restartBad() {
    console.log(`restartBad`);

    this.parentElement.classList.value = "";
    this.classList.value = "";
    this.removeEventListener("animationend", restartBad)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function generateRandomNumber(num) {
    return Math.floor(Math.random() * num) + 1;
}

function gameOver() {
    console.log('gameOver');

    losingSound.play();

    document.querySelector("#lose_screen").classList.remove("hidden");
    document.querySelector("#retry-lose").addEventListener("click", start);
    document.querySelector("#retry-lose").addEventListener("click", playButtonSound);

    document.querySelector("#asteroid_container").classList.value="";
    document.querySelector("#plane_container").classList.value="";
    document.querySelector("#rocket_container").classList.value="";

    document.querySelector("#asteroid_container").removeEventListener("click", asteroidHit);
    document.querySelector("#plane_container").removeEventListener("click", badHit);
    document.querySelector("#rocket_container").removeEventListener("click", badHit);

    document.querySelector("#asteroid_container").removeEventListener("animationiteration", squeezeAsteroid);
    document.querySelector("#plane_container").removeEventListener("animationiteration", squeezeBad);
    document.querySelector("#rocket_container").removeEventListener("animationiteration", squeezeBad);

}

function winning() {
    console.log('winning');

    playWinningSound()

    document.querySelector("#win_screen").classList.remove("hidden");
    document.querySelector("#retry-win").addEventListener("click", start);
    document.querySelector("#retry-win").addEventListener("click", playButtonSound);

    document.querySelector("#asteroid_container").classList.value="";
    document.querySelector("#plane_container").classList.value="";
    document.querySelector("#rocket_container").classList.value="";

    document.querySelector("#asteroid_container").removeEventListener("click", asteroidHit);
    document.querySelector("#plane_container").removeEventListener("click", badHit);
    document.querySelector("#rocket_container").removeEventListener("click", badHit);

    document.querySelector("#asteroid_container").removeEventListener("animationiteration", squeezeAsteroid);
    document.querySelector("#plane_container").removeEventListener("animationiteration", squeezeBad);
    document.querySelector("#rocket_container").removeEventListener("animationiteration", squeezeBad);

}

function PauseGame() {
    if (GameIsPaused == false) {
        console.log("game is paused");
        document.querySelector("#pause").classList.add("hidden");
        document.querySelector("#playy").classList.remove("hidden");
        document.querySelector("#bgSound").classList.add("paused");
        document.querySelector("#asteroid_container").classList.add("paused");
        document.querySelector("#plane_container").classList.add("paused");
        document.querySelector("#rocket_container").classList.add("paused");
        document.querySelector("#asteroid_container").removeEventListener("click", asteroidHit);
        document.querySelector("#asteroid_container").removeEventListener("animationend", restartAsteroid);
        document.querySelector("#plane_container").removeEventListener("click", badHit);
        document.querySelector("#plane_container").removeEventListener("animationend", restartBad);
        document.querySelector("#rocket_container").removeEventListener("click", badHit);
        document.querySelector("#rocket_container").removeEventListener("animationend", restartBad);
        document.querySelector("#asteroid_container").removeEventListener("animationiteration", squeezeAsteroid);
        document.querySelector("#plane_container").removeEventListener("animationiteration", squeezeBad);
        document.querySelector("#rocket_container").removeEventListener("animationiteration", squeezeBad);
        document.querySelector("#asteroid_container").removeEventListener("click", playGoodSound);
        

        GameIsPaused = true;
    } else {
        console.log("game is NOT paused");
        document.querySelector("#playy").classList.add("hidden");
        document.querySelector("#pause").classList.remove("hidden");
        document.querySelector("#asteroid_container").classList.remove("paused");
        document.querySelector("#plane_container").classList.remove("paused");
        document.querySelector("#rocket_container").classList.remove("paused");
        document.querySelector("#asteroid_container").addEventListener("click", asteroidHit);
        document.querySelector("#asteroid_container").addEventListener("animationend", restartAsteroid);
        document.querySelector("#plane_container").addEventListener("click", badHit);
        document.querySelector("#plane_container").addEventListener("animationend", restartBad);
        document.querySelector("#rocket_container").addEventListener("click", badHit);
        document.querySelector("#rocket_container").addEventListener("animationend", restartBad);
        document.querySelector("#asteroid_container").addEventListener("animationiteration", squeezeAsteroid);
        document.querySelector("#plane_container").addEventListener("animationiteration", squeezeBad);
        document.querySelector("#rocket_container").addEventListener("animationiteration", squeezeBad);
        document.querySelector("#asteroid_container").addEventListener("click", playGoodSound);

        GameIsPaused = false;
    }
}


function hideAllScreens() {
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.add("hidden");
    document.querySelector("#win_screen").classList.add("hidden");
    document.querySelector("#lose_screen").classList.add("hidden");
}

function happyFace () {
    document.querySelector("#happyface").classList.remove("hidden");
    document.querySelector("#face").classList.add("hidden");
}

function playButtonSound() {
    console.log("function playButtonSound()");
    buttonSound.play();
}

function playBackgroundMusic() {
    console.log("function playBackgroundMusic()");
    bgMusic.play();
}

function playBadSound() {
    console.log("function playBadSound()");
    badSound.play();
}

function playGoodSound() {
    console.log("function playGoodSound()");
    goodSound.play();
}

function playWinningSound() {
    console.log("function playWinningSound()");
    winningSound.play();
}

function playLosingSound() {
    console.log("function playLosingSound()");
    losingSound.play();
}

function muteSoundTitle() {
    console.log("function muteSoundTitle()");

    if (document.querySelector("#bgSound").muted == false) {
        document.querySelector("#bgSound").muted = true;
        document.querySelector("#buttonSound").muted = true;
        badSound.muted = true;
        winningSound.muted = true;
        goodSound.muted = true;
        losingSound.muted = true;
        document.querySelector("#titlemute").classList.remove("hidden");
        document.querySelector("#titlesound").classList.add("hidden");

    } else {
        document.querySelector("#bgSound").muted = false;
        document.querySelector("#buttonSound").muted = false;
        badSound.muted = false;
        losingSound.muted = false;
        winningSound.muted = false;
        goodSound.muted = false;
        document.querySelector("#titlemute").classList.add("hidden");
        document.querySelector("#titlesound").classList.remove("hidden");
    }

}

function muteSound() {
    console.log("function muteSoundTitle()");

    if (document.querySelector("#bgSound").muted == false) {
        document.querySelector("#bgSound").muted = true;
        document.querySelector("#buttonSound").muted = true;
        badSound.muted = true;
        winningSound.muted = true;
        goodSound.muted = true;
        losingSound.muted = true;
        document.querySelector("#soundoff").classList.remove("hidden");
        document.querySelector("#soundon").classList.add("hidden");

    } else {
        document.querySelector("#bgSound").muted = false;
        document.querySelector("#buttonSound").muted = false;
        badSound.muted = false;
        winningSound.muted = false;
        goodSound.muted = false;
        losingSound.muted = false;
        document.querySelector("#soundon").classList.remove("hidden");
        document.querySelector("#soundoff").classList.add("hidden");
        document.querySelector("#soundoff").addEventListener("click", playButtonSound);
    }

}