---
layout: page
title: 🍎 사과 게임 (フルーツボックス)
subtitle: 합이 10이 되도록 사과를 골라라! 제한 시간 안에 최고 점수에 도전하세요!
permalink: /fruit-box-game/
---

<style>
/* ===== Google Font ===== */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');

/* ===== 전체 래퍼 ===== */
.fb-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 16px 8px 32px;
  font-family: 'Nunito', 'Segoe UI', 'Malgun Gothic', sans-serif;
  user-select: none;
  -webkit-user-select: none;
}

/* ===== 상단 HUD ===== */
.fb-hud {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.fb-card {
  background: linear-gradient(135deg, #2d5a27, #3a7a32);
  border: 2px solid #5cb85c;
  border-radius: 14px;
  padding: 10px 20px;
  text-align: center;
  min-width: 90px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
}
.fb-card-label {
  font-size: 0.65rem;
  color: #a8d8a8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 3px;
}
.fb-card-value {
  font-size: 1.7rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.fb-score-val { color: #ffd700; }
.fb-best-val  { color: #ffb347; }

/* 타이머 카드 */
.fb-timer-card {
  background: linear-gradient(135deg, #2d5a27, #3a7a32);
  border: 2px solid #5cb85c;
  border-radius: 14px;
  padding: 10px 20px;
  min-width: 140px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15);
}
.fb-timer-label {
  font-size: 0.65rem;
  color: #a8d8a8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  text-align: center;
}
.fb-timer-bar-bg {
  width: 100%;
  height: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 4px;
}
.fb-timer-bar-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.1s linear, background-color 0.3s;
  background: linear-gradient(90deg, #5cb85c, #8edd8e);
  width: 100%;
}
.fb-timer-text {
  font-size: 0.85rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
}

/* ===== 캔버스 영역 ===== */
.fb-canvas-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 0 3px #5cb85c, 0 0 0 6px rgba(92,184,92,0.3);
}
#fbCanvas {
  display: block;
  border-radius: 14px;
  cursor: crosshair;
  touch-action: none;
}

/* ===== 현재 선택 합 표시 ===== */
#fbSumIndicator {
  position: absolute;
  top: -38px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.85);
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  padding: 5px 18px;
  border-radius: 20px;
  border: 2px solid rgba(255,255,255,0.2);
  display: none;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(4px);
}
#fbSumIndicator.sum-ok  { background: rgba(76,175,80,0.95); border-color: #81c784; }
#fbSumIndicator.sum-bad { background: rgba(183,28,28,0.9);  border-color: #ef9a9a; }

/* ===== 게임 오버레이 ===== */
#fbOverlay {
  display: none;
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.88);
  border-radius: 14px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  z-index: 20;
  backdrop-filter: blur(6px);
}
#fbOverlay.active { display: flex; }
.fb-overlay-emoji  { font-size: 3.5rem; line-height: 1; animation: fb-bounce 0.6s ease infinite alternate; }
@keyframes fb-bounce { from { transform: scale(1); } to { transform: scale(1.15); } }
.fb-overlay-title  { font-size: 2rem; font-weight: 900; color: #ffd700; text-shadow: 0 0 20px rgba(255,215,0,0.5); }
.fb-overlay-sub    { font-size: 1rem; color: #ccc; }
.fb-overlay-score  { font-size: 1.4rem; font-weight: 900; color: #fff; }
.fb-overlay-best   { font-size: 0.9rem; color: #ffb347; }
.fb-overlay-btn {
  margin-top: 6px;
  padding: 13px 40px;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(76,175,80,0.5);
  transition: transform 0.15s, box-shadow 0.15s;
  font-family: 'Nunito', sans-serif;
}
.fb-overlay-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(76,175,80,0.7); }

/* ===== 버튼 ===== */
.fb-buttons { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.fb-btn {
  padding: 10px 24px;
  border-radius: 50px;
  border: none;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  font-family: 'Nunito', sans-serif;
  letter-spacing: 0.3px;
}
.fb-btn:hover { transform: translateY(-2px); }
.fb-btn-reset {
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: #fff;
  box-shadow: 0 4px 14px rgba(46,125,50,0.4);
}
.fb-btn-reset:hover { box-shadow: 0 6px 20px rgba(46,125,50,0.6); }

/* ===== 게임 설명 ===== */
.fb-howto {
  max-width: 660px;
  background: linear-gradient(135deg, #1b3a1a, #223d21);
  border: 1px solid rgba(92,184,92,0.3);
  border-radius: 16px;
  padding: 16px 22px;
  font-size: 0.82rem;
  color: #b8d8b8;
  line-height: 1.8;
  width: 100%;
  box-sizing: border-box;
}
.fb-howto h4 { color: #ffd700; margin: 0 0 10px; font-size: 0.95rem; }
.fb-howto ul { margin: 0; padding-left: 20px; }
.fb-howto li { margin-bottom: 3px; }
.fb-howto strong { color: #fff; }
</style>

<div class="fb-wrapper">

  <!-- HUD -->
  <div class="fb-hud">
    <div class="fb-card">
      <div class="fb-card-label">점수</div>
      <div class="fb-card-value fb-score-val" id="fbScoreDisplay">0</div>
    </div>
    <div class="fb-card">
      <div class="fb-card-label">최고 점수</div>
      <div class="fb-card-value fb-best-val" id="fbBestDisplay">0</div>
    </div>
    <div class="fb-timer-card">
      <div class="fb-timer-label">⏱ Time</div>
      <div class="fb-timer-bar-bg">
        <div class="fb-timer-bar-fill" id="fbTimerBar"></div>
      </div>
      <div class="fb-timer-text" id="fbTimerText">120s</div>
    </div>
    <div class="fb-card">
      <div class="fb-card-label">남은 사과</div>
      <div class="fb-card-value" id="fbRemainDisplay" style="color:#a8d8ff;">170</div>
    </div>
  </div>

  <!-- 캔버스 -->
  <div class="fb-canvas-wrapper">
    <div id="fbSumIndicator">합: 0</div>
    <canvas id="fbCanvas"></canvas>
    <div id="fbOverlay">
      <div class="fb-overlay-emoji" id="fbOverlayEmoji">⏰</div>
      <div class="fb-overlay-title" id="fbOverlayTitle">TIME UP!</div>
      <div class="fb-overlay-sub" id="fbOverlaySub">수고하셨습니다!</div>
      <div class="fb-overlay-score" id="fbOverlayScore">점수: 0</div>
      <div class="fb-overlay-best" id="fbOverlayBest">최고: 0</div>
      <button class="fb-overlay-btn" id="fbOverlayBtn">🍎 다시 시작</button>
    </div>
  </div>

  <!-- 버튼 -->
  <div class="fb-buttons">
    <button class="fb-btn fb-btn-reset" id="fbResetBtn">🔄 새 게임</button>
  </div>

  <!-- 설명 -->
  <div class="fb-howto">
    <h4>🎮 게임 방법</h4>
    <ul>
      <li>🖱️ <strong>마우스를 드래그</strong>하여 사각형 영역으로 사과를 감싸세요.</li>
      <li>🍎 선택한 사과들의 <strong>숫자 합이 정확히 10</strong>이면 사라집니다!</li>
      <li>⏱️ <strong>120초</strong> 제한 시간 안에 최대한 많은 사과를 제거하세요.</li>
      <li>🏆 제거한 <strong>사과 1개 = 1점</strong>. 한 번에 많이 제거할수록 유리!</li>
      <li>✨ 선택 영역이 <strong>초록색</strong>으로 바뀌면 합이 10 — 마우스를 놓으세요!</li>
    </ul>
  </div>

</div>

<script>
(function() {
'use strict';

/* ========== 상수 ========== */
const COLS        = 17;
const ROWS        = 10;
const TOTAL_TIME  = 120; // 초
const APPLE_R     = 17;  // 사과 반지름(픽셀)
const CELL        = 38;  // 셀 크기
const PAD_X       = 10;  // 좌우 패딩
const PAD_Y       = 10;  // 상하 패딩
const CW          = COLS * CELL + PAD_X * 2;  // 캔버스 너비
const CH          = ROWS * CELL + PAD_Y * 2;  // 캔버스 높이

/* ========== DOM ========== */
const canvas      = document.getElementById('fbCanvas');
const ctx         = canvas.getContext('2d');
const scoreEl     = document.getElementById('fbScoreDisplay');
const bestEl      = document.getElementById('fbBestDisplay');
const timerBarEl  = document.getElementById('fbTimerBar');
const timerTextEl = document.getElementById('fbTimerText');
const remainEl    = document.getElementById('fbRemainDisplay');
const sumEl       = document.getElementById('fbSumIndicator');
const overlay     = document.getElementById('fbOverlay');
const overlayEmoji  = document.getElementById('fbOverlayEmoji');
const overlayTitle  = document.getElementById('fbOverlayTitle');
const overlaySub    = document.getElementById('fbOverlaySub');
const overlayScore  = document.getElementById('fbOverlayScore');
const overlayBest   = document.getElementById('fbOverlayBest');
const overlayBtn    = document.getElementById('fbOverlayBtn');
const resetBtn      = document.getElementById('fbResetBtn');

canvas.width  = CW;
canvas.height = CH;

/* ========== 상태 ========== */
let grid      = []; // grid[row][col] = { val, active, fx, fy, alpha, removing }
let score     = 0;
let bestScore = parseInt(localStorage.getItem('fruitBoxBest') || '0');
let timeLeft  = TOTAL_TIME;
let timerIntervalId = null;
let gameState = 'idle'; // idle | playing | over
let isDragging   = false;
let dragStart    = null;
let dragCurrent  = null;
let removingApples = []; // 제거 애니메이션 목록

/* ========== 유틸 ========== */
function appleCenter(col, row) {
  return {
    x: PAD_X + col * CELL + CELL / 2,
    y: PAD_Y + row * CELL + CELL / 2
  };
}

function getRect(p1, p2) {
  return {
    x: Math.min(p1.x, p2.x),
    y: Math.min(p1.y, p2.y),
    w: Math.abs(p1.x - p2.x),
    h: Math.abs(p1.y - p2.y)
  };
}

function mousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width  / rect.width;
  const scaleY = canvas.height / rect.height;
  if (e.touches) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top)  * scaleY
    };
  }
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top)  * scaleY
  };
}

/* ========== 초기화 ========== */
function initGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      const center = appleCenter(c, r);
      grid[r][c] = {
        val: Math.floor(Math.random() * 9) + 1,
        active: true,
        alpha: 1,
        removing: false,
        x: center.x,
        y: center.y,
        wobble: 0,
        wobbleSpeed: 0
      };
    }
  }
}

