// --- Preloader & Mobile Nav ---
window.addEventListener('load', function () {
    const p = document.getElementById('js-preloader');
    if (p) { p.style.opacity = '0'; setTimeout(() => p.style.display='none', 400); }
});

document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('mobileNav').classList.toggle('open');
});

// --- OIR Logic ---
// Instead of fetching, we just grab the oirData variable from OIR_Questions.js
let questions = oirData; 
let currentIndex = 0;
let hasAnswered = false; 

// Render the current question to the DOM
function renderQuestion(index) {
    // If there are no questions, show an error
    if (!questions || questions.length === 0) {
        document.getElementById('questionCard').innerHTML = "<div class='q-text'>No questions found.</div>";
        return;
    }

    const qData = questions[index];
    hasAnswered = false; 
    
    const card = document.getElementById('questionCard');
    
    // Check if image exists
    const imageHTML = (qData.type === 'image' && qData.imageUrl) 
        ? `<img src="${qData.imageUrl}" class="q-image" alt="OIR Question Image">` 
        : ``;

    // Generate options HTML
    let optionsHTML = '';
    qData.options.forEach((opt, idx) => {
        optionsHTML += `
            <button class="option-btn" onclick="checkAnswer(${idx})" id="opt-${idx}">
                ${opt}
                <i class="fa-solid fa-circle-check opt-icon check-icon"></i>
                <i class="fa-solid fa-circle-xmark opt-icon cross-icon"></i>
            </button>
        `;
    });

    // Main Card HTML Injection
    card.innerHTML = `
        <span class="q-number">Question ${index + 1} of ${questions.length}</span>
        <div class="q-text">${qData.questionText}</div>
        ${imageHTML}
        
        <div class="options-container">
            ${optionsHTML}
        </div>

        <div class="reason-box" id="reasonBox">
            <div class="reason-title">Explanation</div>
            <div class="reason-text">${qData.reason}</div>
        </div>

        <div class="action-row">
            <button class="btn-reveal" onclick="revealAnswer()">Reveal Answer & Reason</button>
            <div style="display: flex; gap: 10px;">
                <button class="btn-nav" onclick="prevQuestion()" ${index === 0 ? 'disabled' : ''}>Previous</button>
                <button class="btn-nav" onclick="nextQuestion()" ${index === questions.length - 1 ? 'disabled' : ''}>Next Question</button>
            </div>
        </div>
    `;
}

// Function triggered when an option is clicked
window.checkAnswer = function(selectedIndex) {
    const qData = questions[currentIndex];
    const options = document.querySelectorAll('.option-btn');

    // Reset all buttons visually before applying new state
    options.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.querySelector('.check-icon').style.display = 'none';
        btn.querySelector('.cross-icon').style.display = 'none';
    });

    const selectedBtn = document.getElementById(`opt-${selectedIndex}`);

    // Check correctness
    if (selectedIndex === qData.correctAnswerIndex) {
        selectedBtn.classList.add('correct');
        selectedBtn.querySelector('.check-icon').style.display = 'block';
        hasAnswered = true; 
    } else {
        selectedBtn.classList.add('wrong');
        selectedBtn.querySelector('.cross-icon').style.display = 'block';
    }
}

// Reveal answer without clicking an option
window.revealAnswer = function() {
    const qData = questions[currentIndex];
    
    // Highlight correct answer
    const correctBtn = document.getElementById(`opt-${qData.correctAnswerIndex}`);
    correctBtn.classList.add('correct');
    correctBtn.querySelector('.check-icon').style.display = 'block';

    // Show reason box
    document.getElementById('reasonBox').classList.add('show');
    
    // Lock all options
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));
    hasAnswered = true;
}

// Navigation Functions
window.nextQuestion = function() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion(currentIndex);
    }
}

window.prevQuestion = function() {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion(currentIndex);
    }
}

// Start sequence directly
renderQuestion(currentIndex);