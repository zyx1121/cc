const listEl = document.getElementById('list');
const viewerEl = document.getElementById('viewer');
const countEl = document.getElementById('count');
const tabs = document.querySelectorAll('.tab');

let mode = 'memory'; // 'memory' | 'skills'

async function load() {
  const items = mode === 'memory' ? await window.scope.scanMemory() : await window.scope.scanSkills();
  countEl.textContent = mode === 'memory' ? `${items.length} memories` : `${items.length} skills`;
  viewerEl.innerHTML = `<div class="empty">← pick ${mode === 'memory' ? 'a memory file' : 'a skill'}</div>`;

  if (items.length === 0) {
    listEl.innerHTML = `<div class="empty">No ${mode} yet.</div>`;
    return;
  }

  listEl.innerHTML = '';
  for (const item of items) {
    const btn = document.createElement('button');
    btn.className = 'item';
    btn.innerHTML = `<span class="file">${item.name}</span><span class="proj">${item.group}</span>`;
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

tabs.forEach((tab) => {
  tab.onclick = () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    mode = tab.dataset.mode;
    load();
  };
});

load();
