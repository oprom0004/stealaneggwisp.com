/**
 * Interactive Speed Calculator Engine for StealAnEggWisp.com
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentSpeedInput = document.getElementById('currentSpeedInput');
  const gainPerSecInput = document.getElementById('gainPerSecInput');
  const calcBtn = document.getElementById('calcBtn');
  const calcResult = document.getElementById('calcResult');

  function calculateTime() {
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
});