function startGame() {
  score    = 0;
  timeLeft = TOTAL_TIME;
  gameState = 'playing';
  removingApples = [];
  isDragging = false;
  initGrid();
  updateHUD();
  overlay.classList.remove('active');
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = setInterval(tickTimer, 100);
  requestAnimationFrame(loop);
}

function tickTimer() {
  if (gameState !== 'playing') return;
  timeLeft = Math.max(0, timeLeft - 0.1);
  updateTimerUI();
  if (timeLeft <= 0) endGame();
}

function endGame() {
  gameState = 'over';
  clearInterval(timerIntervalId);
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('fruitBoxBest', bestScore);
  }
  // 남은 사과 확인
  let remain = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c].active) remain++;

  const isPerfect = remain === 0;
  overlayEmoji.textContent  = isPerfect ? '🏆' : '⏰';
  overlayTitle.textContent  = isPerfect ? 'PERFECT!' : 'TIME UP!';
  overlaySub.textContent    = isPerfect ? '모든 사과를 지웠어요! 완벽합니다!' : '수고하셨습니다!';
  overlayScore.textContent  = '점수: ' + score.toLocaleString();
  overlayBest.textContent   = '최고: ' + bestScore.toLocaleString();
  overlay.classList.add('active');
}

/* ========== HUD 업데이트 ========== */
function updateHUD() {
  scoreEl.textContent = score.toLocaleString();
  bestEl.textContent  = bestScore.toLocaleString();
  updateTimerUI();
  updateRemain();
}

