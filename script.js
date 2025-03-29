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

const player = document.querySelector(".player");
const maze = document.querySelector(".maze");
const finish = document.querySelector(".finish");
const walls = document.querySelectorAll(".wall");

// Устанавливаем начальную позицию игрока
let playerX = 10;
let playerY = 10;

// Двигаем объект за курсором
document.addEventListener("mousemove", (event) => {
    let mazeRect = maze.getBoundingClientRect();
    let newX = event.clientX - mazeRect.left - player.offsetWidth / 2;
    let newY = event.clientY - mazeRect.top - player.offsetHeight / 2;

    // Проверяем, чтобы объект не выходил за границы лабиринта
    if (newX >= 0 && newX <= maze.clientWidth - player.clientWidth &&
        newY >= 0 && newY <= maze.clientHeight - player.clientHeight) {
        player.style.left = `${newX}px`;
        player.style.top = `${newY}px`;

        // Проверяем столкновение со стенами
        walls.forEach((wall) => {
            if (isColliding(player, wall)) {
                alert("Вы проиграли! Столкновение со стеной.");
                resetGame();
            }
        });

        // Проверяем, дошел ли до финиша
        if (isColliding(player, finish)) {
            alert("Поздравляем! Вы прошли лабиринт!");
            resetGame();
        }
    }
});

// Функция проверки столкновений
function isColliding(obj1, obj2) {
    let rect1 = obj1.getBoundingClientRect();
    let rect2 = obj2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
    );
}

// Функция перезапуска игры
function resetGame() {
    player.style.left = "10px";
    player.style.top = "10px";
}




let scene, camera, renderer, model;

function init() {
    const container = document.getElementById('3d-container');

    // Создаем сцену
    scene = new THREE.Scene();

    // Создаем камеру
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);

    // Создаем рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Добавляем свет
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 1, 0);
    scene.add(light);

    // Загружаем GLB-модель
    const loader = new THREE.GLTFLoader();
    loader.load('model/potion3d.glb', function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0); // Устанавливаем позицию модели
        scene.add(model);
    }, undefined, function (error) {
        console.error('Ошибка загрузки модели:', error);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01; // Вращение модели
    renderer.render(scene, camera);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('page5').addEventListener('transitionstart', init, { once: true });
});




document.addEventListener("DOMContentLoaded", () => {
    const player = document.querySelector(".player");
    const finish = document.querySelector(".finish");
    const walls = document.querySelectorAll(".wall");

    let playerX = 10, playerY = 10;
    const step = 10;

    document.addEventListener("keydown", (event) => {
        let newX = playerX;
        let newY = playerY;

        if (event.key === "ArrowRight") newX += step;
        if (event.key === "ArrowLeft") newX -= step;
        if (event.key === "ArrowDown") newY += step;
        if (event.key === "ArrowUp") newY -= step;

        if (!checkCollision(newX, newY)) {
            playerX = newX;
            playerY = newY;
            player.style.left = `${playerX}px`;
            player.style.top = `${playerY}px`;
        }

        if (isColliding(player, finish)) {
            alert("Поздравляем! Ты прошёл уровень!");
            resetGame();
        }
    });

    function checkCollision(newX, newY) {
        player.style.left = `${newX}px`;
        player.style.top = `${newY}px`;

        let collision = false;
        walls.forEach(wall => {
            if (isColliding(player, wall)) {
                collision = true;
            }
        });

        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;
        return collision;
    }

    function isColliding(obj1, obj2) {
        let rect1 = obj1.getBoundingClientRect();
        let rect2 = obj2.getBoundingClientRect();
        return !(
            rect1.top > rect2.bottom ||
            rect1.right < rect2.left ||
            rect1.bottom < rect2.top ||
            rect1.left > rect2.right
        );
    }

    function resetGame() {
        playerX = 10;
        playerY = 10;
        player.style.left = "10px";
        player.style.top = "10px";
    }
});