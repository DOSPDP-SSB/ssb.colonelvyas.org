/**
 * DOSPDP - SSB Preparation Portal
 * Word Association Test (WAT) Interactive Simulator Engine
 * 60 Words · 15s Per Word · 15s Page Change Break after Word 20 & 40 · School Bell Triggers
 */

(function () {
  'use strict';

  // --- WAT Words Datasets for Mock Series ---
  const WAT_DATASETS = {
    1: [
      "Dark", "Beat", "Alone", "Organize", "Heat",
      "Ability", "Beware", "Bolt", "Boast", "Sputnik",
      "Award", "Power", "Defeat", "Lure", "Government",
      "Duty", "Discipline", "Lead", "Problem", "Wisdom",
      "Noble", "Luck", "Fear", "Abandon", "Snarl",
      "Dominant", "Bless", "Twist", "Frown", "Strip",
      "Jurisdiction", "Pocket", "Science", "Virtue", "Pardon",
      "Qualified", "Index", "Teenager", "Rotation", "Sex",
      "Awful", "Loan", "Hit", "Dilute", "Rally",
      "March", "Death", "Fox", "Friendly", "Export",
      "Duty", "Shaft", "Essay", "Difference", "Misery",
      "Sets", "Relations", "Engage", "Chill", "Sparkle"
    ],
    2: [
      "Hard", "Noise", "Word", "Mall", "Enjoy",
      "Copy", "Post", "Great", "Hot", "Drug",
      "Ugly", "Speed", "Poison", "Hammer", "Resentment",
      "Furious", "Bitterness", "Worst", "Doubt", "Fall",
      "Home", "Physics", "Team", "Death", "Rain",
      "Separated", "Betray", "Jurisdiction", "Murder", "Looser",
      "Disaster", "Lifeless", "Cricket", "Virtual", "Live",
      "Zoom", "Tube", "Hack", "Insult", "Terror",
      "Debt", "Trial", "Assembly", "Wireless", "Download",
      "Car", "Bomb", "Anger", "Frustration", "Hold",
      "Beggar", "Functions", "Trigonometry", "Freeze", "Defence",
      "Screen", "Completion", "Fold", "Aircraft", "Resistance"
    ],
    3: [
      "Hate", "Nose", "World", "Hall", "System",
      "Fun", "Light", "Fate", "Dog", "Pro",
      "Pretty", "Annual", "Run", "Page", "Solution",
      "Responsible", "Advertising", "Thrust", "Crow", "Doll",
      "School", "Chemistry", "Pink", "Report", "Hail",
      "Spank", "Design", "Judge", "Theft", "Warning",
      "Lizard", "Periodic", "Triangle", "Heredity", "Table",
      "Frustrated", "Tea", "Noble", "Atom", "Closure",
      "Date", "Kitchen", "Request", "Scoter", "Audition",
      "Parallel", "Hues", "Darkness", "Depression", "Captain",
      "Flying", "Book", "National", "Title", "Add",
      "Twitch", "Certificate", "Hand", "Wife", "Author"
    ],
    4: [
      "Over", "Complete", "Guide", "Details", "Solid",
      "Guests", "Introducing", "Check", "New", "Different",
      "Click", "Government", "Female", "Scientist", "Work",
      "Cube", "Glass", "Digital", "Central", "Gas",
      "Body", "Son", "Address", "Olympiad", "Remind",
      "National", "Secondary", "Search", "Piece", "Bodybuilding",
      "Doubled", "Path", "Team", "Chemical", "Card",
      "Basic", "Spray", "Talent", "Upload", "Password",
      "App", "Process", "Free", "Breeze", "Link",
      "Photo", "Speak", "Tag", "Actor", "Height",
      "Request", "States", "Value", "Sun", "November",
      "Astronomy", "Knowledge", "Land", "Major", "Mark"
    ],
    5: [
      "Ton", "Party", "Lemon", "Code", "Ivory",
      "Body", "Wrap", "News", "Bean", "Hard",
      "Chop", "New", "Fire", "Shot", "Leak",
      "Pair", "Dog", "Golf", "Heart", "Iron",
      "See", "Stun", "Plant", "Form", "Age",
      "Deep", "Pilot", "Split", "Youth", "Forum",
      "Poll", "Lace", "Stop", "Wrong", "Album",
      "Ring", "Huge", "Push", "Ideal", "Low",
      "Hurl", "Lump", "Steak", "Top", "Creep",
      "Hide", "Right", "Opponent", "Blush", "Share",
      "Extend", "Enfix", "Food", "Fall", "Graze",
      "Reach", "Doll", "Pot", "Phone", "Sweet"
    ]
  };

  const mockId = document.body.getAttribute('data-mock-id') || '1';
  const WAT_WORDS = window.WAT_WORDS || WAT_DATASETS[mockId] || WAT_DATASETS[1];

  // --- Timing Constants ---
  const WORD_DURATION_SECONDS = 15;
  const PAGE_TURN_DURATION_SECONDS = 15;

  // --- State Variables ---
  let audioCtx = null;
  let bellAudioElem = null;
  let currentWordIndex = 0;
  let timerInterval = null;
  let timeRemaining = WORD_DURATION_SECONDS;
  let isTurnBreak = false;

  // --- DOM Elements ---
  const startMockBtn = document.getElementById('startMockBtn');
  const simOverlay = document.getElementById('watSimOverlay');
  const fullscreenCloseBtn = document.getElementById('fullscreenCloseBtn');
  const stageWord = document.getElementById('watStageWord');
  const stagePageTurn = document.getElementById('watStagePageTurn');
  const wordDisplay = document.getElementById('watWordDisplay');
  const turnSubtitle = document.getElementById('watTurnSubtitle');
  const completionModal = document.getElementById('watCompletionModal');
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
      console.warn('Web Audio synthesis error:', err);
      return false;
    }
  }

  /**
   * Subtle soft chime when words advance
   */
  function playWordTick() {
    try {
      initAudioEngine();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(587, now + 0.07);

      gain.gain.setValueAtTime(0.10, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  function playSchoolBell() {
    initAudioEngine();
    const synthSuccess = synthesizeSchoolBell();

    if (!synthSuccess && bellAudioElem) {
      try {
        bellAudioElem.currentTime = 0;
        bellAudioElem.volume = 0.85;
        const playPromise = bellAudioElem.play();
        if (playPromise !== undefined) {
          playPromise.catch(function (e) {});
        }
      } catch (e) {}
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
  // 3. Test Simulation Lifecycle
  // ==========================================================================
  function startSimulation() {
    initAudioEngine();
    enterFullscreen();

    currentWordIndex = 0;
    isTurnBreak = false;

    if (completionModal) completionModal.classList.remove('active');
    if (simOverlay) simOverlay.classList.add('active');
    if (stagePageTurn) stagePageTurn.classList.remove('active');
    if (stageWord) stageWord.classList.add('active');

    // Ring initial start bell
    playSchoolBell();

    displayCurrentWord();
    startWordCountdown();
  }

  function displayCurrentWord() {
    if (currentWordIndex >= WAT_WORDS.length) {
      finishSimulation();
      return;
    }

    if (stagePageTurn) stagePageTurn.classList.remove('active');
    if (stageWord) stageWord.classList.add('active');

    const wordText = WAT_WORDS[currentWordIndex];

    if (wordDisplay) {
      wordDisplay.style.animation = 'none';
      wordDisplay.offsetHeight;
      wordDisplay.style.animation = '';
      wordDisplay.textContent = wordText;
    }

    if (currentWordIndex > 0) {
      playWordTick();
    }
  }

  function startWordCountdown() {
    if (timerInterval) clearInterval(timerInterval);
    timeRemaining = WORD_DURATION_SECONDS;

    timerInterval = setInterval(function () {
      timeRemaining--;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        advanceNextStep();
      }
    }, 1000);
  }

  function advanceNextStep() {
    currentWordIndex++;

    if (currentWordIndex >= WAT_WORDS.length) {
      finishSimulation();
      return;
    }

    if (currentWordIndex === 20 || currentWordIndex === 40) {
      startPageTurnIntermission();
    } else {
      displayCurrentWord();
      startWordCountdown();
    }
  }

  function startPageTurnIntermission() {
    isTurnBreak = true;
    if (stageWord) stageWord.classList.remove('active');
    if (stagePageTurn) stagePageTurn.classList.add('active');

    playSchoolBell();

    if (turnSubtitle) {
      if (currentWordIndex === 20) {
        turnSubtitle.textContent = 'Words 1 - 20 Completed · Turn over to Page 2 for Words 21 - 40';
      } else {
        turnSubtitle.textContent = 'Words 21 - 40 Completed · Turn over to Page 3 for Words 41 - 60';
      }
    }

    if (timerInterval) clearInterval(timerInterval);
    timeRemaining = PAGE_TURN_DURATION_SECONDS;

    timerInterval = setInterval(function () {
      timeRemaining--;

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        isTurnBreak = false;
        displayCurrentWord();
        startWordCountdown();
      }
    }, 1000);
  }

  function finishSimulation() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;

    playSchoolBell();

    exitFullscreen();

    if (simOverlay) simOverlay.classList.remove('active');
    if (stageWord) stageWord.classList.remove('active');
    if (stagePageTurn) stagePageTurn.classList.remove('active');

    if (completionModal) {
      completionModal.classList.add('active');
    }
  }

  function resetToInstructions() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    currentWordIndex = 0;
    isTurnBreak = false;

    exitFullscreen();

    if (simOverlay) simOverlay.classList.remove('active');
    if (stageWord) stageWord.classList.remove('active');
    if (stagePageTurn) stagePageTurn.classList.remove('active');
    if (completionModal) completionModal.classList.remove('active');
  }

  // ==========================================================================
  // 4. Event Listeners
  // ==========================================================================
  if (startMockBtn) {
    startMockBtn.addEventListener('click', function () {
      startSimulation();
    });
  }

  if (fullscreenCloseBtn) {
    fullscreenCloseBtn.addEventListener('click', function () {
      resetToInstructions();
    });
  }

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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (simOverlay && simOverlay.classList.contains('active')) {
        resetToInstructions();
      } else if (completionModal && completionModal.classList.contains('active')) {
        completionModal.classList.remove('active');
      }
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    initAudioEngine();
  });

})();
