const canvas = document.getElementById("portal");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mausposition
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawSpalt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const proximity = 1 - Math.min(1, Math.abs(mouseX - centerX) / 300);
  const glow = 50 + proximity * 100;
  const opacity = 0.1 + proximity * 0.5 + Math.random() * 0.1;

  // Licht-Spalt zeichnen
  const gradient = ctx.createLinearGradient(0, centerY - 200, 0, centerY + 200);
  gradient.addColorStop(0, `rgba(255,255,255,${opacity * 0.2})`);
  gradient.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
  gradient.addColorStop(1, `rgba(255,255,255,${opacity * 0.2})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(centerX - 2, centerY - 200, 4, 400);

  // Glow-Effekt
  ctx.beginPath();
  ctx.shadowColor = `rgba(255,255,255,${opacity})`;
  ctx.shadowBlur = glow;
  ctx.fillStyle = "rgba(255,255,255,0.01)";
  ctx.fillRect(centerX - 1, centerY - 200, 2, 400);
  ctx.closePath();
}

function animate() {
  drawSpalt();
  requestAnimationFrame(animate);
}

animate();
