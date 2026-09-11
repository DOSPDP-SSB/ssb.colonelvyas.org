/**
 * DOSPDP - SSB Preparation Portal
 * PP&DT Interactive Simulator: Fullscreen, 30s Image, 4m30s Writing Stage & School Bell Rings
 */

(function () {
  'use strict';

  // --- Configuration ---
  const VIEWING_TIME_SECONDS = 30;         // 30 Seconds viewing
  const WRITING_TIME_SECONDS = 4 * 60 + 30; // 4 Minutes 30 Seconds writing (270s)

  // --- State Variables ---
  let audioCtx = null;
  let bellAudioElem = null;
  let viewingInterval = null;
  let writingInterval = null;
  let viewingRemaining = VIEWING_TIME_SECONDS;
  let writingRemaining = WRITING_TIME_SECONDS;

  // --- DOM Elements ---
  const startMockBtn = document.getElementById('startMockBtn');
  const simOverlay = document.getElementById('ppdtSimOverlay');
  const fullscreenCloseBtn = document.getElementById('fullscreenCloseBtn');
  const stageImage = document.getElementById('ppdtStageImage');
  const stageWriting = document.getElementById('ppdtStageWriting');
  const completionModal = document.getElementById('ppdtCompletionModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const restartModalBtn = document.getElementById('restartModalBtn');

  // ==========================================================================
  // 1. Audio Engine: Web Audio API School Bell Synthesizer + WAV Preload
  // ==========================================================================
  function initAudioEngine() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    } catch (e) {
      console.warn('AudioContext initialization note:', e);
    }

    if (!bellAudioElem) {
      bellAudioElem = document.getElementById('bellAudioElement');
      if (!bellAudioElem) {
        bellAudioElem = new Audio('../assets/ppdt/bell.wav');
      }
      bellAudioElem.volume = 1.0;
      bellAudioElem.preload = 'auto';
    }
  }

  /**
   * Synthesize smooth, warm acoustic chime bell (Max 1.35s)
   */
  function synthesizeSchoolBell() {
    try {
      initAudioEngine();
      if (!audioCtx) return false;

      const now = audioCtx.currentTime;
      const duration = 1.35;

      // Master Gain with soft attack and smooth exponential decay
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.45, now + 0.015);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(audioCtx.destination);

      // Warm harmonic chime modes (Hz)
      const modes = [
        { freq: 293.66, gain: 0.18 }, // Body sub-tone (D4)
        { freq: 587.33, gain: 0.50 }, // Fundamental tone (D5)
        { freq: 880.00, gain: 0.22 }, // Musical fifth (A5)
        { freq: 1174.66, gain: 0.14 }, // Octave overtone (D6)
        { freq: 1480.00, gain: 0.06 }  // High sparkle (F#6)
      ];

      modes.forEach(function (m) {
        const osc = audioCtx.createOscillator();
        const modeGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(m.freq, now);

        modeGain.gain.setValueAtTime(m.gain, now);
        osc.connect(modeGain);
        modeGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
      });

      return true;
    } catch (err) {
      console.warn('Web Audio synthesis error:', err);
      return false;
    }
  }

  /**
   * Play the smooth, clear bell sound
   */
  function playSchoolBell() {
    initAudioEngine();

    // 1. Synthesize smooth chime via Web Audio API
    const synthSuccess = synthesizeSchoolBell();

    // 2. Concurrently play the smooth bell.wav audio element if synth unavailable
    if (!synthSuccess && bellAudioElem) {
      try {
        bellAudioElem.currentTime = 0;
        bellAudioElem.volume = 0.85;
        const playPromise = bellAudioElem.play();
        if (playPromise !== undefined) {
          playPromise.catch(function (error) {
            console.warn('Audio element playback note:', error);
          });
        }
      } catch (e) {
        console.warn('Audio playback error:', e);
      }
    }
  }

  // ==========================================================================
  // 2. Fullscreen Helpers
  // ==========================================================================
  function enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(function () {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // ==========================================================================
  // 3. Stage 1: 30-Second Image Viewing (Bell Rings on Start)
  // ==========================================================================
  function startSimulation() {
    initAudioEngine();
    enterFullscreen();

    // Reset remaining time
    viewingRemaining = VIEWING_TIME_SECONDS;
    writingRemaining = WRITING_TIME_SECONDS;

    // Show Fullscreen Overlay & Image Stage
    if (completionModal) completionModal.classList.remove('active');
    if (simOverlay) simOverlay.classList.add('active');
    if (stageImage) stageImage.classList.add('active');
    if (stageWriting) stageWriting.classList.remove('active');

    // 1. Ring loud school bell when test starts
    playSchoolBell();

    if (viewingInterval) clearInterval(viewingInterval);
    viewingInterval = setInterval(function () {
      viewingRemaining--;

      if (viewingRemaining <= 0) {
        clearInterval(viewingInterval);
        viewingInterval = null;
        transitionToWritingStage();
      }
    }, 1000);
  }

  // ==========================================================================
  // 4. Stage 2: 4m 30s Black Screen Writing Time (Bell Rings at 30s)
  // ==========================================================================
  function transitionToWritingStage() {
    // 2. Ring loud school bell 30 seconds after start (when writing starts)
    playSchoolBell();

    // Switch from image stage to writing stage
    if (stageImage) stageImage.classList.remove('active');
    if (stageWriting) stageWriting.classList.add('active');

    if (writingInterval) clearInterval(writingInterval);
    writingInterval = setInterval(function () {
      writingRemaining--;

      if (writingRemaining <= 0) {
        clearInterval(writingInterval);
        writingInterval = null;
        finishSimulation();
      }
    }, 1000);
  }

  // ==========================================================================
  // 5. Stage 3: Test Finish -> Auto Fullscreen Exit & Prompt Box Display
  // ==========================================================================
  function finishSimulation() {
    if (viewingInterval) clearInterval(viewingInterval);
    if (writingInterval) clearInterval(writingInterval);
    viewingInterval = null;
    writingInterval = null;

    // 3. Ring loud school bell when test ends
    playSchoolBell();

    // Automatically exit fullscreen without prompting user
    exitFullscreen();

    // Hide simulation overlay
    if (simOverlay) simOverlay.classList.remove('active');
    if (stageImage) stageImage.classList.remove('active');
    if (stageWriting) stageWriting.classList.remove('active');

    // Display centered prompt box modal with "Time Up - Pens Down"
    if (completionModal) {
      completionModal.classList.add('active');
    }
  }

  function resetToInstructions() {
    if (viewingInterval) clearInterval(viewingInterval);
    if (writingInterval) clearInterval(writingInterval);
    viewingInterval = null;
    writingInterval = null;

    exitFullscreen();

    if (simOverlay) simOverlay.classList.remove('active');
    if (stageImage) stageImage.classList.remove('active');
    if (stageWriting) stageWriting.classList.remove('active');
    if (completionModal) completionModal.classList.remove('active');
  }

  // ==========================================================================
  // 6. Event Listeners & Interaction Handlers
  // ==========================================================================
  if (startMockBtn) {
    startMockBtn.addEventListener('click', function () {
      startSimulation();
    });
  }

  // Top Right Cross button in fullscreen overlay to exit fullscreen / stop test
  if (fullscreenCloseBtn) {
    fullscreenCloseBtn.addEventListener('click', function () {
      resetToInstructions();
    });
  }

  // Close (X) button on top right of completion modal prompt box
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function () {
      if (completionModal) {
        completionModal.classList.remove('active');
      }
    });
  }

  if (restartModalBtn) {
    restartModalBtn.addEventListener('click', function () {
      resetToInstructions();
      startSimulation();
    });
  }

  // Keyboard Escape listener
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (simOverlay && simOverlay.classList.contains('active')) {
        resetToInstructions();
      } else if (completionModal && completionModal.classList.contains('active')) {
        completionModal.classList.remove('active');
      }
    }
  });

  // Native fullscreen change listener
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && simOverlay && simOverlay.classList.contains('active')) {
      // If user exited fullscreen manually during test, keep overlay responsive or reset
    }
  });

  // Theme Sync on page load & pre-warm audio
  document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    initAudioEngine();
  });

})();