function updateTimerUI() {
  const ratio = timeLeft / TOTAL_TIME;
  timerTextEl.textContent = Math.ceil(timeLeft) + 's';
  timerBarEl.style.width = (ratio * 100) + '%';
  if (ratio > 0.5)       timerBarEl.style.background = 'linear-gradient(90deg,#5cb85c,#8edd8e)';
  else if (ratio > 0.25) timerBarEl.style.background = 'linear-gradient(90deg,#f0ad4e,#ffd700)';
  else                   timerBarEl.style.background = 'linear-gradient(90deg,#d9534f,#ff6b6b)';
}

function updateRemain() {
  let cnt = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c].active) cnt++;
  remainEl.textContent = cnt;
}

/* ========== 드래그 선택 로직 ========== */
function getSelected(p1, p2) {
  const rect = getRect(p1, p2);
  const selected = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const apple = grid[r][c];
      if (!apple.active) continue;
      if (apple.x >= rect.x && apple.x <= rect.x + rect.w &&
          apple.y >= rect.y && apple.y <= rect.y + rect.h) {
        selected.push({ r, c });
      }
    }
  }
  return selected;
}

function getSum(selected) {
  return selected.reduce((s, { r, c }) => s + grid[r][c].val, 0);
}

function removeApples(selected) {
  selected.forEach(({ r, c }) => {
    const apple = grid[r][c];
    apple.active   = false;
    apple.removing = true;
    apple.alpha    = 1;
    removingApples.push({ r, c, alpha: 1 });
  });
  score += selected.length;
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('fruitBoxBest', bestScore);
  }
  updateHUD();
  // 효과음
  playPop(selected.length);
  // 모두 지웠으면 바로 종료
  let remain = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c].active) remain++;
  if (remain === 0) setTimeout(endGame, 400);
}

