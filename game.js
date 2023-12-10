const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    speed: 5,
};

const bullets = [];

const targets = [];

function createTarget() {
    const target = {
        x: canvas.width,
        y: Math.random() * canvas.height,
        width: 30,
        height: 30,
        speed: 2,
    };
    targets.push(target);
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        bullet.x += 5;
        ctx.fillRect(bullet.x, bullet.y, 5, 5);
    });
}

function drawTargets() {
    ctx.fillStyle = "green";
    targets.forEach(target => {
        target.x -= target.speed;
        ctx.fillRect(target.x, target.y, target.width, target.height);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawTargets();

    bullets.forEach(bullet => {
        if (bullet.x > canvas.width) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }

        targets.forEach(target => {
            if (
                bullet.x < target.x + target.width &&
                bullet.x + 5 > target.x &&
                bullet.y < target.y + target.height &&
                bullet.y + 5 > target.y
            ) {
                targets.splice(targets.indexOf(target), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
            }
        });
    });

    if (targets.length < 5 && Math.random() < 0.02) {
        createTarget();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", event => {
    if (event.key === " " || event.key === "Spacebar") {
        bullets.push({ x: player.x + player.width, y: player.y + player.height / 2 });
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === "ArrowDown" && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }
});