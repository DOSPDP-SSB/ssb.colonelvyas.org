/**
 * DOSPDP - SSB Preparation Portal
 * OIR Mock Test Interactive Controller: Dynamic Test Timer & Responsive Tools
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const htmlElement = document.documentElement;
  const timerWidget = document.getElementById('oirTimerWidget');
  const timerDigits = document.getElementById('timerDigits');
  const timerToggleBtn = document.getElementById('timerToggleBtn');
  const timerToggleLabel = document.getElementById('timerToggleLabel');
  const iconPlay = timerToggleBtn ? timerToggleBtn.querySelector('.icon-play') : null;
  const iconPause = timerToggleBtn ? timerToggleBtn.querySelector('.icon-pause') : null;
  const timerResetBtn = document.getElementById('timerResetBtn');
  const timerPulseDot = document.getElementById('timerPulseDot');
  const timerCollapseBtn = document.getElementById('timerCollapseBtn');

  // --- Configuration ---
  const testMinutes = timerWidget && timerWidget.getAttribute('data-timer-minutes') 
    ? parseInt(timerWidget.getAttribute('data-timer-minutes'), 10) 
    : 30;
  const DEFAULT_TIMER_SECONDS = testMinutes * 60;
  let timeRemaining = DEFAULT_TIMER_SECONDS;
  let timerInterval = null;
  let isRunning = false;

  // ==========================================================================
  // 1. Theme Management (Sync with portal preferences)
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    htmlElement.setAttribute('data-theme', initialTheme);
  }

  // ==========================================================================
  // 2. Dynamic Test Timer Engine
  // ==========================================================================
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    if (!timerDigits) return;
    timerDigits.textContent = formatTime(timeRemaining);

    if (timeRemaining <= 120 && timeRemaining > 0) {
      if (timerWidget) timerWidget.classList.add('warning');
    } else {
      if (timerWidget) timerWidget.classList.remove('warning');
    }

    if (timeRemaining === 0) {
      timerDigits.classList.add('time-up');
    } else {
      timerDigits.classList.remove('time-up');
    }
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;

    if (iconPlay && iconPause) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }
    if (timerToggleLabel) timerToggleLabel.textContent = 'Pause';

    if (timerPulseDot) {
      timerPulseDot.className = 'timer-live-dot running';
    }

    timerInterval = setInterval(function () {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        pauseTimer();
        onTimerComplete();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;

    if (iconPlay && iconPause) {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    }
    if (timerToggleLabel) timerToggleLabel.textContent = timeRemaining === 0 ? 'Done' : 'Resume';

    if (timerPulseDot) {
      timerPulseDot.className = 'timer-live-dot paused';
    }
  }

  function resetTimer() {
    pauseTimer();
    timeRemaining = DEFAULT_TIMER_SECONDS;
    updateTimerDisplay();
    if (timerToggleLabel) timerToggleLabel.textContent = 'Start';
    if (timerPulseDot) {
      timerPulseDot.className = 'timer-live-dot';
    }
    if (timerWidget) {
      timerWidget.classList.remove('warning');
    }
  }

  function onTimerComplete() {
    if (timerPulseDot) timerPulseDot.className = 'timer-live-dot';
    setTimeout(function() {
      alert(`⏱ Time is up! ${testMinutes} minutes have elapsed for this OIR Mock Test.`);
    }, 100);
  }

  if (timerToggleBtn) {
    timerToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isRunning) {
        pauseTimer();
      } else {
        if (timeRemaining === 0) {
          resetTimer();
        }
        startTimer();
      }
    });
  }

  if (timerResetBtn) {
    timerResetBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      resetTimer();
    });
  }

  // Collapse / Minimize Toggle for mobile / focus
  if (timerCollapseBtn) {
    timerCollapseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (timerWidget) {
        timerWidget.classList.toggle('collapsed');
      }
    });
  }

  if (timerWidget) {
    timerWidget.addEventListener('click', function (e) {
      if (timerWidget.classList.contains('collapsed')) {
        timerWidget.classList.remove('collapsed');
      }
    });
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    updateTimerDisplay();
  });

})();