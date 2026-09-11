/**
 * SSB Preparation Portal
 * Course Engine: What SSB wants from you?
 * File: courses/what-ssb-wants-from-you.js
 * Pure Vanilla JS - Fast, Minimalist, Zero Dependencies
 */

(function () {
  'use strict';

  // --- Course Units Metadata ---
  const COURSE_MODULES = [
    { id: 'mapping-mvk', title: '1. Mapping Manasa-Vacha-Karma', type: 'Lesson', duration: '10 min' },
    { id: 'key-traits', title: '2. Key traits assessors look for', type: 'Lesson', duration: '10 min' },
    { id: 'understanding-yourself', title: '3. Understanding Yourself', type: 'Lesson', duration: '8 min' },
    { id: 'your-swot', title: '4. Your SWOT Analysis', type: 'Lesson', duration: '5 min' },
    { id: 'decoding-swot', title: '5. Decoding Your SWOT', type: 'Lesson', duration: '10 min' },
    { id: 'assessment', title: '6. Assessment Check', type: 'Assessment', duration: '3 min' }
  ];

  const TOTAL_UNITS = COURSE_MODULES.length;
  const CORRECT_QUIZ_ANSWER_INDEX = 1; // Vacha (Option B)

  // --- Storage Keys ---
  const STORAGE_KEY_CURRENT = 'ssb_course_wswfy_current_unit';
  const STORAGE_KEY_COMPLETED = 'ssb_course_wswfy_completed_units';
  const STORAGE_KEY_THEME = 'theme';

  // --- State Variables ---
  let currentUnitIndex = 0;
  let completedUnits = new Set();
  let selectedQuizOption = null;
  let toastTimer = null;

  // --- DOM References ---
  const htmlElement = document.documentElement;
  const playerViewport = document.getElementById('playerViewport');
  const syllabusItems = document.querySelectorAll('.syllabus-item');
  const unitStages = document.querySelectorAll('.lesson-stage');

  const btnPrevLesson = document.getElementById('btnPrevLesson');
  const btnNextLesson = document.getElementById('btnNextLesson');
  const bottomLessonCounter = document.getElementById('bottomLessonCounter');

  const headerProgressPercent = document.getElementById('headerProgressPercent');
  const headerProgressCount = document.getElementById('headerProgressCount');
  const headerProgressBar = document.getElementById('headerProgressBar');
  const topProgressLine = document.getElementById('topProgressLine');

  const playerSidebar = document.getElementById('playerSidebar');
  const playerSidebarBackdrop = document.getElementById('playerSidebarBackdrop');
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const resetProgressBtn = document.getElementById('resetProgressBtn');

  const quizOptions = document.querySelectorAll('.quiz-simple-opt');
  const btnSubmitQuiz = document.getElementById('btnSubmitQuiz');
  const btnRetryQuiz = document.getElementById('btnRetryQuiz');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const courseCompleteBanner = document.getElementById('courseCompleteBanner');

  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // ==========================================================================
  // 1. Initial State Restoration
  // ==========================================================================
  function loadSavedState() {
    // Theme
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const initialTheme = savedTheme || 'light';
    applyTheme(initialTheme);

    // Completed Units
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) {
          completedUnits = new Set(parsed);
        }
      }
    } catch (err) {
      console.warn('Error loading completed units:', err);
      completedUnits = new Set();
    }

    // Current Unit Index
    const savedUnit = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (savedUnit !== null) {
      const parsedIndex = parseInt(savedUnit, 10);
      if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < TOTAL_UNITS) {
        currentUnitIndex = parsedIndex;
      }
    }

    completedUnits.add(currentUnitIndex);
    saveProgress();
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, currentUnitIndex.toString());
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(Array.from(completedUnits)));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // ==========================================================================
  // 2. Unit Navigation & Smooth Fast Transitions
  // ==========================================================================
  function goToUnit(targetIndex) {
    if (targetIndex < 0 || targetIndex >= TOTAL_UNITS) return;

    const prevIndex = currentUnitIndex;
    currentUnitIndex = targetIndex;

    completedUnits.add(prevIndex);
    completedUnits.add(targetIndex);
    saveProgress();

    // Toggle active stage
    unitStages.forEach((stage, idx) => {
      if (idx === targetIndex) {
        stage.classList.add('active');
      } else {
        stage.classList.remove('active');
      }
    });

    // Scroll viewport to top
    if (playerViewport) {
      playerViewport.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Syllabus sidebar active item
    updateSyllabusSidebar();

    // Update Navigation controls
    updateNavigationControls();

    // Update Progress Bars
    updateProgressDisplay();

    // Close mobile sidebar if open
    closeMobileSidebar();
  }

  function updateSyllabusSidebar() {
    syllabusItems.forEach((item, idx) => {
      const isCurrent = idx === currentUnitIndex;
      const isCompleted = completedUnits.has(idx);

      item.classList.toggle('active', isCurrent);
      item.classList.toggle('completed', isCompleted);

      if (isCurrent && playerSidebar) {
        const itemTop = item.offsetTop;
        const itemBottom = itemTop + item.offsetHeight;
        const sidebarTop = playerSidebar.scrollTop;
        const sidebarBottom = sidebarTop + playerSidebar.clientHeight;

        if (itemTop < sidebarTop || itemBottom > sidebarBottom) {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  function updateNavigationControls() {
    // Previous Button
    if (btnPrevLesson) {
      btnPrevLesson.disabled = currentUnitIndex <= 0;
    }

    // Next Button
    if (btnNextLesson) {
      if (currentUnitIndex >= TOTAL_UNITS - 1) {
        btnNextLesson.innerHTML = `<span>Finish Course</span>`;
      } else {
        btnNextLesson.innerHTML = `<span>Next Lesson →</span>`;
      }
    }

    // Center Counter
    if (bottomLessonCounter) {
      bottomLessonCounter.textContent = `Module ${currentUnitIndex + 1} of ${TOTAL_UNITS}`;
    }
  }

  function updateProgressDisplay() {
    const doneCount = completedUnits.size;
    const percent = Math.round((doneCount / TOTAL_UNITS) * 100);

    if (headerProgressPercent) headerProgressPercent.textContent = `${percent}%`;
    if (headerProgressCount) headerProgressCount.textContent = `${doneCount}/${TOTAL_UNITS} Done`;
    if (headerProgressBar) headerProgressBar.style.width = `${percent}%`;
    if (topProgressLine) topProgressLine.style.width = `${percent}%`;
  }

  // ==========================================================================
  // 3. Interactive Quiz Assessment Evaluation
  // ==========================================================================
  function initQuiz() {
    quizOptions.forEach((btn, index) => {
      btn.addEventListener('click', function () {
        if (quizFeedbackBox && quizFeedbackBox.style.display !== 'none' && !btnRetryQuiz.matches(':focus')) {
          return;
        }

        quizOptions.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedQuizOption = index;

        if (btnSubmitQuiz) {
          btnSubmitQuiz.disabled = false;
        }
      });
    });

    if (btnSubmitQuiz) {
      btnSubmitQuiz.addEventListener('click', function () {
        if (selectedQuizOption === null) return;

        const isCorrect = selectedQuizOption === CORRECT_QUIZ_ANSWER_INDEX;

        quizOptions.forEach((btn, idx) => {
          btn.classList.remove('correct', 'incorrect');
          if (idx === CORRECT_QUIZ_ANSWER_INDEX) {
            btn.classList.add('correct');
          } else if (idx === selectedQuizOption && !isCorrect) {
            btn.classList.add('incorrect');
          }
        });

        if (quizFeedbackBox) {
          quizFeedbackBox.style.display = 'block';
          quizFeedbackBox.className = `quiz-simple-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        }

        if (feedbackTitle) {
          feedbackTitle.innerHTML = isCorrect 
            ? '<strong>✓ Correct!</strong> Vacha (What you speak) is evaluated through verbal dialogue by the Interviewing Officer.' 
            : '<strong>✕ Incorrect.</strong> Rationale: Vacha (What you speak) is evaluated through verbal dialogue by the Interviewing Officer.';
        }

        btnSubmitQuiz.style.display = 'none';
        if (btnRetryQuiz) btnRetryQuiz.style.display = 'inline-flex';

        completedUnits.add(TOTAL_UNITS - 1);
        saveProgress();
        updateProgressDisplay();
        updateSyllabusSidebar();

        if (courseCompleteBanner) {
          courseCompleteBanner.style.display = 'block';
          courseCompleteBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        showToast(isCorrect ? 'Correct! Module completed.' : 'Review the rationale.');
      });
    }

    if (btnRetryQuiz) {
      btnRetryQuiz.addEventListener('click', function () {
        selectedQuizOption = null;
        quizOptions.forEach(btn => {
          btn.classList.remove('selected', 'correct', 'incorrect');
        });

        if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';
        btnSubmitQuiz.style.display = 'inline-flex';
        btnSubmitQuiz.disabled = true;
        btnRetryQuiz.style.display = 'none';
      });
    }
  }

  // ==========================================================================
  // 4. Theme Management (Light / Dark Mode)
  // ==========================================================================
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);

    const moonIcons = document.querySelectorAll('.moon-icon');
    const sunIcons = document.querySelectorAll('.sun-icon');

    if (theme === 'dark') {
      moonIcons.forEach(i => i.style.display = 'none');
      sunIcons.forEach(i => i.style.display = 'block');
    } else {
      moonIcons.forEach(i => i.style.display = 'block');
      sunIcons.forEach(i => i.style.display = 'none');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // ==========================================================================
  // 5. Mobile Sidebar Toggling
  // ==========================================================================
  function openMobileSidebar() {
    if (playerSidebar) playerSidebar.classList.add('open');
    if (playerSidebarBackdrop) playerSidebarBackdrop.classList.add('active');
  }

  function closeMobileSidebar() {
    if (playerSidebar) playerSidebar.classList.remove('open');
    if (playerSidebarBackdrop) playerSidebarBackdrop.classList.remove('active');
  }

  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', function () {
      if (playerSidebar && playerSidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (playerSidebarBackdrop) {
    playerSidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // ==========================================================================
  // 6. Reset Progress Capability
  // ==========================================================================
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', function () {
      if (confirm('Reset course progress to the beginning?')) {
        completedUnits = new Set([0]);
        currentUnitIndex = 0;
        localStorage.removeItem(STORAGE_KEY_CURRENT);
        localStorage.removeItem(STORAGE_KEY_COMPLETED);

        if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';
        if (courseCompleteBanner) courseCompleteBanner.style.display = 'none';
        if (btnRetryQuiz) btnRetryQuiz.click();

        goToUnit(0);
        showToast('Course progress reset.');
      }
    });
  }

  // ==========================================================================
  // 7. Event Listeners & Keyboard Navigation
  // ==========================================================================
  function initEventListeners() {
    syllabusItems.forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-unit-index'), 10);
        if (!isNaN(index)) {
          goToUnit(index);
        }
      });
    });

    if (btnPrevLesson) {
      btnPrevLesson.addEventListener('click', function () {
        if (currentUnitIndex > 0) {
          goToUnit(currentUnitIndex - 1);
        }
      });
    }

    if (btnNextLesson) {
      btnNextLesson.addEventListener('click', function () {
        if (currentUnitIndex < TOTAL_UNITS - 1) {
          goToUnit(currentUnitIndex + 1);
        } else {
          showToast('You are on the final Assessment module.');
          const quizCard = document.getElementById('quizContainer');
          if (quizCard) quizCard.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentUnitIndex < TOTAL_UNITS - 1) {
          goToUnit(currentUnitIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentUnitIndex > 0) {
          goToUnit(currentUnitIndex - 1);
        }
      } else if (e.key === 'Escape') {
        closeMobileSidebar();
      }
    });
  }

  // ==========================================================================
  // 8. Toast Notification System
  // ==========================================================================
  function showToast(message) {
    if (!toastNotice || !toastMessage) return;

    toastMessage.textContent = message;
    toastNotice.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastNotice.classList.remove('show');
    }, 2400);
  }

  // ==========================================================================
  // 9. Initialization
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    loadSavedState();
    initEventListeners();
    initQuiz();
    goToUnit(currentUnitIndex);
  });

})();
