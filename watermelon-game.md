---
layout: page
title: 🍉 수박 게임 (과일 합치기)
subtitle: 같은 과일을 합쳐 더 큰 과일로! 최종 목표는 수박을 만드세요!
permalink: /watermelon-game/
---

<style>
/* ===== 게임 전체 컨테이너 ===== */
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 10px;
  font-family: 'Segoe UI', 'Malgun Gothic', sans-serif;
  user-select: none;
}

/* ===== 상단 정보 바 ===== */
.game-info-bar {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
.info-card {
  background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 12px 24px;
  text-align: center;
  min-width: 100px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.info-label {
  font-size: 0.7rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.info-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.score-value { color: #ffd700; }
.best-value  { color: #ff9f43; }
.level-value { color: #54a0ff; }

/* ===== 캔버스 래퍼 ===== */
.canvas-wrapper {
  position: relative;
  display: inline-block;
}
#gameCanvas {
  display: block;
  border-radius: 16px;
  cursor: crosshair;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.05);
  background: #0d0d1a;
  touch-action: none;
}

/* ===== 다음 과일 미리보기 ===== */
.next-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 12px 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.next-label {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}
#nextFruitCanvas {
  border-radius: 8px;
}

/* ===== 버튼 ===== */
.game-buttons {
  display: flex;
  gap: 12px;
}
.btn-game {
  padding: 12px 28px;
  border-radius: 12px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
}
.btn-restart {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 4px 15px rgba(238,90,36,0.4);
}
.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(238,90,36,0.6);
}
.btn-sound {
  background: linear-gradient(135deg, #2a2a3e, #1e1e2e);
  color: #ccc;
  border: 1px solid rgba(255,255,255,0.1);
}
.btn-sound:hover {
  background: linear-gradient(135deg, #3a3a4e, #2e2e3e);
  color: white;
}

/* ===== 과일 범례 ===== */
.fruit-legend {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 420px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 16px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.07);
}
.fruit-legend-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 0.62rem;
  color: #aaa;
}
.fruit-legend-emoji {
  font-size: 1.4rem;
  line-height: 1;
}

/* ===== 게임오버 오버레이 ===== */
#gameOverlay {
  display: none;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.82);
  border-radius: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
  backdrop-filter: blur(4px);
}
#gameOverlay.active { display: flex; }
.overlay-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #ff6b6b;
  text-shadow: 0 0 20px rgba(255,107,107,0.5);
}
.overlay-score {
  font-size: 1.1rem;
  color: #ffd700;
  font-weight: 600;
}
.overlay-btn {
  margin-top: 8px;
  padding: 14px 36px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 20px rgba(238,90,36,0.4);
}
.overlay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(238,90,36,0.6);
}

/* ===== 게임 설명 ===== */
.game-howto {
  max-width: 420px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 16px;
  padding: 16px 20px;
  border: 1px solid rgba(255,255,255,0.07);
  font-size: 0.82rem;
  color: #aaa;
  line-height: 1.7;
}
.game-howto h4 {
  color: #ffd700;
  margin-bottom: 8px;
  font-size: 0.9rem;
  margin-top: 0;
}
.game-howto li { margin-bottom: 3px; }
</style>

<div class="game-wrapper">

  <!-- 상단 정보 -->
  <div class="game-info-bar">
    <div class="info-card">
      <div class="info-label">점수</div>
      <div class="info-value score-value" id="scoreDisplay">0</div>
    </div>
    <div class="info-card">
      <div class="info-label">최고 점수</div>
      <div class="info-value best-value" id="bestDisplay">0</div>
    </div>
    <div class="next-preview">
      <div class="next-label">Next</div>
      <canvas id="nextFruitCanvas" width="60" height="60"></canvas>
    </div>
  </div>

  <!-- 캔버스 -->
  <div class="canvas-wrapper">
    <canvas id="gameCanvas" width="400" height="550"></canvas>
    <div id="gameOverlay">
      <div class="overlay-title">💥 GAME OVER</div>
      <div class="overlay-score" id="overlayScore">점수: 0</div>
      <div class="overlay-score" id="overlayBest">최고: 0</div>
      <button class="overlay-btn" onclick="restartGame()">다시 시작 🍎</button>
    </div>
  </div>

  <!-- 버튼 -->
  <div class="game-buttons">
    <button class="btn-game btn-restart" onclick="restartGame()">🔄 다시 시작</button>
    <button class="btn-game btn-sound" id="soundBtn" onclick="toggleSound()">🔊 소리</button>
  </div>

  <!-- 과일 범례 -->
  <div class="fruit-legend" id="fruitLegend"></div>

  <!-- 게임 방법 -->
  <div class="game-howto">
    <h4>🎮 게임 방법</h4>
    <ul>
      <li>🖱️ 마우스를 움직여 과일 위치를 선택, 클릭하여 떨어뜨리세요.</li>
      <li>📱 모바일: 터치로 조작 가능합니다.</li>
      <li>🍎 같은 과일끼리 닿으면 더 큰 과일로 합쳐집니다!</li>
      <li>⬆️ 합칠수록 점수가 올라갑니다.</li>
      <li>🍉 최종 목표: 수박을 만들어보세요!</li>
      <li>💥 과일이 위쪽 경계선을 넘으면 게임 오버!</li>
    </ul>
  </div>

