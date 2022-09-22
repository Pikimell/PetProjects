import { Circle } from "./circle.js";

const refs = {
  canvas: document.querySelector(".js-canvas1"),
  canvas2: document.querySelector(".js-canvas2"),
  saveBtn: document.querySelector(".js-save-btn"),
};

const circlesX = [];
const circlesY = [];
const LEN = 10;
const LENX = LEN;
const LENY = LEN;
const CIRCLE_RADIUS = 50;

refs.canvas.width = LENX * (CIRCLE_RADIUS * 2 + 20);
refs.canvas.height = LENY * (CIRCLE_RADIUS * 2 + 20);
refs.canvas2.width = LENX * (CIRCLE_RADIUS * 2 + 20);
refs.canvas2.height = LENY * (CIRCLE_RADIUS * 2 + 20);

for (let i = 0; i < LENX; i++) {
  const center = {
    x: i * (CIRCLE_RADIUS * 2 + 20),
    y: 0 * (CIRCLE_RADIUS * 2 + 20),
  };
  circlesX[i] = new Circle(refs.canvas, center, i + 1, CIRCLE_RADIUS);
}
for (let i = 0; i < LENY; i++) {
  const center = {
    x: 0 * (CIRCLE_RADIUS * 2 + 20),
    y: i * (CIRCLE_RADIUS * 2 + 20),
  };
  circlesY[i] = new Circle(refs.canvas, center, i + 1, CIRCLE_RADIUS);
}

function drawCircles() {
  for (let i = 1; i < LENX; i++) {
    circlesX[i].nextIteration();
    circlesX[i].show();
  }
  for (let i = 1; i < LENY; i++) {
    circlesY[i].nextIteration();
    circlesY[i].show();
  }

  for (let i = 1; i < LENX; i++) {
    for (let j = 1; j < LENY; j++) {
      const x = circlesX[i].currentPoint.x;
      const y = circlesY[j].currentPoint.y;
      drawPoint(x, y);

      // drawLine(circlesX[i].currentPoint, {
      //   x: x,
      //   y: circlesY[j].currentPoint.y,
      // });

      // drawLine(circlesY[j].currentPoint, {
      //   x: circlesX[i].currentPoint.x,
      //   y: circlesY[j].currentPoint.y,
      // });
    }
  }
}

function drawPoint(x, y) {
  const RADIUS = 5;
  const canvas = refs.canvas2.getContext("2d");
  canvas.fillStyle = "blue";
  canvas.beginPath();
  canvas.ellipse(x, y, RADIUS, RADIUS, 0, 0, 2 * Math.PI);
  canvas.fill();
  canvas.beginPath();
  canvas.fillStyle = "black";
}

function drawLine(startPos, endPos) {
  Circle.canvas.moveTo(startPos.x, startPos.y);
  Circle.canvas.lineTo(endPos.x, endPos.y);
  Circle.canvas.stroke();
}

refs.saveBtn.addEventListener("click", () => {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "CanvasAsImage.png");
  let dataURL = refs.canvas2.toDataURL("image/png");
  let url = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
});

setInterval(() => {
  Circle.clearCanvas();
  drawCircles();
}, 10);
