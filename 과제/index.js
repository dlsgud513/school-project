// 화면(HTML)이 다 로딩된 후에 게임 코드를 실행하도록 안전장치 추가
document.addEventListener('DOMContentLoaded', () => {

    // --- HTML 요소 ---
    const player = document.getElementById('player');
    const timerDisplay = document.getElementById('timer-display');
    const restartButton = document.getElementById('restart-button');
    const obstacleContainer = document.getElementById('obstacle-container');
    const gridContainer = document.getElementById('grid-container'); 
    let laserDifficultyLevel = 0;

    // 요소가 제대로 로드되지 않았을 경우를 대비한 방어 코드
    if (!player || !timerDisplay || !restartButton || !obstacleContainer) {
        console.error("HTML 요소를 찾을 수 없습니다. id 이름을 확인해주세요.");
        return;
    }

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
    let savedCheckpoint = 0; // 세이브 포인트 저장용 (0, 60000, 120000)
    const notification = document.getElementById('notification');
    let laserSpawnInterval; // 레이저 생성 타이머
    let activeLasers = []; // 현재 화면에 있는 레이저 목록 관리
    const LASER_SPAWN_SPEED = 6000; // 6초마다 레이저 생성 시도
    const LASER_WARNING_TIME = 1000; // 2초간 경고 후 발사
    const LASER_ACTIVE_TIME = 800;  // 1.5초간 발사 유지

    // === 게임 시작 (초기화) 함수 ===
    function startGame() {
    playerX = 4;
    playerY = 4;
    
    // [핵심] 저장된 시간만큼 미리 흐른 상태로 시작
    startTime = Date.now() - savedCheckpoint;
    
    gameRunning = true;
    obstacles = [];
    
    // 이어하기면 난이도 바로 올리기
    if (savedCheckpoint >= 120000) currentDifficultyLevel = 3;
    else if (savedCheckpoint >= 60000) currentDifficultyLevel = 2;
    else currentDifficultyLevel = 1;

    player.style.gridColumn = playerX;
    player.style.gridRow = playerY;
    
    // 남은 시간 표시 (3분 - 저장된 시간)
    timerDisplay.textContent = formatTime(3 * 60 * 1000 - savedCheckpoint);
    
    restartButton.classList.remove('show');
    notification.style.display = 'none'; // 알림창 숨김
    obstacleContainer.innerHTML = ''; 

    clearInterval(timerInterval);
    clearInterval(obstacleMoveInterval);
    clearInterval(obstacleSpawnInterval);
    clearInterval(laserSpawnInterval);

    timerInterval = setInterval(updateTimer, 10);
    obstacleMoveInterval = setInterval(moveAllObstacles, OBSTACLE_MOVE_SPEED);
    obstacleSpawnInterval = setInterval(spawnObstacle, OBSTACLE_SPAWN_SPEED);
    laserSpawnInterval = setInterval(spawnLaser, LASER_SPAWN_SPEED);

    // 이어하기면 알림 띄우기
    if (savedCheckpoint > 0) {
        showNotification("이어하기: " + formatTime(savedCheckpoint) + " 지점");
    }
}

    // === 게임 정지 함수 ===
    function stopGame() {
        gameRunning = false;
        clearInterval(timerInterval);
        clearInterval(obstacleMoveInterval);
        clearInterval(obstacleSpawnInterval);
        clearInterval(laserSpawnInterval);
        restartButton.classList.add('show');

        for (const ob of obstacles) {
            ob.element.style.animationPlayState = 'paused'; 
        }
        activeLasers.forEach(laser => laser.element.remove());
    activeLasers = [];
    }

    // === 장애물 생성 함수 ===
    function spawnObstacle() {
        if (!gameRunning) return;

        for (let i = 0; i < currentDifficultyLevel; i++) {
            let x, y, dirX, dirY;
            const side = Math.floor(Math.random() * 4);
            const randomPos = Math.floor(Math.random() * 5) + 2;

            switch (side) {
                case 0: x = randomPos; y = 1; dirX = 0; dirY = 1; break; // 상
                case 1: x = randomPos; y = 7; dirX = 0; dirY = -1; break; // 하
                case 2: x = 1; y = randomPos; dirX = 1; dirY = 0; break; // 좌
                case 3: x = 7; y = randomPos; dirX = -1; dirY = 0; break; // 우
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

            if (ob.x > 7 || ob.x < 1 || ob.y > 7 || ob.y < 1) {
                ob.element.remove(); 
                obstacles.splice(i, 1); 
            } 
            else {
                ob.element.style.gridColumn = ob.x;
                ob.element.style.gridRow = ob.y;

                if (playerX === ob.x && playerY === ob.y) {
                    stopGame();
                    alert("게임 오버!");
                    break; 
                }
            }
        }
    }

    // === 플레이어 충돌 감지 ===
    function checkPlayerCollision() {
    if (!gameRunning) return;

    // 1. 일반 장애물 충돌 확인
    for (const ob of obstacles) {
        if (playerX === ob.x && playerY === ob.y) {
            stopGame(false);
            alert("적에게 치였습니다!"); // 사망 원인 구분을 위해 메시지 변경
            return;
        }
    }

    // 2. [추가됨] 레이저 충돌 확인
    checkLaserCollision();
}

    // --- 시간 포맷 ---
    function formatTime(ms) {
        if (ms < 0) ms = 0;
        let totalSeconds = Math.floor(ms / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let hundredths = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
    }

    // === 타이머 업데이트 함수 ===
    function updateTimer() {
    if (!gameRunning) return;
    
    let elapsedTime = Date.now() - startTime;
    let remainingTime = (3 * 60 * 1000) - elapsedTime;

    timerDisplay.textContent = formatTime(remainingTime);

   // [수정할 부분] 시간별 난이도 설정
    // 1단계: 3분 ~ 2분 (남은 시간 120초 이상)
    if (remainingTime > 120000) {
        currentDifficultyLevel = 1; // 동그라미 1개
        laserDifficultyLevel = 0;   // 레이저 없음
    }
    // 2단계: 2분 ~ 1분 (남은 시간 60초 ~ 120초)
    else if (remainingTime > 60000) {
        currentDifficultyLevel = 1; // 동그라미 1개
        laserDifficultyLevel = 1;   // 레이저 1개
        
        // 1분 지점 세이브 (한 번만 실행)
        if (savedCheckpoint < 60000) {
            savedCheckpoint = 60000;
            showNotification("💾 1분 돌파! (레이저 시작)");
        }
    }
    // 3단계: 1분 ~ 0분 (남은 시간 60초 미만)
    else {
        currentDifficultyLevel = 1; // 동그라미 1개
        laserDifficultyLevel = 2;   // 레이저 2개

        // 2분 지점 세이브 (한 번만 실행)
        if (savedCheckpoint < 120000) {
            savedCheckpoint = 120000;
            showNotification("💾 2분 돌파! (레이저 2개)");
        }
    }
}

    // --- 플레이어 이동 (이벤트 리스너) ---
    document.addEventListener('keydown', (event) => {
        if (!gameRunning) return; 
        
        // 화살표 키일 때만 화면 스크롤 방지
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp': if (playerY > 2) playerY--; break;
            case 'ArrowDown': if (playerY < 6) playerY++; break;
            case 'ArrowLeft': if (playerX > 2) playerX--; break;
            case 'ArrowRight': if (playerX < 6) playerX++; break;
        }

        player.style.gridColumn = playerX;
        player.style.gridRow = playerY;

        checkPlayerCollision();
    });
function spawnLaser() {
        if (!gameRunning) return;
        // 1단계(3~2분)에서는 레이저가 0개이므로 실행 안 함
        if (laserDifficultyLevel === 0) return;

        // 정해진 개수(1개 or 2개)만큼 반복해서 생성
        for (let k = 0; k < laserDifficultyLevel; k++) {
            createSingleLaser();
        }
    }

    // [추가] 레이저 1개를 만드는 내부 함수
function createSingleLaser() {
        const isHorizontal = Math.random() < 0.5;
        const positionIndex = Math.floor(Math.random() * 7) + 1; 

        const laserEl = document.createElement('div');
        laserEl.classList.add('laser', 'warning'); 
        laserEl.classList.add(isHorizontal ? 'horizontal' : 'vertical');

        if (isHorizontal) {
            laserEl.style.top = `${(positionIndex - 1) * 50}px`;
        } else {
            laserEl.style.left = `${(positionIndex - 1) * 50}px`;
        }

        // 아까 추가한 gridContainer 변수가 여기서 사용됩니다
        gridContainer.appendChild(laserEl);

        const laserData = {
            element: laserEl,
            isHorizontal: isHorizontal,
            positionIndex: positionIndex,
            isActive: false
        };
        activeLasers.push(laserData);

        // 경고 후 발사 로직
        setTimeout(() => {
            if (!gameRunning) return;
            
            laserEl.classList.remove('warning');
            laserEl.classList.add('active');
            laserData.isActive = true;
            
            checkLaserCollision(); 

            // 발사 후 제거
            setTimeout(() => {
                if (!gameRunning && laserEl.parentNode) {
                     laserEl.remove(); return;
                }
                if(laserEl.parentNode) laserEl.remove();
                activeLasers = activeLasers.filter(l => l !== laserData);
            }, LASER_ACTIVE_TIME);

        }, LASER_WARNING_TIME);
    }
function checkLaserCollision() {
    if (!gameRunning) return;

    for (const laser of activeLasers) {
        // 레이저가 '발사(active)' 상태일 때만 체크
        if (laser.isActive) {
            if (laser.isHorizontal) {
                // 가로 레이저: 플레이어의 Y좌표(행)가 레이저 위치랑 같으면 사망
                if (playerY === laser.positionIndex) {
                    stopGame(false);
                    alert("레이저에 타버렸습니다!");
                    return;
                }
            } else {
                // 세로 레이저: 플레이어의 X좌표(열)가 레이저 위치랑 같으면 사망
                if (playerX === laser.positionIndex) {
                    stopGame(false);
                    alert("레이저에 타버렸습니다!");
                    return;
                }
            }
        }
    }
}

    // '다시 시작' 버튼 클릭
    restartButton.addEventListener('click', startGame);

    // 최초 게임 시작
    startGame();

}); // DOMContentLoaded 끝