</div>

<script>
(function() {
'use strict';

// ==================== 과일 데이터 ====================
const FRUITS = [
  { name: '체리',     emoji: '🍒', radius: 15,  color: '#c0392b', points: 1   },
  { name: '딸기',     emoji: '🍓', radius: 20,  color: '#e74c3c', points: 3   },
  { name: '포도',     emoji: '🍇', radius: 26,  color: '#8e44ad', points: 6   },
  { name: '레몬',     emoji: '🍋', radius: 32,  color: '#f1c40f', points: 10  },
  { name: '오렌지',   emoji: '🍊', radius: 38,  color: '#e67e22', points: 15  },
  { name: '사과',     emoji: '🍎', radius: 45,  color: '#e74c3c', points: 21  },
  { name: '배',       emoji: '🍐', radius: 52,  color: '#27ae60', points: 28  },
  { name: '복숭아',   emoji: '🍑', radius: 58,  color: '#fa8231', points: 36  },
  { name: '파인애플', emoji: '🍍', radius: 65,  color: '#f9ca24', points: 45  },
  { name: '멜론',     emoji: '🍈', radius: 72,  color: '#6ab04c', points: 55  },
  { name: '수박',     emoji: '🍉', radius: 80,  color: '#ee5a24', points: 66  },
];

const MAX_DROP_INDEX = 4; // 0~4번 과일만 드롭 가능
const WALL_X = 400;
const WALL_Y = 550;
const DANGER_Y = 80; // 이 이상 올라가면 게임오버

// ==================== 물리 상수 ====================
const GRAVITY     = 0.4;
const DAMPING     = 0.55;
const FRICTION    = 0.85;
const OVERLAP_RESOLVE = 0.45;
const MAX_SPEED   = 18;
const SUBSTEPS    = 4;

// ==================== 상태 ====================
let fruits = [];
let score = 0;
let bestScore = parseInt(localStorage.getItem('appleGameBest') || '0');
let currentDropIndex = 0;
let nextDropIndex = 0;
let canDrop = true;
let dropCooldown = 0;
let mouseX = WALL_X / 2;
let gameOver = false;
let mergeParticles = [];
let soundEnabled = true;
let animId = null;
let gameOverTimer = 0;
let gameOverTriggered = false;

// ==================== 캔버스 ====================
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextFruitCanvas');
const nextCtx    = nextCanvas.getContext('2d');

// ==================== 오디오 ====================
const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playMergeSound(radius) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const freq = 400 + (radius / 80) * 400;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch(e) {}
}

function playDropSound() {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
  } catch(e) {}
}

