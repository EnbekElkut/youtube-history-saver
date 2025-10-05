#!/usr/bin/env python3
"""
YouTube官方历史记录转换脚本
将Google Takeout导出的YouTube历史记录转换为本插件可用的格式
"""

import json
import sys
import re
from datetime import datetime
from pathlib import Path

def extract_video_id(url):
    """从YouTube URL提取视频ID"""
    patterns = [
        r'watch\?v=([a-zA-Z0-9_-]{11})',
        r'youtu\.be/([a-zA-Z0-9_-]{11})',
        r'/embed/([a-zA-Z0-9_-]{11})',
        r'/v/([a-zA-Z0-9_-]{11})'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def parse_youtube_takeout(input_file):
    """解析YouTube Takeout历史记录"""
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        converted = {}
        
        for item in data:
            # 提取视频URL
            if 'titleUrl' not in item:
                continue
            
            url = item['titleUrl']
            video_id = extract_video_id(url)
            
            if not video_id:
                continue
            
            # 提取标题
            title = item.get('title', '未知标题')
            if title.startswith('Watched '):
                title = title[8:]  # 移除"Watched "前缀
            
            # 提取频道信息
            channel = item.get('subtitles', [{}])[0].get('name', '未知频道') if item.get('subtitles') else '未知频道'
            channel_url = item.get('subtitles', [{}])[0].get('url', '') if item.get('subtitles') else ''
            
            # 提取时间
            time_str = item.get('time', '')
            timestamp = int(datetime.fromisoformat(time_str.replace('Z', '+00:00')).timestamp() * 1000) if time_str else 0
            
            # 生成视频信息
            video_info = {
                'videoId': video_id,
                'title': title,
                'channel': channel,
                'channelUrl': channel_url if channel_url.startswith('http') else f'https://www.youtube.com{channel_url}',
                'thumbnail': f'https://i.ytimg.com/vi/{video_id}/hqdefault.jpg',
                'videoUrl': f'https://www.youtube.com/watch?v={video_id}',
                'duration': '',
                'firstWatched': timestamp,
                'lastWatched': timestamp,
                'watchCount': 1,
                'watchHistory': [timestamp]
            }
            
            # 如果视频已存在,更新观看记录
            if video_id in converted:
                converted[video_id]['watchCount'] += 1
                converted[video_id]['watchHistory'].append(timestamp)
                converted[video_id]['lastWatched'] = max(converted[video_id]['lastWatched'], timestamp)
                converted[video_id]['firstWatched'] = min(converted[video_id]['firstWatched'], timestamp)
            else:
                converted[video_id] = video_info
        
        return converted
    
    except Exception as e:
        print(f'错误: {e}')
        return None

def main():
    if len(sys.argv) < 2:
        print('使用方法: python3 convert-youtube-history.py <输入文件.json> [输出文件.json]')
        print('')
        print('说明:')
        print('  1. 从 Google Takeout 下载YouTube历史记录')
        print('  2. 解压后找到 watch-history.json 文件')
        print('  3. 运行本脚本转换格式')
        print('  4. 在插件中导入转换后的文件')
        print('')
        print('示例:')
        print('  python3 convert-youtube-history.py watch-history.json converted-history.json')
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'converted-history.json'
    
    if not Path(input_file).exists():
        print(f'错误: 文件不存在: {input_file}')
        sys.exit(1)
    
    print(f'正在转换 {input_file}...')
    
    converted = parse_youtube_takeout(input_file)
    
    if converted is None:
        print('转换失败')
        sys.exit(1)
    
    # 保存转换后的数据
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(converted, f, ensure_ascii=False, indent=2)
    
    print(f'转换成功!')
    print(f'总共转换了 {len(converted)} 个视频')
    print(f'输出文件: {output_file}')
    print('')
    print('现在可以在插件中点击"导入"按钮导入此文件')

if __name__ == '__main__':
    main()
