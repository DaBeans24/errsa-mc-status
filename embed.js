// Copy-IP button
document.getElementById('copy-ip').addEventListener('click', () => {
  const ip = document.getElementById('server-ip');
  navigator.clipboard.writeText(ip.value).then(() => {
    const orig = ip.value;
    ip.value = 'Copied!';
    setTimeout(() => (ip.value = orig), 1000);
  });
});

// Server status fetch
document.addEventListener('DOMContentLoaded', () => {
  const dot    = document.querySelector('.status-dot');
  const txt    = document.querySelector('.status-text');
  const span   = document.querySelector('.players');
  const API    = 'https://api.mcsrvstat.us/2/errsa.mc.gg';

  async function updateStatus() {
    try {
      const r = await fetch(API);
      const j = await r.json();
      dot.style.backgroundColor = j.online ? '#0f0' : '#f00';
      txt.textContent           = j.online ? 'Online' : 'Offline';
      span.textContent          = `Players: ${j.players?.online||0} / ${j.players?.max||'–'}`;
    } catch {
      dot.style.backgroundColor = '#aaa';
      txt.textContent           = 'Unknown';
      span.textContent          = 'Players: – / –';
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
});