// ==================== 과일 클래스 ====================
class Fruit {
  constructor(x, y, typeIndex, vx = 0, vy = 0) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.typeIndex = typeIndex;
    this.r = FRUITS[typeIndex].radius;
    this.merged = false;
    this.justDropped = true;
    this.dropTimer = 18;
    this.emoji = FRUITS[typeIndex].emoji;
    this.color = FRUITS[typeIndex].color;
    this.scale = 0.1;
    this.opacity = 0;
    this.spinAngle = Math.random() * Math.PI * 2;
    this.spinSpeed = (Math.random() - 0.5) * 0.05;
    this.glowAlpha = 0;
  }

  update() {
    // 스폰 애니메이션
    if (this.scale < 1) {
      this.scale = Math.min(1, this.scale + 0.12);
      this.opacity = Math.min(1, this.opacity + 0.15);
    }
    if (this.dropTimer > 0) {
      this.dropTimer--;
      if (this.dropTimer <= 0) this.justDropped = false;
    }

    this.vy += GRAVITY;
    if (this.vy > MAX_SPEED) this.vy = MAX_SPEED;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= FRICTION;
    this.spinAngle += this.spinSpeed;
    if (this.glowAlpha > 0) this.glowAlpha -= 0.04;

    // 벽 충돌
    if (this.x - this.r < 0) { this.x = this.r; this.vx = Math.abs(this.vx) * DAMPING; }
    if (this.x + this.r > WALL_X) { this.x = WALL_X - this.r; this.vx = -Math.abs(this.vx) * DAMPING; }
    if (this.y + this.r > WALL_Y) {
      this.y = WALL_Y - this.r;
      this.vy = -Math.abs(this.vy) * DAMPING;
      this.vx *= FRICTION;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.spinAngle);

    // 그림자 / 글로우
    if (this.glowAlpha > 0) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20 * this.glowAlpha;
    }

    // 원 그리기
    const grad = ctx.createRadialGradient(-this.r * 0.3, -this.r * 0.3, this.r * 0.1, 0, 0, this.r);
    grad.addColorStop(0, lightenColor(this.color, 60));
    grad.addColorStop(0.6, this.color);
    grad.addColorStop(1, darkenColor(this.color, 40));
    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // 하이라이트
    ctx.beginPath();
    ctx.arc(-this.r * 0.25, -this.r * 0.3, this.r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();

    // 이모지
    ctx.rotate(-this.spinAngle);
    ctx.font = `${this.r * 1.1}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText(this.emoji, 0, 0);

    ctx.restore();
  }
}

// ==================== 파티클 ====================
class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.color = color;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = Math.random() * -6 - 2;
    this.life = 1;
    this.decay = 0.03 + Math.random() * 0.04;
    this.r = 3 + Math.random() * 4;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15;
    this.life -= this.decay;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// ==================== 색상 유틸 ====================
function lightenColor(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xFF) + amount);
  const b = Math.min(255, (num & 0xFF) + amount);
  return `rgb(${r},${g},${b})`;
}
function darkenColor(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xFF) - amount);
  const b = Math.max(0, (num & 0xFF) - amount);
  return `rgb(${r},${g},${b})`;
}

// ==================== 게임 초기화 ====================
function initGame() {
  fruits = [];
  score = 0;
  gameOver = false;
  gameOverTimer = 0;
  gameOverTriggered = false;
  canDrop = true;
  dropCooldown = 0;
  mergeParticles = [];
  currentDropIndex = Math.floor(Math.random() * (MAX_DROP_INDEX + 1));
  nextDropIndex    = Math.floor(Math.random() * (MAX_DROP_INDEX + 1));
  updateDisplays();
  document.getElementById('gameOverlay').classList.remove('active');
  buildFruitLegend();
  if (animId) cancelAnimationFrame(animId);
  gameLoop();
}

function buildFruitLegend() {
  const legend = document.getElementById('fruitLegend');
  legend.innerHTML = '';
  FRUITS.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'fruit-legend-item';
    item.innerHTML = `<span class="fruit-legend-emoji">${f.emoji}</span><span>${f.name}</span><span style="color:#ffd700">+${f.points}</span>`;
    legend.appendChild(item);
  });
}

function updateDisplays() {
  document.getElementById('scoreDisplay').textContent = score.toLocaleString();
  document.getElementById('bestDisplay').textContent  = bestScore.toLocaleString();
  drawNextFruit();
}

function drawNextFruit() {
  nextCtx.clearRect(0, 0, 60, 60);
  const f = FRUITS[nextDropIndex];
  const cx = 30, cy = 30;
  const r = Math.min(f.radius, 24);

  const grad = nextCtx.createRadialGradient(cx - r*0.3, cy - r*0.3, r*0.1, cx, cy, r);
  grad.addColorStop(0, lightenColor(f.color, 60));
  grad.addColorStop(0.6, f.color);
  grad.addColorStop(1, darkenColor(f.color, 40));
  nextCtx.beginPath();
  nextCtx.arc(cx, cy, r, 0, Math.PI * 2);
  nextCtx.fillStyle = grad;
  nextCtx.fill();

  nextCtx.font = `${r * 1.1}px serif`;
  nextCtx.textAlign = 'center';
  nextCtx.textBaseline = 'middle';
  nextCtx.fillText(f.emoji, cx, cy);
}

// ==================== 드롭 ====================
function dropFruit(x) {
  if (!canDrop || gameOver) return;
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();

  const f = FRUITS[currentDropIndex];
  const clampedX = Math.max(f.radius, Math.min(WALL_X - f.radius, x));
  const newFruit = new Fruit(clampedX, DANGER_Y - 10, currentDropIndex, 0, 0);
  fruits.push(newFruit);

  playDropSound();
  currentDropIndex = nextDropIndex;
  nextDropIndex = Math.floor(Math.random() * (MAX_DROP_INDEX + 1));
  canDrop = false;
  dropCooldown = 30;
  updateDisplays();
}

// ==================== 충돌 감지 & 합치기 ====================
function checkCollisions() {
  const toMerge = [];
  const len = fruits.length;

  for (let i = 0; i < len; i++) {
    const a = fruits[i];
    if (a.merged) continue;

    for (let j = i + 1; j < len; j++) {
      const b = fruits[j];
      if (b.merged) continue;
      if (a.justDropped && b.justDropped) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const minDist = a.r + b.r;

      if (dist < minDist) {
        if (a.typeIndex === b.typeIndex && a.typeIndex < FRUITS.length - 1) {
          // 같은 과일 → 합치기
          if (!a.merged && !b.merged) {
            a.merged = true;
            b.merged = true;
            toMerge.push([a, b]);
          }
        } else {
          // 물리 충돌 해결
          if (dist < 0.01) continue;
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = (minDist - dist) * OVERLAP_RESOLVE;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          const relVx = b.vx - a.vx;
          const relVy = b.vy - a.vy;
          const dot = relVx * nx + relVy * ny;
          if (dot < 0) {
            const impulse = dot * DAMPING;
            a.vx += nx * impulse;
            a.vy += ny * impulse;
            b.vx -= nx * impulse;
            b.vy -= ny * impulse;
          }
        }
      }
    }
  }

  // 합치기 처리
  for (const [a, b] of toMerge) {
    const newIndex = a.typeIndex + 1;
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2;
    const vx = (a.vx + b.vx) * 0.4;
    const vy = (a.vy + b.vy) * 0.4 - 1;

    const merged = new Fruit(cx, cy, newIndex, vx, vy);
    merged.glowAlpha = 1;
    merged.justDropped = false;
    merged.dropTimer = 0;
    fruits.push(merged);

    // 점수 추가
    score += FRUITS[newIndex].points;
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem('appleGameBest', bestScore);
    }
    updateDisplays();

    // 파티클
    for (let p = 0; p < 12; p++) {
      mergeParticles.push(new Particle(cx, cy, FRUITS[newIndex].color));
    }
    playMergeSound(FRUITS[newIndex].radius);
  }

  // 합쳐진 과일 제거
  fruits = fruits.filter(f => !f.merged);
}

// ==================== 게임오버 체크 ====================
function checkGameOver() {
  if (gameOver) return;
  const anyDanger = fruits.some(f => {
    return !f.justDropped && f.y - f.r < DANGER_Y;
  });
  if (anyDanger) {
    gameOverTimer++;
    if (gameOverTimer > 45) triggerGameOver();
  } else {
    gameOverTimer = 0;
  }
}

function triggerGameOver() {
  if (gameOverTriggered) return;
  gameOverTriggered = true;
  gameOver = true;
  document.getElementById('overlayScore').textContent = '점수: ' + score.toLocaleString();
  document.getElementById('overlayBest').textContent  = '최고: ' + bestScore.toLocaleString();
  document.getElementById('gameOverlay').classList.add('active');
}

// ==================== 드롭 가이드라인 ====================
function drawDropGuide() {
  if (!canDrop || gameOver) return;
  const f = FRUITS[currentDropIndex];
  const clampedX = Math.max(f.radius, Math.min(WALL_X - f.radius, mouseX));

  // 점선
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.moveTo(clampedX, DANGER_Y);
  ctx.lineTo(clampedX, WALL_Y);
  ctx.stroke();
  ctx.setLineDash([]);

  // 미리보기 과일
  ctx.globalAlpha = 0.55;
  const grad = ctx.createRadialGradient(
    clampedX - f.radius*0.3, DANGER_Y - 10 - f.radius*0.3, f.radius*0.1,
    clampedX, DANGER_Y - 10, f.radius
  );
  grad.addColorStop(0, lightenColor(f.color, 60));
  grad.addColorStop(0.6, f.color);
  grad.addColorStop(1, darkenColor(f.color, 40));
  ctx.beginPath();
  ctx.arc(clampedX, DANGER_Y - 10, f.radius, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.globalAlpha = 0.6;
  ctx.font = `${f.radius * 1.1}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(f.emoji, clampedX, DANGER_Y - 10);
  ctx.restore();
}

