/**
 * DOSPDP - SSB Preparation Portal
 * Thematic Apperception Test (TAT) Interactive Simulator Engine
 * 12 Slides (11 Picture Prompts + 1 Blank Slide) · 30s Image · 4m Writing · School Bell Triggers
 */

(function () {
  'use strict';

  // --- TAT Datasets for Mock Series ---
  const TAT_DATASETS = {
    1: [
      '../assets/tat/tat1/1.jpg',
      '../assets/tat/tat1/2.jpg',
      '../assets/tat/tat1/3.jpg',
      '../assets/tat/tat1/4.jpg',
      '../assets/tat/tat1/5.jpg',
      '../assets/tat/tat1/6.jpg',
      '../assets/tat/tat1/7.jpg',
      '../assets/tat/tat1/8.jpg',
      '../assets/tat/tat1/9.jpg',
      '../assets/tat/tat1/10.jpg',
      '../assets/tat/tat1/11.jpg',
      'blank'
    ]
  };

  const mockId = document.body.getAttribute('data-mock-id') || '1';
  const TAT_SLIDES = window.TAT_SLIDES || TAT_DATASETS[mockId] || TAT_DATASETS[1];
  const TOTAL_SLIDES = TAT_SLIDES.length;

  // --- Timing Constants (Seconds) ---
  const IMAGE_DURATION_SECONDS = 30;
  const WRITING_DURATION_SECONDS = 240; // 4 minutes

  // --- State Variables ---
  let audioCtx = null;
  let bellAudioElem = null;
  let currentSlideIndex = 0;
  let isWritingPhase = false;
  let timerInterval = null;
  let timeRemaining = IMAGE_DURATION_SECONDS;

  // --- DOM Elements ---
  const startMockBtn = document.getElementById('startMockBtn');
  const simOverlay = document.getElementById('tatSimOverlay');
  const fullscreenCloseBtn = document.getElementById('fullscreenCloseBtn');
  const stageImage = document.getElementById('tatStageImage');
  const stageWriting = document.getElementById('tatStageWriting');
  const imgWrapper = document.getElementById('tatImgWrapper');
  const testImage = document.getElementById('tatTestImage');
  const blankSlideBox = document.getElementById('tatBlankSlideBox');
  const completionModal = document.getElementById('tatCompletionModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const restartModalBtn = document.getElementById('restartModalBtn');

  // ==========================================================================
  // 1. Audio Engine: Web Audio API Synthesizer + Bell Audio Preload
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
      console.warn('Synthesizer bell note:', err);
      return false;
    }
  }

  function playBellSound() {
    let synthSuccess = false;
    try {
      synthSuccess = synthesizeSchoolBell();
    } catch (e) {
      synthSuccess = false;
    }

    if (!synthSuccess && bellAudioElem) {
      try {
        bellAudioElem.currentTime = 0;
        bellAudioElem.volume = 0.85;
        const p = bellAudioElem.play();
        if (p && typeof p.catch === 'function') {
          p.catch(function (err) {
            console.log('Audio playback note:', err);
          });
        }
      } catch (e) {
        console.warn('bellAudioElem play error:', e);
      }
    }
  }

  // ==========================================================================
  // 2. Fullscreen Handlers
  // ==========================================================================
  function enterFullscreen(element) {
    if (element.requestFullscreen) {
      return element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen();
    }
    return Promise.resolve();
  }

  function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  // ==========================================================================
  // 3. Test State Machine & Stage Progression
  // ==========================================================================
  function showImageStage(slideIndex) {
    isWritingPhase = false;
    timeRemaining = IMAGE_DURATION_SECONDS;

    // Switch visible overlays
    if (stageWriting) stageWriting.style.display = 'none';
    if (stageImage) stageImage.style.display = 'flex';

    const slideData = TAT_SLIDES[slideIndex];
    if (slideData === 'blank') {
      // 12th Slide: Blank Slide
      if (imgWrapper) imgWrapper.style.display = 'none';
      if (blankSlideBox) blankSlideBox.style.display = 'flex';
    } else {
      // 1-11 Slides: Image Prompt
      if (blankSlideBox) blankSlideBox.style.display = 'none';
      if (imgWrapper) imgWrapper.style.display = 'flex';
      if (testImage) {
        testImage.src = slideData;
        testImage.alt = 'TAT Slide ' + (slideIndex + 1);
      }
    }

    startTimer();
  }

  function showWritingStage() {
    isWritingPhase = true;
    timeRemaining = WRITING_DURATION_SECONDS;

    // Ring bell signaling observation end & writing start
    playBellSound();

    if (stageImage) stageImage.style.display = 'none';
    if (stageWriting) stageWriting.style.display = 'flex';

    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      timeRemaining--;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        onPhaseComplete();
      }
    }, 1000);
  }

  function onPhaseComplete() {
    if (!isWritingPhase) {
      // Observation ended -> Move to writing for current slide
      showWritingStage(currentSlideIndex);
    } else {
      // Writing ended -> Check if more slides remain
      if (currentSlideIndex < TOTAL_SLIDES - 1) {
        // Move to next slide
        playBellSound();
        currentSlideIndex++;
        showImageStage(currentSlideIndex);
      } else {
        // All 12 slides completed!
        endTest();
      }
    }
  }

  function startMockTest() {
    initAudioEngine();
    playBellSound();

    currentSlideIndex = 0;
    isWritingPhase = false;

    if (completionModal) completionModal.classList.remove('active');
    if (simOverlay) simOverlay.classList.add('active');

    // Request fullscreen
    enterFullscreen(simOverlay || document.documentElement).catch(function () {});

    showImageStage(currentSlideIndex);
  }

  function endTest() {
    clearInterval(timerInterval);
    playBellSound();

    exitFullscreen();

    if (simOverlay) simOverlay.classList.remove('active');
    if (completionModal) completionModal.classList.add('active');
  }

  function stopAndReset() {
    clearInterval(timerInterval);
    exitFullscreen();

    if (simOverlay) simOverlay.classList.remove('active');
    if (completionModal) completionModal.classList.remove('active');
  }

  // ==========================================================================
  // 4. Event Listeners
  // ==========================================================================
  if (startMockBtn) {
    startMockBtn.addEventListener('click', function (e) {
      e.preventDefault();
      startMockTest();
    });
  }

  if (fullscreenCloseBtn) {
    fullscreenCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      stopAndReset();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (completionModal) completionModal.classList.remove('active');
    });
  }

  if (restartModalBtn) {
    restartModalBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (completionModal) completionModal.classList.remove('active');
      startMockTest();
    });
  }

  // Escape key handler
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (simOverlay && simOverlay.classList.contains('active')) {
        stopAndReset();
      }
    }
  });

  // Handle system fullscreen exit
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && simOverlay && simOverlay.classList.contains('active')) {
      // User exited fullscreen via browser shortcut
    }
  });

  // Theme Sync on page load
  document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
  });

})();
