const lines = [
  "collect | verify | connect the dots",
  "root@OSINTrahat:~# online",
  "public noise → signal"
];
const el = document.getElementById("typewriter");
let li = 0, ci = 0, del = false;
function tick() {
  const cur = lines[li];
  el.textContent = "> " + cur.slice(0, ci);
  if (!del && ci < cur.length) { ci++; setTimeout(tick, 55); return; }
  if (!del && ci === cur.length) { del = true; setTimeout(tick, 1400); return; }
  if (del && ci > 0) { ci--; setTimeout(tick, 28); return; }
  del = false; li = (li + 1) % lines.length; setTimeout(tick, 250);
}
tick();

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
function size() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
size();
addEventListener("resize", size);
const glyphs = "01アイウエオカキクケコOSINT$#<>/\\";
const font = 14;
let cols = Math.ceil(innerWidth / font);
let drops = Array.from({ length: cols }, () => Math.random() * -40);
function draw() {
  ctx.fillStyle = "rgba(3,8,5,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff41";
  ctx.font = font + "px monospace";
  cols = Math.ceil(canvas.width / font);
  if (drops.length < cols) drops = drops.concat(Array(cols - drops.length).fill(0));
  for (let i = 0; i < cols; i++) {
    const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillText(ch, i * font, drops[i] * font);
    if (drops[i] * font > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(draw);
}
draw();
