/**
 * SSB Mock Tests - Fixed Fullscreen & Dynamic Title
 */

let playPromise; 
let isTestActive = false; 

// --- DYNAMIC TITLE UPDATER ---
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById("mockTitle");
    
    // Get only the last part of the path (the filename)
    const pathArray = window.location.pathname.split('/');
    const fileName = pathArray[pathArray.length - 1]; 
    
    // Regex to find digits in the filename
    const match = fileName.match(/\d+/); 
    
    if (match && titleElement) {
        const testNum = match[0];
        titleElement.textContent = "Mock Test " + testNum;
        document.title = "Mock Test " + testNum; 
    }
});

// --- VIDEO & FULLSCREEN LOGIC ---

window.startMockTest = function() {
    const container = document.getElementById("videoContainer");
    const video = document.getElementById("testVideo");

    if (!container || !video) {
        alert("Error: Video player not found.");
        return;
    }

    if (container.style.display === "flex") return; 

    // Prepare Container
    container.style.display = "flex";
    container.style.backgroundColor = "black"; // Ensure background is black
    
    // FIX: Force video to fill container
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain"; 

    isTestActive = true; 
    
    try {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { 
            container.msRequestFullscreen();
        }
    } catch (err) {
        console.warn("Fullscreen failed:", err);
    }

    video.load(); 

    video.ontimeupdate = function() {
        if (isTestActive && video.duration > 0 && video.currentTime >= (video.duration - 0.5)) {
            window.exitMockTest();
        }
    };

    video.onended = function() {
        if (isTestActive) {
            window.exitMockTest();
        }
    };

    video.currentTime = 0;
    playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => console.error("Playback error:", error));
    }
};

window.safePause = function(video) {
    if (playPromise !== undefined) {
        playPromise.then(() => {
            video.pause();
            video.currentTime = 0;
        }).catch(() => {
            video.currentTime = 0;
        });
    } else {
        video.pause();
        video.currentTime = 0;
    }
};

window.exitMockTest = function() {
    const container = document.getElementById("videoContainer");
    const video = document.getElementById("testVideo");
    isTestActive = false; 

    if (!container || !video) return;

    try {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    } catch (err) {
        console.warn("FS Exit handled by browser.");
    }

    container.style.display = "none";
    window.safePause(video);
};

// Handle ESC key
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const container = document.getElementById("videoContainer");
        if (container && container.style.display === "flex") {
            window.exitMockTest();
        }
    }
});