document.write(`
  <nav class="navbar">
    <a href="#" class="nav-brand">
      <svg viewBox="0 0 448 512"><path fill="currentColor" d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"/><path fill="currentColor" d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"/></svg>
      PPDT Mock
    </a>
    <ul class="nav-links">
      <li>
        <a href="https://ssb.colonelvyas.org/PPDT" class="nav-link">
          <svg viewBox="0 0 16 16"><path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/></svg>
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="http://g.page/DOSPDP" class="nav-link" target="_blank">
          <svg viewBox="0 0 48 48"><path fill="#FBBC05" d="M0 37V11l17 13z"/><path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
          <span>Review Us</span>
        </a>
      </li>
    </ul>
  </nav>

  <main>
    <div class="intro-card" id="introCard">
      <img src="../assets/images/logo-icon.png" alt="DOSPDP Logo" class="intro-logo">
      
      <h1>Picture Perception<br> & Description Test</h1>
      <p>Mock Test 2</p>
      
      <div class="instructions-box">
        <h2>Read Before Starting</h2>
        <ul>
          <li>Use full screen for best results on desktop, and landscape mode on mobile.</li>
          <li>You will have 30 seconds to observe the picture, followed by 4.5 minutes to write the action and story.</li>
          <li><a href="pdf/sample.pdf" target="_blank">Download Sample Answer Sheet</a></li>
        </ul>
      </div>

      <button class="btn-start" onClick="startMockTest()">
        Start Mock Test
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>
      </button>
    </div>

    <div id="videoContainer" style="display: none; background: #000; width: 100%; height: 100vh; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; z-index: 9999;">
      <video id="testVideo" poster="PPDT-poster.png" muted style="max-width: 100%; max-height: 100vh;">
        <source src="vid/4.mp4" type="video/mp4">
        Your browser does not support this test. Please use Google Chrome or Brave Browser.
      </video>
      
      <button id="exitBtn" onClick="exitMockTest()" style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 12px 24px; border-radius: 50px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
        Exit Test Mode
      </button>
    </div>
  </main>
`);

// --- Integrated Fullscreen & Video Logic ---

function startMockTest() {
  const container = document.getElementById("videoContainer");
  const video = document.getElementById("testVideo");

  // Show the video container
  container.style.display = "flex";
  
  // Request Fullscreen on the container
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) { /* Safari */
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) { /* IE11 */
    container.msRequestFullscreen();
  }

  // Play the video
  video.play();
}

function exitMockTest() {
  const container = document.getElementById("videoContainer");
  const video = document.getElementById("testVideo");

  // Exit Fullscreen
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }

  // Pause the video and reset it
  video.pause();
  video.currentTime = 0;

  // Hide the video container
  container.style.display = "none";
}

// Optional: Automatically handle user pressing "ESC" to exit fullscreen
document.addEventListener('fullscreenchange', (event) => {
  if (!document.fullscreenElement) {
    // If the browser exited fullscreen natively (like pressing ESC), ensure the video stops and hides.
    const container = document.getElementById("videoContainer");
    const video = document.getElementById("testVideo");
    video.pause();
    container.style.display = "none";
  }
});
