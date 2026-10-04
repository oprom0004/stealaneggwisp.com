/**
 * Interactive Speed Calculator Engine & Instant Preloading for StealAnEggWisp.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // Speed Calculator Logic (if present on page)
  const currentSpeedInput = document.getElementById('currentSpeedInput');
  const gainPerSecInput = document.getElementById('gainPerSecInput');
  const calcBtn = document.getElementById('calcBtn');
  const calcResult = document.getElementById('calcResult');

  function calculateTime() {
    if (!currentSpeedInput || !gainPerSecInput || !calcResult) return;

    const currentSpeedB = parseFloat(currentSpeedInput.value) || 0;
    const gainPerSecM = parseFloat(gainPerSecInput.value) || 1;
    const targetSpeedB = 50.0;

    if (currentSpeedB >= targetSpeedB) {
      calcResult.textContent = "🎉 You already have enough speed to enter the Enchanted Forest!";
      calcResult.style.color = "#34d399";
      return;
    }

    const remainingSpeedB = targetSpeedB - currentSpeedB;
    const remainingSpeedM = remainingSpeedB * 1000; // Convert Billions to Millions
    const totalSeconds = remainingSpeedM / gainPerSecM;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;

    let timeString = "";
    if (hours > 0) {
      timeString = `${hours} hrs ${remMinutes} mins`;
    } else {
      timeString = `${minutes} mins ${seconds} secs`;
    }

    calcResult.textContent = `Remaining Speed: ${remainingSpeedB.toFixed(1)}B • Estimated Time: ~${timeString}`;
    calcResult.style.color = "#fbbf24";
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', calculateTime);
  }

  if (currentSpeedInput && gainPerSecInput) {
    currentSpeedInput.addEventListener('input', calculateTime);
    gainPerSecInput.addEventListener('input', calculateTime);
  }

  // Instant Hover Preloading for Internal Navigation
  const preloadedUrls = new Set();
  function preloadUrl(url) {
    if (!url || preloadedUrls.has(url)) return;
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.origin !== window.location.origin) return;
      if (parsed.pathname === window.location.pathname) return;

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = parsed.href;
      document.head.appendChild(link);
      preloadedUrls.add(url);
    } catch (e) {
      // Ignore invalid URL
    }
  }

  document.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
      anchor.addEventListener('mouseenter', () => preloadUrl(href), { passive: true });
      anchor.addEventListener('touchstart', () => preloadUrl(href), { passive: true });
    }
  });
});
