// errsa-mc-status.js

;(function(){
  const API = 'https://api.mcsrvstat.us/2/mc.errsa.erau.edu';
  const statusEl  = document.getElementById('status');
  const playersEl = document.getElementById('players');

  fetch(API)
    .then(r=>r.json())
    .then(data=>{
      statusEl.textContent  = data.online ? '🟢 Online' : '🔴 Offline';
      playersEl.textContent = `${data.players.online} / ${data.players.max}`;
    })
    .catch(_=>{
      statusEl.textContent  = 'Error';
      playersEl.textContent = '–';
    });

  window.copyIP = function(){
    navigator.clipboard.writeText('mc.errsa.erau.edu')
      .then(_=> alert('Server IP copied!'))
      .catch(e=> alert('Copy failed: '+e.message));
  };
})();