// ==================== 메인 루프 ====================
function gameLoop() {
  ctx.clearRect(0, 0, WALL_X, WALL_Y);

  // 배경 그라디언트
  const bg = ctx.createLinearGradient(0, 0, 0, WALL_Y);
  bg.addColorStop(0, '#0d0d1a');
  bg.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WALL_X, WALL_Y);

  // 격자 패턴
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= WALL_X; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, WALL_Y); ctx.stroke();
  }
  for (let y = 0; y <= WALL_Y; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(WALL_X, y); ctx.stroke();
  }

  // 위험선
  ctx.save();
  const dangerGrad = ctx.createLinearGradient(0, DANGER_Y, WALL_X, DANGER_Y);
  dangerGrad.addColorStop(0, 'rgba(255,100,100,0)');
  dangerGrad.addColorStop(0.5, 'rgba(255,100,100,0.7)');
  dangerGrad.addColorStop(1, 'rgba(255,100,100,0)');
  ctx.strokeStyle = dangerGrad;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(0, DANGER_Y);
  ctx.lineTo(WALL_X, DANGER_Y);
  ctx.stroke();
  ctx.setLineDash([]);

  // 위험선 텍스트
  ctx.font = '10px "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(255,100,100,0.6)';
  ctx.textAlign = 'right';
  ctx.fillText('⚠ 여기를 넘으면 GAME OVER!', WALL_X - 8, DANGER_Y - 5);
  ctx.restore();

  // 벽 하이라이트
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1, DANGER_Y);
  ctx.lineTo(1, WALL_Y);
  ctx.lineTo(WALL_X - 1, WALL_Y);
  ctx.lineTo(WALL_X - 1, DANGER_Y);
  ctx.stroke();
  ctx.restore();

  if (!gameOver) {
    // 물리 업데이트 (서브스텝)
    for (let s = 0; s < SUBSTEPS; s++) {
      for (const f of fruits) f.update();
      checkCollisions();
    }
    checkGameOver();

    // 드롭 쿨다운
    if (!canDrop) {
      dropCooldown--;
      if (dropCooldown <= 0) canDrop = true;
    }
  }

  // 파티클 업데이트 & 그리기
  mergeParticles = mergeParticles.filter(p => p.life > 0);
  for (const p of mergeParticles) { p.update(); p.draw(ctx); }

  // 과일 그리기
  for (const f of fruits) f.draw(ctx);

  // 드롭 가이드
  drawDropGuide();

  animId = requestAnimationFrame(gameLoop);
}

// ==================== 이벤트 리스너 ====================
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  mouseX = (e.clientX - rect.left) * scaleX;
});

canvas.addEventListener('click', e => {
  if (gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  dropFruit((e.clientX - rect.left) * scaleX);
});

// 터치 지원
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  mouseX = (e.touches[0].clientX - rect.left) * scaleX;
}, { passive: false });

canvas.addEventListener('touchend', e => {
  e.preventDefault();
  if (gameOver) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  dropFruit((e.changedTouches[0].clientX - rect.left) * scaleX);
}, { passive: false });

// ==================== 글로벌 함수 ====================
window.restartGame = function() {
  if (animId) cancelAnimationFrame(animId);
  initGame();
};

window.toggleSound = function() {
  soundEnabled = !soundEnabled;
  document.getElementById('soundBtn').textContent = soundEnabled ? '🔊 소리' : '🔇 소리';
};

// ==================== 시작! ====================
initGame();

})();
</script>
