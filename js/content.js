// YouTube History Saver - Content Script

let currentVideoId = null;
let videoSaved = false;

// Extract video information
function extractVideoInfo() {
  try {
    // Get video ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    
    if (!videoId) return null;
    
    // Do not save again if same video already saved
    if (videoId === currentVideoId && videoSaved) {
      return null;
    }
    
    // Wait for page elements to load
    const titleElement = document.querySelector('h1.ytd-watch-metadata yt-formatted-string, h1.title.ytd-video-primary-info-renderer yt-formatted-string');
    const channelElement = document.querySelector('ytd-channel-name a, #channel-name a, #owner-name a');
    const thumbnailElement = document.querySelector('link[rel="image_src"]');
    
    if (!titleElement || !channelElement) {
      return null; // Elements not loaded yet
    }
    
    const title = titleElement.textContent.trim();
    const channel = channelElement.textContent.trim();
    const channelUrl = channelElement.href;
    const thumbnail = thumbnailElement ? thumbnailElement.href : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const videoUrl = window.location.href;
    
    // Get video duration
    let duration = '';
    const durationElement = document.querySelector('.ytp-time-duration');
    if (durationElement) {
      duration = durationElement.textContent.trim();
    }
    
    return {
      videoId,
      title,
      channel,
      channelUrl,
      thumbnail,
      videoUrl,
      duration
    };
  } catch (error) {
    console.error('提取视频信息失败:', error);
    return null;
  }
}

// Save video information
function saveVideo() {
  const videoInfo = extractVideoInfo();
  
  if (videoInfo) {
    chrome.runtime.sendMessage({
      type: 'SAVE_VIDEO',
      data: videoInfo
    });
    
    currentVideoId = videoInfo.videoId;
    videoSaved = true;
    
    console.log('YouTube history saved:', videoInfo.title);
  }
}

// Listen for URL changes (YouTube is SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    videoSaved = false; // Reset save status
    
    if (url.includes('/watch?v=')) {
      // Delay save, wait for page elements
      setTimeout(() => {
        saveVideo();
      }, 2000);
    }
  }
}).observe(document, { subtree: true, childList: true });

// Save on initial load
if (window.location.href.includes('/watch?v=')) {
  // Wait for page fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(saveVideo, 2000);
    });
  } else {
    setTimeout(saveVideo, 2000);
  }
}

// Listen for video play event (more accurate trigger)
function setupVideoListener() {
  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('play', () => {
      if (!videoSaved) {
        setTimeout(saveVideo, 1000);
      }
    }, { once: false });
  } else {
    // If video element not loaded, retry later
    setTimeout(setupVideoListener, 1000);
  }
}

setupVideoListener();

console.log('YouTube History Saver content script loaded');