/* ========== 오디오 ========== */
const audioCtx = (window.AudioContext || window.webkitAudioContext) ?
  new (window.AudioContext || window.webkitAudioContext)() : null;

function playPop(count) {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const freq = 600 + Math.min(count * 60, 400);
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.6, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.22);
}

/* ========== 그리기 ========== */
// 사과 하나 그리기
function drawApple(x, y, val, highlight, alpha, scale) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  if (scale !== undefined) ctx.scale(scale, scale);

  // 그림자
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur  = 5;
  ctx.shadowOffsetY = 3;

  // 사과 몸통 (빨간 원)
  const bodyColor = highlight ? '#ff9800' : '#e53935';
  const grad = ctx.createRadialGradient(-APPLE_R * 0.3, -APPLE_R * 0.35, APPLE_R * 0.05, 0, 0, APPLE_R);
  grad.addColorStop(0,   highlight ? '#ffcc80' : '#ff7043');
  grad.addColorStop(0.5, bodyColor);
  grad.addColorStop(1,   highlight ? '#e65100' : '#b71c1c');
  ctx.beginPath();
  ctx.arc(0, 0, APPLE_R, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  // 살짝 찌그러진 사과 윤곽선 (위쪽 살짝 들어감)
  ctx.beginPath();
  ctx.ellipse(0, 2, APPLE_R, APPLE_R - 1.5, 0, 0, Math.PI * 2);
  ctx.strokeStyle = highlight ? 'rgba(255,152,0,0.5)' : 'rgba(183,28,28,0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 하이라이트 (광택)
  ctx.beginPath();
  ctx.ellipse(-APPLE_R * 0.28, -APPLE_R * 0.35, APPLE_R * 0.22, APPLE_R * 0.14, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.42)';
  ctx.fill();

  // 꼭지 (갈색 막대)
  ctx.beginPath();
  ctx.moveTo(2, -APPLE_R + 3);
  ctx.lineTo(5, -APPLE_R - 7);
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth   = 2.5;
  ctx.lineCap     = 'round';
  ctx.stroke();

  // 잎사귀
  ctx.beginPath();
  ctx.ellipse(8, -APPLE_R - 3, 7, 4, -0.7, 0, Math.PI * 2);
  ctx.fillStyle = '#43a047';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(8, -APPLE_R - 3, 7, 4, -0.7, 0, Math.PI * 2);
  ctx.strokeStyle = '#2e7d32';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // 숫자
  ctx.shadowBlur = 4;
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${APPLE_R * 1.05}px 'Nunito', Arial`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(val, 0, 2);

  ctx.restore();
}

// 체크무늬 배경
function drawCheckerBg() {
  const tileSize = CELL;
  const colors   = ['#d0edcf', '#bfe3be']; // 연두 체크
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = PAD_X + c * tileSize;
      const y = PAD_Y + r * tileSize;
      ctx.fillStyle = colors[(r + c) % 2];
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

// 선택 사각형 그리기
function drawSelection(p1, p2, sumOk) {
  const rect = getRect(p1, p2);
  ctx.save();
  if (sumOk) {
    ctx.fillStyle   = 'rgba(76,175,80,0.22)';
    ctx.strokeStyle = '#4caf50';
  } else {
    ctx.fillStyle   = 'rgba(33,150,243,0.15)';
    ctx.strokeStyle = '#2196f3';
  }
  ctx.lineWidth = 2.5;
  // 둥근 사각형
  const rr = 6;
  const { x, y, w, h } = rect;
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// 제거 파티클 (별, 반짝이)
let particles = [];

function spawnParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 / 8) * i + Math.random() * 0.3;
    const speed = 2 + Math.random() * 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.04 + Math.random() * 0.03,
      size: 3 + Math.random() * 4,
      color: ['#ffd700','#ff9800','#ff5722','#4caf50','#00bcd4'][Math.floor(Math.random()*5)]
    });
  }
}

/* ========== 메인 루프 ========== */
let lastFrame = 0;
let animId = null;

function loop(ts) {
  animId = requestAnimationFrame(loop);
  const dt = Math.min((ts - lastFrame) / 16.67, 3);
  lastFrame = ts;

  ctx.clearRect(0, 0, CW, CH);

  // 배경: 전체 초록 배경 + 체크무늬
  ctx.fillStyle = '#8bc34a';
  ctx.fillRect(0, 0, CW, CH);
  drawCheckerBg();

  // 보더
  ctx.strokeStyle = '#4caf50';
  ctx.lineWidth = 3;
  ctx.strokeRect(PAD_X, PAD_Y, COLS * CELL, ROWS * CELL);

  // 제거 애니메이션 (스케일 다운 + 투명)
  removingApples = removingApples.filter(item => item.alpha > 0);
  for (const item of removingApples) {
    item.alpha -= 0.07 * dt;
    if (item.alpha < 0) item.alpha = 0;
  }

  // 선택 정보
  let selected = [];
  let currentSum = 0;
  let sumOk = false;
  if (isDragging && dragStart && dragCurrent && gameState === 'playing') {
    selected  = getSelected(dragStart, dragCurrent);
    currentSum = getSum(selected);
    sumOk     = (currentSum === 10 && selected.length > 0);
  }

  // 선택된 셀 집합
  const selectedSet = new Set(selected.map(({r, c}) => r * COLS + c));

  // 사과 그리기
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const apple = grid[r][c];
      if (!apple.active) {
        // 제거 애니메이션 중인 것 찾기
        const anim = removingApples.find(a => a.r === r && a.c === c);
        if (anim && anim.alpha > 0) {
          const sc = 0.5 + anim.alpha * 0.5;
          drawApple(apple.x, apple.y, apple.val, true, anim.alpha, sc);
          if (anim.alpha < 0.5) spawnParticles(apple.x, apple.y);
        }
        continue;
      }
      const isHighlighted = selectedSet.has(r * COLS + c);
      drawApple(apple.x, apple.y, apple.val, isHighlighted, 1, 1);
    }
  }

  // 파티클
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 0.15 * dt;
    p.life -= p.decay * dt;
    ctx.save();
    ctx.globalAlpha = p.life;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 선택 사각형
  if (isDragging && dragStart && dragCurrent && gameState === 'playing') {
    drawSelection(dragStart, dragCurrent, sumOk);

    // 합 표시
    if (selected.length > 0) {
      sumEl.style.display = 'block';
      sumEl.textContent   = '합: ' + currentSum + (sumOk ? ' ✓ 놓으세요!' : ' / 10');
      sumEl.className     = sumOk ? 'sum-ok' : 'sum-bad';
    } else {
      sumEl.style.display = 'none';
    }
  } else {
    sumEl.style.display = 'none';
  }

  // 게임 시작 전 안내 오버레이 (canvas 위에)
  if (gameState === 'idle') {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, CW, CH);
    ctx.fillStyle = '#ffd700';
    ctx.font = `bold 28px 'Nunito', Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍎 사과 게임', CW / 2, CH / 2 - 30);
    ctx.fillStyle = '#fff';
    ctx.font = `16px 'Nunito', Arial`;
    ctx.fillText('아래 [새 게임] 버튼을 눌러 시작하세요!', CW / 2, CH / 2 + 10);
    ctx.restore();
  }
}

