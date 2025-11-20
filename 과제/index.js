// --- HTML 요소 ---
const player = document.getElementById('player');
const timerDisplay = document.getElementById('timer-display');
const restartButton = document.getElementById('restart-button');
const obstacleContainer = document.getElementById('obstacle-container');

// --- 게임 설정 ---
const GAME_DURATION = 3 * 60 * 1000;
const OBSTACLE_MOVE_SPEED = 200; 
const OBSTACLE_SPAWN_SPEED = 1500; 

// --- 게임 상태 변수 ---
let playerX, playerY;
let startTime;
let gameRunning;
let timerInterval;
let obstacles = []; 
let obstacleMoveInterval; 
let obstacleSpawnInterval; 
let currentDifficultyLevel; 

// === 게임 시작 (초기화) 함수 ===
function startGame() {
    // 1. 변수 초기화
    playerX = 4; // 시작 위치 (중앙 5x5 그리드 기준 2칸 이동, 전체 7x7 기준 4)
    playerY = 4;
    startTime = Date.now();
    gameRunning = true;
    obstacles = [];
    currentDifficultyLevel = 1; 

    // 2. 시각적 요소 초기화
    player.style.gridColumn = playerX;
    player.style.gridRow = playerY;
    timerDisplay.textContent = formatTime(GAME_DURATION);
    restartButton.classList.remove('show');
    obstacleContainer.innerHTML = ''; 

    // 3. 기존 인터벌 제거
    clearInterval(timerInterval);
    clearInterval(obstacleMoveInterval);
    clearInterval(obstacleSpawnInterval);

    // 4. 새 인터벌 시작
    timerInterval = setInterval(updateTimer, 10);
    obstacleMoveInterval = setInterval(moveAllObstacles, OBSTACLE_MOVE_SPEED);
    obstacleSpawnInterval = setInterval(spawnObstacle, OBSTACLE_SPAWN_SPEED);
}

// === 게임 정지 함수 ===
function stopGame() {
    gameRunning = false;
    clearInterval(timerInterval);
    clearInterval(obstacleMoveInterval);
    clearInterval(obstacleSpawnInterval);
    restartButton.classList.add('show');

    // 장애물 애니메이션 정지
    for (const ob of obstacles) {
        ob.element.style.animationPlayState = 'paused'; 
    }
}

// === 장애물 생성 함수 (난이도 적용) ===
function spawnObstacle() {
    if (!gameRunning) return;

    // 현재 난이도 레벨만큼 장애물 생성
    for (let i = 0; i < currentDifficultyLevel; i++) {
        let x, y, dirX, dirY;
        const side = Math.floor(Math.random() * 4); // 0:상, 1:하, 2:좌, 3:우
        const randomPos = Math.floor(Math.random() * 5) + 2; // 중앙 5칸(2~6) 중 랜덤 위치

        switch (side) {
            case 0: // 상 (y=1) -> 아래로(dirY=1)
                x = randomPos; y = 1; dirX = 0; dirY = 1;
                break;
            case 1: // 하 (y=7) -> 위로(dirY=-1)
                x = randomPos; y = 7; dirX = 0; dirY = -1;
                break;
            case 2: // 좌 (x=1) -> 오른쪽으로(dirX=1)
                x = 1; y = randomPos; dirX = 1; dirY = 0;
                break;
            case 3: // 우 (x=7) -> 왼쪽으로(dirX=-1)
                x = 7; y = randomPos; dirX = -1; dirY = 0;
                break;
        }

        const newElement = document.createElement('div');
        newElement.className = 'obstacle'; 
        newElement.style.gridColumn = x;
        newElement.style.gridRow = y;

        obstacleContainer.appendChild(newElement);
        obstacles.push({ x: x, y: y, dirX: dirX, dirY: dirY, element: newElement });
    }
}

// === 장애물 이동 함수 ===
function moveAllObstacles() {
    if (!gameRunning) return;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];

        ob.x += ob.dirX;
        ob.y += ob.dirY;

        // 경계를 벗어나면 제거 (1~7 범위)
        if (ob.x > 7 || ob.x < 1 || ob.y > 7 || ob.y < 1) {
            ob.element.remove(); 
            obstacles.splice(i, 1); 
        } 
        else {
            ob.element.style.gridColumn = ob.x;
            ob.element.style.gridRow = ob.y;

            // 이동 후 충돌 확인
            if (playerX === ob.x && playerY === ob.y) {
                stopGame();
                alert("게임 오버! 😭");
                break; 
            }
        }
    }
}

// === 플레이어 충돌 감지 (이동 직후 호출) ===
function checkPlayerCollision() {
    if (!gameRunning) return;
    for (const ob of obstacles) {
        if (playerX === ob.x && playerY === ob.y) {
            stopGame();
            alert("게임 오버! 😭");
            break;
        }
    }
}

// --- 시간 포맷 (00:00.00) ---
function formatTime(ms) {
    if (ms < 0) ms = 0;
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let hundredths = Math.floor((ms % 1000) / 10);
    let minStr = String(minutes).padStart(2, '0');
    let secStr = String(seconds).padStart(2, '0');
    let msStr = String(hundredths).padStart(2, '0');
    return `${minStr}:${secStr}.${msStr}`;
}

// === 타이머 업데이트 및 난이도 조절 함수 ===
function updateTimer() {
    if (!gameRunning) return;
    let elapsedTime = Date.now() - startTime;
    let remainingTime = GAME_DURATION - elapsedTime;

    timerDisplay.textContent = formatTime(remainingTime);

    // --- 난이도 조절 로직 ---
    // 2분(120,000ms) 남았고, 현재 레벨 1이면 -> 레벨 2로
    if (remainingTime <= 120000 && currentDifficultyLevel === 1) {
        currentDifficultyLevel = 2;
        console.log("난이도 상승! LV.2"); 
    } 
    // 1분(60,000ms) 남았고, 현재 레벨 2이면 -> 레벨 3으로
    else if (remainingTime <= 60000 && currentDifficultyLevel === 2) {
        currentDifficultyLevel = 3;
        console.log("난이도 상승! LV.3");
    }
    // -----------------------

    if (remainingTime <= 0) {
        stopGame();
        alert("클리어! 3분을 버텼습니다! 🎉");
    }
}

// --- 플레이어 이동 (이벤트 리스너) ---
document.addEventListener('keydown', (event) => {
    if (!gameRunning) return; 
    event.preventDefault(); // 기본 스크롤 동작 방지

    switch (event.key) {
        case 'ArrowUp':
            // 2(윗 경계)보다 크면 이동 가능 (1은 바깥, 2부터 안쪽)
            if (playerY > 2) playerY--; 
            break;
        case 'ArrowDown':
            // 6(아랫 경계)보다 작으면 이동 가능 (7은 바깥, 6까지 안쪽)
            if (playerY < 6) playerY++; 
            break;
        case 'ArrowLeft':
            // 2(왼쪽 경계)보다 크면 이동 가능
            if (playerX > 2) playerX--;
            break;
        case 'ArrowRight':
            // 6(오른쪽 경계)보다 작으면 이동 가능
            if (playerX < 6) playerX++;
            break;
    }

    player.style.gridColumn = playerX;
    player.style.gridRow = playerY;

    // 이동 직후 충돌 감지
    checkPlayerCollision();
});

// '다시 시작' 버튼 클릭 이벤트
restartButton.addEventListener('click', startGame);

// 최초 게임 시작
startGame();