export class Laze {
  #MAX_LEN = 499;
  #LAZE = [];
  #LEN_X = 0;
  #LEN_Y = 0;
  #BLOCK_WIDTH = 20;
  #CANVAS;
  user = new User();

  constructor(lenX = 0, lenY = 0, canvas) {
    this.#LEN_Y = lenY;
    this.#LEN_X = lenX;

    canvas.height = lenY * this.#BLOCK_WIDTH;
    canvas.width = lenX * this.#BLOCK_WIDTH;

    this.#CANVAS = canvas.getContext("2d");
    this.user.setMap(this.#LAZE);
  }

  initLaze() {
    this.#CANVAS.clearRect(
      0,
      0,
      this.#CANVAS.canvas.width,
      this.#CANVAS.canvas.height
    );
    const laze = this.#LAZE;
    while (laze.length > 0) {
      laze.shift(); //clear laze
    }

    for (let i = 0; i < this.#LEN_Y; i++) {
      laze.push([]);
      for (let j = 0; j < this.#LEN_X; j++) {
        laze[i].push("#");
      }
    }
  }

  showGenerateLaze() {
    const idInterval = setInterval(() => {
      let { x: oldX, y: oldY } = this.user.position;
      this.user.moveRandom();

      let { x, y } = this.user.position;
      let avgX = (oldX + x) / 2;
      let avgY = (oldY + y) / 2;
      if (this.#LAZE[y][x] === "#") this.#LAZE[avgY][avgX] = " ";
      this.#LAZE[y][x] = " ";

      if (this.isLazeFill()) {
        clearInterval(idInterval);
        this.user.resetPosition();
      }
      this.showLaze();
    }, 10);
  }

  generateLaze() {
    while (!this.isLazeFill()) {
      let { x: oldX, y: oldY } = this.user.position;
      this.user.moveRandom();
      let { x, y } = this.user.position;
      let avgX = (oldX + x) / 2;
      let avgY = (oldY + y) / 2;
      if (this.#LAZE[y][x] === "#") this.#LAZE[avgY][avgX] = " ";
      this.#LAZE[y][x] = " ";
    }
    this.user.resetPosition();
    this.showLaze();
  }

  showLaze() {
    const laze = this.#LAZE;
    const userPos = this.user.position;
    for (let i = 0; i < this.#LEN_Y; i++) {
      for (let j = 0; j < this.#LEN_X; j++) {
        let color;
        switch (laze[i][j]) {
          case " ":
            color = "white";
            break;
          case "#":
            color = "black";
            break;
          case "*":
            color = "red";
            break;
          default:
            color = "tomato";
            break;
        }
        this.#fillRect(color, j, i);
      }
    }
    this.#fillRect("white", this.#LAZE[0].length - 1, this.#LAZE.length - 2);
    if (userPos.x > 1 && userPos.y > 1)
      this.#fillRect("red", userPos.x, userPos.y);
  }

  #fillRect(color, x, y) {
    this.#CANVAS.fillStyle = color;
    this.#CANVAS.fillRect(
      x * this.#BLOCK_WIDTH,
      y * this.#BLOCK_WIDTH,
      this.#BLOCK_WIDTH,
      this.#BLOCK_WIDTH
    );
  }

  createLaze(show = false) {
    this.initLaze();
    this.showLaze();
    if (show) this.generateLaze();
    else this.showGenerateLaze();
  }

  isLazeFill() {
    for (let i = 1; i < this.#LEN_Y; i += 2) {
      for (let j = 1; j < this.#LEN_X; j += 2) {
        if (this.#LAZE[i][j] === "#") return false;
      }
    }
    return true;
  }

  get blockWidth() {
    return this.#BLOCK_WIDTH;
  }

  setWidth(width) {
    if (width > 5) {
      this.#LEN_X = +width % 2 == 0 ? +width + 1 : width;
      if (this.#LEN_X > this.#MAX_LEN) this.#LEN_X = this.#MAX_LEN;
    }
  }

  setHeight(height) {
    if (height > 5) {
      this.#LEN_Y = +height % 2 == 0 ? +height + 1 : height;
      if (this.#LEN_Y > this.#MAX_LEN) this.#LEN_Y = this.#MAX_LEN;
    }
  }

  resetSize(height, width) {
    this.setHeight(height);
    this.setWidth(width);
  }
}

// ================================================================
class User {
  #position = {
    x: 1,
    y: 1,
  };
  #map = [];
  #DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
  };

  setMap(laze) {
    this.#map = laze;
  }

  move(direction) {
    switch (direction) {
      case this.direction.UP:
        this.#moveUp();
        break;
      case this.direction.DOWN:
        this.#moveDown();
        break;
      case this.direction.LEFT:
        this.#moveLeft();
        break;
      case this.direction.RIGHT:
        this.#moveRight();
        break;
    }
  }

  moveRandom() {
    const rand = Math.floor(Math.random() * 4);
    const randDirection = Object.values(this.#DIRECTIONS)[rand];
    this.move(randDirection);
  }

  #moveLeft() {
    if (this.#position.x > 2) this.#position.x -= 2;
  }
  #moveRight() {
    if (this.#position.x < this.#map[0].length - 3) this.#position.x += 2;
  }
  #moveUp() {
    if (this.#position.y > 2) this.#position.y -= 2;
  }
  #moveDown() {
    if (this.#position.y < this.#map.length - 3) this.#position.y += 2;
  }

  get direction() {
    return {
      ...this.#DIRECTIONS,
    };
  }
  get position() {
    return this.#position;
  }
  resetPosition() {
    this.#position.x = 1;
    this.#position.y = 1;
  }
}
