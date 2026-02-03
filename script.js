const man = document.getElementById("man");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let score = 0;
let isGameOver = false;

// --- 1. RANDOM OBSTACLE LOGIC ---

function startGameLoop() {
    if (isGameOver) return;

    // Add the CSS class to trigger the animation
    obstacle.classList.add("obstacle-move");

    // The animation takes 1.5 seconds (1500ms) in CSS.
    // We wait for it to finish, then remove the class.
    setTimeout(() => {
        obstacle.classList.remove("obstacle-move");
        
        if (!isGameOver) {
            scheduleNextObstacle();
        }
    }, 1500); 
}

function scheduleNextObstacle() {
    // Generate a random time between 500ms and 1500ms
    // This creates a gap between obstacles
    let randomGap = Math.floor(Math.random() * 1000) + 500; 
    
    setTimeout(startGameLoop, randomGap);
}

// Start the first obstacle
startGameLoop();


// --- 2. JUMP LOGIC ---

function jump() {
    if (!man.classList.contains("animate-jump")) {
        man.classList.add("animate-jump");
        setTimeout(() => {
            man.classList.remove("animate-jump");
        }, 500);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        jump();
    }
});


// --- 3. COLLISION DETECTION ---

const checkDead = setInterval(() => {
    if (isGameOver) return;

    // Get positions
    let manTop = parseInt(window.getComputedStyle(man).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Check collision
    // If obstacle is under man (Left < 190 and > 110) AND Man is on ground (Top >= 300)
    if (obstacleLeft < 190 && obstacleLeft > 110 && manTop >= 300) {
        
        isGameOver = true;
        
        // Hide obstacle immediately
        obstacle.style.display = "none";
        
        alert("Game Over! Score: " + score);
        
        // Restart Game
        location.reload();
        
    } else {
        // Only increase score if obstacle has passed the man safely
        // (e.g., when obstacleLeft becomes negative, it means it passed)
        if (obstacleLeft < 0 && obstacle.classList.contains("obstacle-move")) {
             // We can just increment score over time or per jump. 
             // Simple version: increment constantly.
             score++;
             scoreDisplay.innerText = "Score: " + Math.floor(score / 10);
        }
    }

}, 10);