/* ========== 이벤트: 마우스 / 터치 ========== */
function onDragStart(e) {
  if (gameState !== 'playing') return;
  e.preventDefault();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  isDragging  = true;
  dragStart   = mousePos(e);
  dragCurrent = { ...dragStart };
}

function onDragMove(e) {
  if (!isDragging) return;
  e.preventDefault();
  dragCurrent = mousePos(e);
}

function onDragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  if (gameState !== 'playing') return;

  const selected = getSelected(dragStart, dragCurrent);
  if (selected.length > 0 && getSum(selected) === 10) {
    removeApples(selected);
  }
  dragStart = dragCurrent = null;
}

canvas.addEventListener('mousedown',  onDragStart, { passive: false });
canvas.addEventListener('mousemove',  onDragMove,  { passive: false });
canvas.addEventListener('mouseup',    onDragEnd,   { passive: false });
canvas.addEventListener('mouseleave', onDragEnd,   { passive: false });
canvas.addEventListener('touchstart', onDragStart, { passive: false });
canvas.addEventListener('touchmove',  onDragMove,  { passive: false });
canvas.addEventListener('touchend',   onDragEnd,   { passive: false });

resetBtn.addEventListener('click',    () => startGame());
overlayBtn.addEventListener('click',  () => startGame());

/* ========== 시작 ========== */
bestEl.textContent = bestScore.toLocaleString();
loop(0); // idle 상태로 루프 시작 (안내 화면)

})();
</script>
