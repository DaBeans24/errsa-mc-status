// embed.js

 // set hero image
    document.getElementById("hero-img").style.backgroundImage =
      'url("https://raw.githack.com/DaBeans24/errsa-mc-status/main/images/hub-photo.png")';

    // copy IP
    document.getElementById("copy-ip").onclick = () => {
      const ip = document.getElementById("server-ip");
      navigator.clipboard.writeText(ip.value).then(() => {
        const prev = ip.value;
        ip.value = "Copied!";
        setTimeout(() => (ip.value = prev), 1000);
      });
    };

    // live status
    document.addEventListener("DOMContentLoaded", () => {
      const dot = document.querySelector(".status-dot");
      const txt = document.querySelector(".status-text");
      const span = document.querySelector(".players");
      const API = "https://api.mcsrvstat.us/2/errsa.mc.gg";

      async function update() {
        try {
          const res = await fetch(API);
          const data = await res.json();
          dot.style.backgroundColor = data.online ? "#0f0" : "#f00";
          txt.textContent = data.online ? "Online" : "Offline";
          span.textContent = `Players: ${data.players?.online || 0} / ${data.players?.max || "–"}`;
        } catch {
          dot.style.backgroundColor = "#aaa";
          txt.textContent = "Unknown";
          span.textContent = "Players: – / –";
        }
      }

      update();
      setInterval(update, 60000);
    });

// Builds slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const track   = document.querySelector('.slider-track');
  const slides  = Array.from(track.children);
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let current   = 0;
  const visible = window.innerWidth < 768 ? 1 : 3;
  const maxIdx  = slides.length - visible;

  function updateButtons() {
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIdx;
  }

  function moveTo(idx) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * idx}px)`;
    current = idx;
    updateButtons();
  }

  prevBtn.addEventListener('click', () => {
    moveTo(Math.max(0, current - visible));
  });

  nextBtn.addEventListener('click', () => {
    moveTo(Math.min(maxIdx, current + visible));
  });

  // Initialize buttons state
  updateButtons();
});

// Show detail panel when clicking a card
document.querySelectorAll('.staff-card').forEach(card => {
  card.addEventListener('click', () => {
    const detail = document.getElementById('staff-detail');
    document.getElementById('detail-skin').src =
      `https://crafatar.com/renders/body/${card.dataset.uuid}?size=256&overlay`;
    document.getElementById('detail-name').textContent = card.dataset.name;
    document.getElementById('detail-role').textContent = card.dataset.role;
    const dc = card.querySelector('a');
    document.getElementById('detail-discord').textContent = dc.textContent;
    document.getElementById('detail-discord').href = dc.href;
    detail.classList.remove('hidden');
  });
});

// Close the detail panel
document.getElementById('close-detail').addEventListener('click', () => {
  document.getElementById('staff-detail').classList.add('hidden');
});
