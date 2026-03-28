// --- UNIVERSAL PPDT MOCK TEST ENGINE ---

document.addEventListener("DOMContentLoaded", () => {
    updateMockUI();
});

/**
 * Automatically updates the "Mock Test X" heading 
 * based on the video filename found in the HTML.
 */
function updateMockUI() {
    const source = document.getElementById("videoSource");
    const mockTitle = document.getElementById("mockTitle");
    
    if (source && mockTitle) {
        const srcPath = source.getAttribute("src");
        // Extracts the number from the filename (e.g., "3.mp4" -> "3")
        const match = srcPath.match(/(\d+)\.mp4/);
        if (match && match[1]) {
            mockTitle.innerText = `Mock Test ${match[1]}`;
        }
    }
}

window.startMockTest = function() {
    const container = document.getElementById("videoContainer");
    const video = document.getElementById("testVideo");
    const source = document.getElementById("videoSource");

    if (!container || !video || !source) {
        console.error("Required elements missing. Check HTML IDs.");
        return;
    }

    // --- PATH CORRECTION LOGIC ---
    // Fixes the inconsistency between '../PPDT_video/' and 'PPDT_video/'
    let videoUrl = source.getAttribute("src");
    if (!videoUrl.startsWith("../")) {
        videoUrl = "../" + videoUrl;
    }
    video.src = videoUrl;

    // --- CLEAN UI CONFIGURATION ---
    video.controls = false; 
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback');
    video.disablePictureInPicture = true;
    
    // Show the video container
    container.style.display = "flex";

    // --- FULLSCREEN EXECUTION ---
    try {
        const requestMethod = container.requestFullscreen || 
                              container.webkitRequestFullscreen || 
                              container.mozRequestFullScreen || 
                              container.msRequestFullscreen;
        if (requestMethod) requestMethod.call(container);
    } catch (err) {
        console.warn("Fullscreen blocked, playing in window.");
    }

    // --- PLAYBACK ---
    video.load();
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Autoplay blocked. Showing manual play button.");
            video.controls = true; 
        });
    }

    // --- AUTO-CLOSE LOGIC ---
    // Closes when video ends or is 0.3s from the end
    video.onended = () => window.exitMockTest();
    
    video.ontimeupdate = function() {
        if (video.duration > 0 && video.currentTime >= (video.duration - 0.3)) {
            window.exitMockTest();
        }
    };
};

window.exitMockTest = function() {
    const container = document.getElementById("videoContainer");
    const video = document.getElementById("testVideo");

    // Exit Fullscreen mode if active
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        const exitMethod = document.exitFullscreen || document.webkitExitFullscreen;
        if (exitMethod) exitMethod.call(document).catch(() => {});
    }

    // Hide container and reset video to stop background buffering
    if (container) container.style.display = "none";
    if (video) {
        video.pause();
        video.src = ""; 
        video.load();
    }
};

// Handle the ESC key or Back button manually exiting fullscreen
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        window.exitMockTest();
    }
});