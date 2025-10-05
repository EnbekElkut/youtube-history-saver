// YouTube History Saver - Background Script

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_VIDEO') {
    saveVideoToHistory(message.data);
  } else if (message.type === 'GET_HISTORY') {
    getHistory(message.filters).then(sendResponse);
    return true; // 异步响应
  } else if (message.type === 'DELETE_HISTORY') {
    deleteHistory(message.videoId).then(sendResponse);
    return true;
  } else if (message.type === 'CLEAR_ALL_HISTORY') {
    clearAllHistory().then(sendResponse);
    return true;
  } else if (message.type === 'EXPORT_HISTORY') {
    exportHistory().then(sendResponse);
    return true;
  } else if (message.type === 'IMPORT_HISTORY') {
    importHistory(message.data).then(sendResponse);
    return true;
  }
});

// Save video to history
async function saveVideoToHistory(videoData) {
  try {
    const result = await chrome.storage.local.get(['videoHistory']);
    let history = result.videoHistory || {};
    
    const videoId = videoData.videoId;
    const timestamp = Date.now();
    
    // If video exists, update watch count and last watched time
    if (history[videoId]) {
      history[videoId].watchCount = (history[videoId].watchCount || 1) + 1;
      history[videoId].lastWatched = timestamp;
      history[videoId].watchHistory = history[videoId].watchHistory || [];
      history[videoId].watchHistory.push(timestamp);
    } else {
      // New video
      history[videoId] = {
        ...videoData,
        firstWatched: timestamp,
        lastWatched: timestamp,
        watchCount: 1,
        watchHistory: [timestamp]
      };
    }
    
    await chrome.storage.local.set({ videoHistory: history });
    
    // Update statistics
    await updateStats();
    
    console.log('Video saved to history:', videoData.title);
  } catch (error) {
    console.error('保存视频失败:', error);
  }
}

// Get history
async function getHistory(filters = {}) {
  try {
    const result = await chrome.storage.local.get(['videoHistory']);
    const history = result.videoHistory || {};
    
    let videos = Object.values(history);
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      videos = videos.filter(v => 
        v.title.toLowerCase().includes(searchLower) ||
        v.channel.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply date filter
    if (filters.dateFrom) {
      videos = videos.filter(v => v.lastWatched >= filters.dateFrom);
    }
    if (filters.dateTo) {
      videos = videos.filter(v => v.lastWatched <= filters.dateTo);
    }
    
    // Sort by last watched time (descending)
    videos.sort((a, b) => b.lastWatched - a.lastWatched);
    
    return {
      success: true,
      videos: videos,
      total: videos.length
    };
  } catch (error) {
    console.error('获取历史记录失败:', error);
    return { success: false, error: error.message };
  }
}

// Delete single history record
async function deleteHistory(videoId) {
  try {
    const result = await chrome.storage.local.get(['videoHistory']);
    const history = result.videoHistory || {};
    
    if (history[videoId]) {
      delete history[videoId];
      await chrome.storage.local.set({ videoHistory: history });
      await updateStats();
      return { success: true };
    }
    
    return { success: false, error: '视频不存在' };
  } catch (error) {
    console.error('删除历史记录失败:', error);
    return { success: false, error: error.message };
  }
}

// Clear all history
async function clearAllHistory() {
  try {
    await chrome.storage.local.set({ videoHistory: {}, stats: {} });
    return { success: true };
  } catch (error) {
    console.error('清空历史记录失败:', error);
    return { success: false, error: error.message };
  }
}

// Export history
async function exportHistory() {
  try {
    const result = await chrome.storage.local.get(['videoHistory']);
    const history = result.videoHistory || {};
    
    return {
      success: true,
      data: JSON.stringify(history, null, 2)
    };
  } catch (error) {
    console.error('导出历史记录失败:', error);
    return { success: false, error: error.message };
  }
}

// Import history
async function importHistory(data) {
  try {
    const importedHistory = JSON.parse(data);
    const result = await chrome.storage.local.get(['videoHistory']);
    const existingHistory = result.videoHistory || {};
    
    // Merge history
    const mergedHistory = { ...existingHistory, ...importedHistory };
    
    await chrome.storage.local.set({ videoHistory: mergedHistory });
    await updateStats();
    
    return { 
      success: true, 
      imported: Object.keys(importedHistory).length,
      total: Object.keys(mergedHistory).length
    };
  } catch (error) {
    console.error('导入历史记录失败:', error);
    return { success: false, error: error.message };
  }
}

// Update statistics
async function updateStats() {
  try {
    const result = await chrome.storage.local.get(['videoHistory']);
    const history = result.videoHistory || {};
    
    const videos = Object.values(history);
    const totalVideos = videos.length;
    const totalWatches = videos.reduce((sum, v) => sum + (v.watchCount || 1), 0);
    
    // Calculate channel statistics
    const channelStats = {};
    videos.forEach(v => {
      if (!channelStats[v.channel]) {
        channelStats[v.channel] = 0;
      }
      channelStats[v.channel]++;
    });
    
    const stats = {
      totalVideos,
      totalWatches,
      topChannels: Object.entries(channelStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([channel, count]) => ({ channel, count }))
    };
    
    await chrome.storage.local.set({ stats });
  } catch (error) {
    console.error('更新统计信息失败:', error);
  }
}

// Listen for tab updates (fallback)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    // Tab loaded, content script will handle it
  }
});

console.log('YouTube History Saver background script started');
