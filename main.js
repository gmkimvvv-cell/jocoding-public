let historyList = [];

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  if (body.classList.contains('dark')) {
    body.classList.replace('dark', 'light');
    btn.textContent = '🌙 다크 모드';
  } else {
    body.classList.replace('light', 'dark');
    btn.textContent = '☀️ 라이트 모드';
  }
}

function getBallColor(num) {
  if (num <= 10) return 'yellow';
  if (num <= 20) return 'blue';
  if (num <= 30) return 'red';
  if (num <= 40) return 'gray';
  return 'green';
}

function generate() {
  const numbers = [];
  while (numbers.length < 6) {
    const n = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(n)) numbers.push(n);
  }
  numbers.sort((a, b) => a - b);

  // 공 렌더링
  const ballsDiv = document.getElementById('balls');
  ballsDiv.innerHTML = '';
  numbers.forEach((num, i) => {
    const ball = document.createElement('div');
    ball.className = `ball ${getBallColor(num)}`;
    ball.textContent = num;
    ball.style.animationDelay = `${i * 0.08}s`;
    ballsDiv.appendChild(ball);
  });

  // 히스토리 추가
  historyList.unshift(numbers);
  if (historyList.length > 5) historyList.pop();
  renderHistory();
}

function renderHistory() {
  const historyDiv = document.getElementById('history');
  if (historyList.length === 0) {
    historyDiv.innerHTML = '';
    return;
  }

  let html = '<h2>최근 생성 기록</h2>';
  historyList.forEach((nums, idx) => {
    html += `<div class="history-row">`;
    html += `<span class="history-index">${idx + 1}회</span>`;
    nums.forEach(num => {
      html += `<span class="small-ball ${getBallColor(num)}">${num}</span>`;
    });
    html += `</div>`;
  });
  historyDiv.innerHTML = html;
}
