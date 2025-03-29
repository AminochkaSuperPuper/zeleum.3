document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".image-container2 img"); // Выбираем изображение

    if (!image) {
        console.warn .image;
        return;
    }

    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event; // Получаем координаты курсора
        const { innerWidth, innerHeight } = window; // Размеры экрана

        // Вычисляем отклонение от центра экрана
        const deltaX = (clientX / innerWidth - 0.5) * 40; // от -20 до 20 градусов
        const deltaY = (clientY / innerHeight - 0.5) * 40;

        // Применяем поворот (используем rotateZ вместо rotateX/rotateY)
        image.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const image = document.querySelector(".image-container3 img"); // Выбираем изображение

    if (!image) {
        console.warn .image;
        return;
    }

    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event; // Получаем координаты курсора
        const { innerWidth, innerHeight } = window; // Размеры экрана

        // Вычисляем отклонение от центра экрана
        const deltaX = (clientX / innerWidth - 0.5) * 40; // от -20 до 20 градусов
        const deltaY = (clientY / innerHeight - 0.5) * 40;

        // Применяем поворот (используем rotateZ вместо rotateX/rotateY)
        image.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });
});

function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('show');
        page.classList.add('hide');
    });

    // Показать выбранную страницу
    document.getElementById(pageId).classList.remove('hide');
    document.getElementById(pageId).classList.add('show');
}

function showPage(pageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('show');
        page.classList.add('hide');
    });

    // Показать выбранную страницу
    document.getElementById(pageId).classList.remove('hide');
    document.getElementById(pageId).classList.add('show');
}



const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const winMessage = document.getElementById('winMessage');

// Конфигурация лабиринта
const cellSize = 40;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

// Цвета
const neonPurple = '#9d00ff';
const playerColor = '#00ff00';
const exitColor = '#00ff00';
const glowColor = 'rgba(157, 0, 255, 0.3)';

// Игрок
let player = {
    x: 1,
    y: 1,
    size: cellSize * 0.6,
    color: playerColor
};

// Выход
let exit = {
    x: cols - 2,
    y: rows - 2,
    size: cellSize
};

// Генерация лабиринта
let maze = generateMaze(cols, rows);

// Генерация лабиринта (алгоритм DFS)
function generateMaze(cols, rows) {
    // Создаем сетку, где все клетки - стены
    let grid = Array(cols).fill().map(() => Array(rows).fill(1));
    
    // Начальная позиция
    let x = 1;
    let y = 1;
    grid[x][y] = 0;
    
    // Стек для отслеживания пути
    let stack = [[x, y]];
    
    // Направления: вверх, вправо, вниз, влево
    const directions = [[0, -2], [2, 0], [0, 2], [-2, 0]];
    
    while (stack.length > 0) {
        // Текущая позиция
        [x, y] = stack[stack.length - 1];
        
        // Получаем все возможные направления
        let neighbors = [];
        for (let [dx, dy] of directions) {
            let nx = x + dx;
            let ny = y + dy;
            
            if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && grid[nx][ny] === 1) {
                neighbors.push([dx, dy, nx, ny]);
            }
        }
        
        if (neighbors.length > 0) {
            // Выбираем случайное направление
            let [dx, dy, nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
            
            // Убираем стену между текущей и следующей клеткой
            grid[x + dx/2][y + dy/2] = 0;
            grid[nx][ny] = 0;
            
            // Добавляем новую позицию в стек
            stack.push([nx, ny]);
        } else {
            // Если нет соседей, возвращаемся назад
            stack.pop();
        }
    }
    
    // Делаем выход
    grid[exit.x][exit.y] = 0;
    
    return grid;
}

// Отрисовка лабиринта
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем стены
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (maze[x][y] === 1) {
                // Неоновое свечение
                ctx.fillStyle = glowColor;
                ctx.fillRect(x * cellSize - 5, y * cellSize - 5, cellSize + 10, cellSize + 10);
                
                // Стена
                ctx.fillStyle = neonPurple;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    
    // Рисуем выход
    ctx.fillStyle = exitColor;
    ctx.fillRect(exit.x * cellSize, exit.y * cellSize, exit.size, exit.size);
    
    // Неоновое свечение для выхода
    ctx.fillStyle = 'rgb(255, 208, 0)';
    ctx.fillRect(exit.x * cellSize - 5, exit.y * cellSize - 5, exit.size + 10, exit.size + 10);
    
    // Рисуем игрока
    const playerX = player.x * cellSize + (cellSize - player.size) / 2;
    const playerY = player.y * cellSize + (cellSize - player.size) / 2;
    
    // Неоновое свечение для игрока
    ctx.fillStyle = 'rgb(255, 200, 0)';
    ctx.beginPath();
    ctx.arc(playerX + player.size/2, playerY + player.size/2, player.size/2 + 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Игрок
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(playerX + player.size/2, playerY + player.size/2, player.size/2, 0, Math.PI * 2);
    ctx.fill();
}

// Проверка на победу
function checkWin() {
    if (player.x === exit.x && player.y === exit.y) {
        winMessage.style.display = 'block';
        return true;
    }
    return false;
}

// Обработка нажатий клавиш
document.addEventListener('keydown', (e) => {
    if (winMessage.style.display === 'block' && e.key.toLowerCase() === 'r') {
        // Рестарт игры
        maze = generateMaze(cols, rows);
        player.x = 1;
        player.y = 1;
        winMessage.style.display = 'none';
        drawMaze();
        return;
    }
    
    if (winMessage.style.display === 'block') return;
    
    let newX = player.x;
    let newY = player.y;
    
    switch (e.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        default:
            return;
    }
    
    // Проверка на выход за границы и столкновение со стенами
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newX][newY] === 0) {
        player.x = newX;
        player.y = newY;
        
        drawMaze();
        checkWin();
    }
});

// Начальная отрисовка
drawMaze();