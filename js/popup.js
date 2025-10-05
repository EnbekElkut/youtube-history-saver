// YouTube History Saver - Popup Script

let allVideos = [];
let filteredVideos = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadHistory();
  loadStats();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search
  document.getElementById('searchBtn').addEventListener('click', handleSearch);
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  
  // Filter
  document.getElementById('filterBtn').addEventListener('click', handleFilter);
  document.getElementById('resetBtn').addEventListener('click', handleReset);
  
  // Export/Import/Clear
  document.getElementById('exportBtn').addEventListener('click', handleExport);
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFile').click();
  });
  document.getElementById('importFile').addEventListener('change', handleImport);
  document.getElementById('clearBtn').addEventListener('click', handleClear);
}

// Load history
async function loadHistory(filters = {}) {
  const historyList = document.getElementById('historyList');
  const emptyState = document.getElementById('emptyState');
  
  historyList.innerHTML = '<div class="loading">加载中...</div>';
  emptyState.style.display = 'none';
  
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'GET_HISTORY',
      filters: filters
    });
    
    if (response.success) {
      allVideos = response.videos;
      filteredVideos = allVideos;
      
      if (filteredVideos.length === 0) {
        historyList.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        renderVideos(filteredVideos);
      }
    } else {
      historyList.innerHTML = '<div class="loading">加载失败</div>';
    }
  } catch (error) {
    console.error('Failed to load history:', error);
    historyList.innerHTML = '<div class="loading">加载失败</div>';
  }
}

// Render video list
function renderVideos(videos) {
  const historyList = document.getElementById('historyList');
  
  if (videos.length === 0) {
    historyList.innerHTML = '<div class="loading">没有找到匹配的记录</div>';
    return;
  }
  
  historyList.innerHTML = videos.map(video => {
    const lastWatched = formatDate(video.lastWatched);
    const watchCount = video.watchCount || 1;
    
    return `
      <div class="video-card" data-video-id="${video.videoId}">
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='icons/icon128.png'">
          ${video.duration ? `<div class="video-duration">${video.duration}</div>` : ''}
        </div>
        <div class="video-info">
          <div>
            <div class="video-title">${escapeHtml(video.title)}</div>
            <div class="video-channel">📺 ${escapeHtml(video.channel)}</div>
          </div>
          <div class="video-meta">
            <span>🕐 ${lastWatched}</span>
            <span>👁️ 观看 ${watchCount} 次</span>
            ${watchCount > 1 ? '<span class="badge badge-warning">常看</span>' : ''}
          </div>
        </div>
        <div class="video-actions">
          <button class="delete-btn" data-video-id="${video.videoId}">删除</button>
        </div>
      </div>
    `;
  }).join('');
  
  // Add click events
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('delete-btn')) {
        const videoId = card.dataset.videoId;
        chrome.tabs.create({ url: `https://www.youtube.com/watch?v=${videoId}` });
      }
    });
  });
  
  // Add delete button events
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const videoId = btn.dataset.videoId;
      
      if (confirm('确定要删除这条记录吗?')) {
        const response = await chrome.runtime.sendMessage({
          type: 'DELETE_HISTORY',
          videoId: videoId
        });
        
        if (response.success) {
          loadHistory();
          loadStats();
        }
      }
    });
  });
}

// Load statistics
async function loadStats() {
  try {
    const result = await chrome.storage.local.get(['stats']);
    const stats = result.stats || {};
    
    document.getElementById('totalVideos').textContent = stats.totalVideos || 0;
    document.getElementById('totalWatches').textContent = stats.totalWatches || 0;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Handle search
function handleSearch() {
  const searchText = document.getElementById('searchInput').value.trim();
  
  if (searchText) {
    loadHistory({ search: searchText });
  } else {
    loadHistory();
  }
}

// Handle filter
function handleFilter() {
  const dateFrom = document.getElementById('dateFrom').value;
  const dateTo = document.getElementById('dateTo').value;
  
  const filters = {};
  
  if (dateFrom) {
    filters.dateFrom = new Date(dateFrom).getTime();
  }
  
  if (dateTo) {
    filters.dateTo = new Date(dateTo + ' 23:59:59').getTime();
  }
  
  loadHistory(filters);
}

// Handle reset
function handleReset() {
  document.getElementById('searchInput').value = '';
  document.getElementById('dateFrom').value = '';
  document.getElementById('dateTo').value = '';
  loadHistory();
}

// Handle export
async function handleExport() {
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'EXPORT_HISTORY'
    });
    
    if (response.success) {
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `youtube-history-${formatDateForFilename(new Date())}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      alert('导出成功!');
    } else {
      alert('导出失败: ' + response.error);
    }
  } catch (error) {
    console.error('Failed to export:', error);
    alert('导出失败');
  }
}

// Handle import
async function handleImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  try {
    const text = await file.text();
    
    const response = await chrome.runtime.sendMessage({
      type: 'IMPORT_HISTORY',
      data: text
    });
    
    if (response.success) {
      alert(`导入成功!\n导入了 ${response.imported} 条记录\n当前总共 ${response.total} 条记录`);
      loadHistory();
      loadStats();
    } else {
      alert('导入失败: ' + response.error);
    }
  } catch (error) {
    console.error('Failed to import:', error);
    alert('导入失败: 文件格式不正确');
  }
  
  // Reset file input
  e.target.value = '';
}

// Handle clear
async function handleClear() {
  if (!confirm('确定要清空所有历史记录吗?此操作不可恢复!')) {
    return;
  }
  
  if (!confirm('再次确认:真的要清空所有历史记录吗?')) {
    return;
  }
  
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'CLEAR_ALL_HISTORY'
    });
    
    if (response.success) {
      alert('已清空所有历史记录');
      loadHistory();
      loadStats();
    } else {
      alert('清空失败: ' + response.error);
    }
  } catch (error) {
    console.error('Failed to clear:', error);
    alert('清空失败');
  }
}

// Format date
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) {
    return '刚刚';
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    return Math.floor(diff / 60000) + '分钟前';
  }
  
  // Less than 1 day
  if (diff < 86400000) {
    return Math.floor(diff / 3600000) + '小时前';
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    return Math.floor(diff / 86400000) + '天前';
  }
  
  // Show specific date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  if (year === now.getFullYear()) {
    return `${month}-${day} ${hours}:${minutes}`;
  }
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Format date for filename
function formatDateForFilename(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

// HTML escape
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
