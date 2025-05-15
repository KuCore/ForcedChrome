const canvas = document.getElementById("portal");
const ctx = canvas.getContext("2d");

// Größe setzen & anpassen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Maus- oder Fingerposition tracken
let pointerX = canvas.width / 2;
let pointerY = canvas.height / 2;

function updatePointer(x, y) {
  pointerX = x;
  pointerY = y;
}

// Mausbewegung
document.addEventListener("mousemove", (e) => {
  updatePointer(e.clientX, e.clientY);
});

// Touchbewegung
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  updatePointer(touch.clientX, touch.clientY);
}, { passive: true });

function drawSpalt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const proximity = 1 - Math.min(1, Math.abs(pointerX - centerX) / 300);
  const glow = 50 + proximity * 100;
  const opacity = 0.1 + proximity * 0.4 + Math.random() * 0.1;

  // Gradient für Licht
  const gradient = ctx.createLinearGradient(0, centerY - 200, 0, centerY + 200);
  gradient.addColorStop(0, `rgba(255,255,255,${opacity * 0.2})`);
  gradient.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
  gradient.addColorStop(1, `rgba(255,255,255,${opacity * 0.2})`);

  // Der Lichtstreifen selbst
  ctx.fillStyle = gradient;
  ctx.fillRect(centerX - 2, centerY - 200, 4, 400);

  // Weicher Glow-Effekt
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
