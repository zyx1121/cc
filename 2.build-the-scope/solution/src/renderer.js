const listEl = document.getElementById('list');
const viewerEl = document.getElementById('viewer');
const countEl = document.getElementById('count');

async function load() {
  const items = await window.scope.scan();
  countEl.textContent = `${items.length} memories`;

  if (items.length === 0) {
    listEl.innerHTML =
      '<div class="empty">No memories yet.<br>Go chat with Claude Code, tell it "remember this", then reopen.</div>';
    return;
  }

  listEl.innerHTML = '';
  for (const item of items) {
    const btn = document.createElement('button');
    btn.className = 'item';
    btn.innerHTML = `<span class="file">${item.file}</span><span class="proj">${item.project}</span>`;
    btn.onclick = async () => {
      document.querySelectorAll('.item').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const content = await window.scope.read(item.path);
      const pre = document.createElement('pre');
      pre.textContent = content;
      viewerEl.replaceChildren(pre);
    };
    listEl.appendChild(btn);
  }
}

load();
