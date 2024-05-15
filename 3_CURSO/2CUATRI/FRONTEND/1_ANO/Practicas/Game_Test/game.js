// deno-lint-ignore-file no-window-prefix
const bullet_MAX_SPEED = 300.0;
const cooldown = 0.1;

const PLAYER_ACTIONS = {
  leftPressed: false,
  rightPressed: false,
  upPressed: false,
  downPressed: false,
  spacePressed: false,
};
const PLAYER_DATA = {
  PLAYER_WIDTH: 20,
  PLAYER_MAX_SPEED: 600.0,
  playerX: 0,
  playerY: 0,
  playerCooldown: 0,
};

const GAME_STATE = {
  lastTime: Date.now(),
  GAME_WIDTH: window.innerWidth,
  GAME_HEIGHT: window.innerHeight,
  score: 0,
  lives: 3,
  bullets: [],
  boxes: [],
  enemybullets: [],
  gameOver: false,
};

const BOX_DATA = {
  BOX_WIDTH: 20,
  BOX_HEIGHT: 20,
};

function setPosition(el, x, y) {
  el.style.transform = `translate(${x}px, ${y}px)`;
}
function update() {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;
  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updatebullets(dt, $container);
  GAME_STATE.lastTime = currentTime;
  window.requestAnimationFrame(update);
}

function createPlayer($container) {
  PLAYER_DATA.playerX = GAME_STATE.GAME_WIDTH / 2 - 100;
  PLAYER_DATA.playerY = GAME_STATE.GAME_HEIGHT - 300;
  const $player = document.createElement("img");
  $player.src = "res/nave_main.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, PLAYER_DATA.playerX, PLAYER_DATA.playerY);
}

function createBoxes($container, x, y) {
  const $box = document.createElement("img");
  $box.src = "res/box.jpg";
  $box.className = "box";
  $container.appendChild($box);
  const box = {
    x,
    y,
    $box,
  };
  setPosition($box, x, y);
  GAME_STATE.boxes.push(box);
}
function createbullet($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "res/bullet.png";
  $element.className = "bullet";
  $container.appendChild($element);
  const bullet = { x, y, $element };
  GAME_STATE.bullets.push(bullet);
  setPosition($element, x, y);
}
function createExplosion($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "res/explosion.png";
  $element.className = "explosion";
  $container.appendChild($element);
  setPosition($element, x, y);
  setTimeout(() => {
    $element.remove();
  }, 500);
}

function updatebullets(dt) {
  const bullets = GAME_STATE.bullets;
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    bullet.y -= dt * bullet_MAX_SPEED;
    setPosition(bullet.$element, bullet.x, bullet.y);
    const bull_hb = bullet.$element.getBoundingClientRect();
    const boxes = GAME_STATE.boxes;
    for (let j = 0; j < boxes.length; j++) {
      const box = GAME_STATE.boxes[j];
      const box_hb = box.$box.getBoundingClientRect();
      if (
        box_hb.left < bull_hb.left + bull_hb.width &&
        box_hb.left + box_hb.width > bull_hb.left &&
        box_hb.top < bull_hb.top + bull_hb.height &&
        box_hb.top + box_hb.height > bull_hb.top
      ) {
        GAME_STATE.score += 1;
        bullet.$element.remove();
        bullets.splice(i, 1);
        i--;
        createExplosion(
          document.querySelector(".game"),
          box_hb.left,
          box_hb.top
        );
        box.$box.remove();
        GAME_STATE.boxes.splice(j, 1);
        j--;
      }
    }
  }
}

function updatePlayer(dt, $container) {
  if (PLAYER_ACTIONS.leftPressed) {
    PLAYER_DATA.playerX -= dt * PLAYER_DATA.PLAYER_MAX_SPEED;
  }
  if (PLAYER_ACTIONS.rightPressed) {
    PLAYER_DATA.playerX += dt * PLAYER_DATA.PLAYER_MAX_SPEED;
  }
  if (PLAYER_ACTIONS.upPressed) {
    PLAYER_DATA.playerY -= dt * PLAYER_DATA.PLAYER_MAX_SPEED;
  }
  if (PLAYER_ACTIONS.downPressed) {
    PLAYER_DATA.playerY += dt * PLAYER_DATA.PLAYER_MAX_SPEED;
  }
  if (PLAYER_DATA.playerX < 0) {
    PLAYER_DATA.playerX = 0;
  }
  if (PLAYER_DATA.playerX > GAME_STATE.GAME_WIDTH - PLAYER_DATA.PLAYER_WIDTH) {
    PLAYER_DATA.playerX = GAME_STATE.GAME_WIDTH - PLAYER_DATA.PLAYER_WIDTH;
  }
  if (PLAYER_DATA.playerY < 0) {
    PLAYER_DATA.playerY = 0;
  }
  if (PLAYER_DATA.playerY > GAME_STATE.GAME_HEIGHT - PLAYER_DATA.PLAYER_WIDTH) {
    PLAYER_DATA.playerY = GAME_STATE.GAME_HEIGHT - PLAYER_DATA.PLAYER_WIDTH;
  }

  if (PLAYER_ACTIONS.spacePressed && PLAYER_DATA.playerCooldown <= 0) {
    createbullet(
      $container,
      PLAYER_DATA.playerX + 90,
      PLAYER_DATA.playerY - 10
    );
    PLAYER_DATA.playerCooldown = cooldown;
  } else {
    PLAYER_DATA.playerCooldown -= dt;
  }
  const player = document.querySelector(".player");
  setPosition(player, PLAYER_DATA.playerX, PLAYER_DATA.playerY);
}

function onKeyRight(e) {
  if (e.keyCode === 37) {
    PLAYER_ACTIONS.leftPressed = true;
  } else if (e.keyCode === 39) {
    PLAYER_ACTIONS.rightPressed = true;
  } else if (e.keyCode === 38) {
    PLAYER_ACTIONS.upPressed = true;
  } else if (e.keyCode === 40) {
    PLAYER_ACTIONS.downPressed = true;
  } else if (e.keyCode === 32) {
    PLAYER_ACTIONS.spacePressed = true;
  }
}

function onKeyLeft(e) {
  if (e.keyCode === 37) {
    PLAYER_ACTIONS.leftPressed = false;
  } else if (e.keyCode === 39) {
    PLAYER_ACTIONS.rightPressed = false;
  } else if (e.keyCode === 38) {
    PLAYER_ACTIONS.upPressed = false;
  } else if (e.keyCode === 40) {
    PLAYER_ACTIONS.downPressed = false;
  } else if (e.keyCode === 32) {
    PLAYER_ACTIONS.spacePressed = false;
  }
}

const $container = document.querySelector(".game");
createPlayer($container);
//Create 10 boxes at rate of 2 seconds between each box and at least 100 pixels away from the player and each other
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    const x = Math.random() * (GAME_STATE.GAME_WIDTH - 100);
    const y = Math.random() * (GAME_STATE.GAME_HEIGHT - 300);
    createBoxes($container, x, y);
  }, 2000 * i);
}

window.addEventListener("keydown", onKeyRight);
window.addEventListener("keyup", onKeyLeft);
window.requestAnimationFrame(update);
