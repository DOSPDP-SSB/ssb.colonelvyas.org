/**
 * DOSPDP - SSB Preparation Portal
 * Main JavaScript Application File
 * Vanilla JS - No External Dependencies
 */

(function () {
  'use strict';

  // --- DOM Element References ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moonIcon = themeToggleBtn ? themeToggleBtn.querySelector('.moon-icon') : null;
  const sunIcon = themeToggleBtn ? themeToggleBtn.querySelector('.sun-icon') : null;

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');

  const modal = document.getElementById('portalModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalCategoryBadge = document.getElementById('modalCategoryBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalStatDuration = document.getElementById('modalStatDuration');
  const modalStatQuestions = document.getElementById('modalStatQuestions');
  const modalStatMode = document.getElementById('modalStatMode');

  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  // ==========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';

    setTheme(initialTheme);
  }

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (moonIcon && sunIcon) {
      if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
      } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  // ==========================================================================
  // 2. Mobile Sidebar Navigation Drawer
  // ==========================================================================
  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openSidebar);
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
  }

  // Close sidebar on link click (mobile)
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });

  // ==========================================================================
  // 3. Interactive Modal Dialogs (Mock Tests & Course Details)
  // ==========================================================================
  function openModal(data) {
    if (!modal) return;

    if (modalCategoryBadge) modalCategoryBadge.textContent = data.badge || 'ASSESSMENT';
    if (modalTitle) modalTitle.textContent = data.title || 'SSB Assessment';
    if (modalDescription) modalDescription.textContent = data.description || '';
    if (modalStatDuration) modalStatDuration.textContent = data.duration || 'Flexible';
    if (modalStatQuestions) modalStatQuestions.textContent = data.questions || 'Standard';
    if (modalStatMode) modalStatMode.textContent = data.mode || 'Online';
    if (modalConfirmBtn) modalConfirmBtn.textContent = data.actionText || 'Begin Assessment';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', function () {
      const actionName = modalTitle ? modalTitle.textContent : 'Assessment';
      closeModal();
      showToast(`Starting ${actionName}... Launching module.`);
    });
  }

  // Keyboard accessibility (Escape key closes drawer & modal)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeSidebar();
    }
  });

  // Wire up "Start Test" buttons
  const startTestButtons = document.querySelectorAll('.start-test-btn');
  startTestButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      const testName = this.getAttribute('data-test-name');
      const fullName = this.getAttribute('data-full-name');
      const duration = this.getAttribute('data-duration');
      const questions = this.getAttribute('data-questions');
      const instructions = this.getAttribute('data-instructions');

      openModal({
        badge: 'MOCK TEST SIMULATOR',
        title: `${testName} - ${fullName}`,
        description: instructions,
        duration: duration,
        questions: questions,
        mode: 'Timed Simulator',
        actionText: 'Start Test Now'
      });
    });
  });

  // Wire up "Start Course" buttons & Video Card clicks
  const startCourseButtons = document.querySelectorAll('.start-course-btn');
  startCourseButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      const title = this.getAttribute('data-course-title');
      const duration = this.getAttribute('data-duration');
      const desc = this.getAttribute('data-desc');

      openModal({
        badge: 'COURSE / VIDEO MODULE',
        title: title,
        description: desc,
        duration: duration,
        questions: 'Structured',
        mode: 'Self-Paced Stream',
        actionText: 'Start Learning'
      });
    });
  });

  // Wire up blog card previews
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', function () {
      const title = this.querySelector('.blog-title') ? this.querySelector('.blog-title').textContent : 'Blog Post';
      const meta = this.querySelector('.blog-meta') ? this.querySelector('.blog-meta').textContent : '';
      openModal({
        badge: 'ARTICLE PREVIEW',
        title: title,
        description: `Read this comprehensive guide to develop practical Officer-Like Qualities (OLQs), psychological resilience, and screening techniques. Published: ${meta}.`,
        duration: '5-8 Mins Read',
        questions: 'Full Article',
        mode: 'Online Article',
        actionText: 'Read Full Guide'
      });
    });
  });

  // ==========================================================================
  // 4. Interactive Filters & Search
  // ==========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      const parent = this.parentElement;
      if (parent) {
        parent.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      }
      this.classList.add('active');
      const filterVal = (this.getAttribute('data-filter') || this.textContent.trim()).toLowerCase();
      
      const cards = document.querySelectorAll('.course-card, .blog-card, .mock-test-card, .video-card');
      cards.forEach(card => {
        const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
        const cardTag = (card.querySelector('.video-tag, .course-badge, .blog-tag')?.textContent || '').toLowerCase();
        const cardText = card.textContent.toLowerCase();
        
        if (filterVal === 'all' || filterVal === 'all videos' || filterVal === 'all courses' || 
            cardCat === filterVal || cardCat.includes(filterVal) || 
            cardTag.includes(filterVal) || cardText.includes(filterVal)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
      showToast(`Showing: ${this.textContent.trim()}`);
    });
  });

  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.course-card, .blog-card, .mock-test-card, .video-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 5. SSB Readiness Diagnostic Score Calculator
  // ==========================================================================
  const readinessCheckboxes = document.querySelectorAll('.readiness-checklist input[type="checkbox"]');
  const readinessScoreVal = document.getElementById('readinessScore');

  function updateReadinessScore() {
    if (!readinessCheckboxes.length || !readinessScoreVal) return;
    const total = readinessCheckboxes.length;
    let checked = 0;
    readinessCheckboxes.forEach(chk => {
      if (chk.checked) checked++;
    });
    const percentage = Math.round((checked / total) * 100);
    readinessScoreVal.textContent = `${percentage}%`;
  }

  if (readinessCheckboxes.length) {
    readinessCheckboxes.forEach(chk => {
      chk.addEventListener('change', function () {
        updateReadinessScore();
        showToast(`Readiness Score updated: ${readinessScoreVal.textContent}`);
      });
    });
    updateReadinessScore();
  }

  // ==========================================================================
  // 6. Toast Notification System
  // ==========================================================================
  function showToast(message) {
    if (!toastNotice || !toastMessage) return;

    toastMessage.textContent = message;
    toastNotice.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
  });

})();
