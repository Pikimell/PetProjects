const refs = {
  formElem: document.querySelector(".js-form"),
  canvas: document.querySelector("canvas"),
};
const ctx = refs.canvas.getContext("2d");
let arrPoints = [];

const drawPoints = {
  prevPoint: -1,
  currentPoint: 0,
  nextPoint: 1,
};

refs.formElem.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = e.target.elements.data.value;
  loadData(data);
});
document.body.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    drawPoints.currentPoint = 0;
    drawPoints.prevPoint = -1;
    drawPoints.nextPoint = 1;
    if (arrPoints.length === 0) {
      arrPoints = JSON.parse(localStorage.getItem("dataPoint"));
    }
    draw();
  } else {
    drawPoints.currentPoint++;
    drawPoints.prevPoint++;
    drawPoints.nextPoint++;
    draw();
  }
});

function saveData() {
  localStorage.setItem("points", JSON.stringify(drawPoints));
}
function loadData(dataString) {
  arrPoints = dataString.split("\n");
  localStorage.setItem("dataPoint", JSON.stringify(arrPoints));
}

function draw() {
  const prevPoint = +(arrPoints[drawPoints.prevPoint] || 0);
  const currentPoint = +(arrPoints[drawPoints.currentPoint] || 0);
  const nextPoint = +(arrPoints[drawPoints.nextPoint] || 0);

  ctx.clearRect(0, 0, refs.canvas.width, refs.canvas.height);
  drawCircle(
    ctx,
    refs.canvas.width / 2 - 5,
    300,
    { x: refs.canvas.width / 2, y: refs.canvas.height / 2 },
    prevPoint,
    currentPoint,
    nextPoint
  );

  drawText(
    ctx,
    prevPoint,
    {
      x: refs.canvas.width / 2,
      y: refs.canvas.height / 2 - 200,
    },
    40
  );
  drawText(ctx, currentPoint, {
    x: refs.canvas.width / 2,
    y: refs.canvas.height / 2,
  });
  drawText(
    ctx,
    nextPoint,
    {
      x: refs.canvas.width / 2,
      y: refs.canvas.height / 2 + 200,
    },
    40
  );
}

function drawText(ctx, point, { x, y }, font = 100) {
  ctx.fillStyle = "black";
  ctx.font = `${font}px serif`;
  ctx.textAlign = "center";
  ctx.fillText(point, x, y);
}

function drawCircle(ctx, r, countPoint, center, ...points) {
  const radian = (Math.PI * 2) / countPoint;

  for (let i = 0; i < countPoint; i++) {
    let angle = radian * i;
    const endPoint = {
      x: r * Math.sin(angle) + center.x,
      y: r * Math.cos(angle) + center.y,
    };

    const minR = i % 10 == 0 ? 4 : 2;
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(endPoint.x, endPoint.y, minR, minR, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    let angle = radian * +points[i];
    const endPoint = {
      x: r * Math.sin(angle) + center.x,
      y: r * Math.cos(angle) + center.y,
    };
    let minR = 5;
    switch (i) {
      case 0:
        ctx.fillStyle = "green";
        break;
      case 1:
        ctx.fillStyle = "red";
        minR = 15;
        break;
      case 2:
        ctx.fillStyle = "blue";
        break;
    }

    ctx.beginPath();
    ctx.ellipse(endPoint.x, endPoint.y, minR, minR, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
