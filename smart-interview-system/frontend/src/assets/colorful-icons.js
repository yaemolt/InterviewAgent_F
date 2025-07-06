// 彩色SVG图标集合
export const colorfulIcons = {
  // 大脑图标 - 紫色渐变
  brain: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#A855F7;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path d="M12 3C8.5 3 6 5.5 6 9C6 11 7 12.5 8.5 13.5C9 14 9.5 14.5 9.5 15.5C9.5 16.5 10.5 17.5 11.5 17.5H12.5C13.5 17.5 14.5 16.5 14.5 15.5C14.5 14.5 15 14 15.5 13.5C17 12.5 18 11 18 9C18 5.5 15.5 3 12 3Z" 
          fill="url(#brainGrad)" stroke="#A855F7" stroke-width="1.5"/>
  </svg>`,

  // 主页图标 - 橙色渐变
  home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#F97316;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path d="M3 12L5 10V20H19V10L21 12V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V12Z" fill="url(#homeGrad)"/>
    <path d="M12 2L22 12H20L12 4L4 12H2L12 2Z" fill="url(#homeGrad)"/>
    <circle cx="16" cy="16" r="2" fill="#FED7AA" opacity="0.8"/>
  </svg>`,

  // 进度图标 - 绿色渐变
  progress: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#progressGrad)" opacity="0.2"/>
    <rect x="6" y="6" width="12" height="2" rx="1" fill="url(#progressGrad)"/>
    <rect x="6" y="10" width="8" height="2" rx="1" fill="url(#progressGrad)" opacity="0.7"/>
    <rect x="6" y="14" width="10" height="2" rx="1" fill="url(#progressGrad)" opacity="0.5"/>
    <circle cx="18" cy="8" r="3" fill="#34D399" opacity="0.8"/>
    <path d="M16.5 8L17.5 9L19.5 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // 消息图标 - 蓝色渐变
  message: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="messageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="url(#messageGrad)" opacity="0.2"/>
    <circle cx="12" cy="12" r="8" fill="url(#messageGrad)"/>
    <circle cx="8" cy="12" r="1" fill="white"/>
    <circle cx="12" cy="12" r="1" fill="white"/>
    <circle cx="16" cy="12" r="1" fill="white"/>
    <path d="M7 16C8.5 17.5 10.5 18 12 18C13.5 18 15.5 17.5 17 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // 课程图标 - 紫红渐变
  courses: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coursesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#BE185D;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="16" rx="2" fill="url(#coursesGrad)" opacity="0.2"/>
    <rect x="5" y="6" width="14" height="12" rx="1" fill="url(#coursesGrad)"/>
    <rect x="7" y="8" width="10" height="1" fill="white" opacity="0.8"/>
    <rect x="7" y="10" width="8" height="1" fill="white" opacity="0.6"/>
    <rect x="7" y="12" width="6" height="1" fill="white" opacity="0.4"/>
    <circle cx="19" cy="8" r="2" fill="#F472B6"/>
    <path d="M18 8L18.5 8.5L20 7" stroke="white" stroke-width="1" stroke-linecap="round"/>
  </svg>`,

  // 退出图标 - 红色渐变
  logout: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#EF4444;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="url(#logoutGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 17L21 12L16 7" stroke="url(#logoutGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 12H9" stroke="url(#logoutGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="7" cy="12" r="1" fill="#FCA5A5"/>
  </svg>`,

  // 下载图标 - 青色渐变
  download: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="downloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect x="6" y="2" width="12" height="16" rx="2" fill="url(#downloadGrad)" opacity="0.2"/>
    <rect x="7" y="3" width="10" height="14" rx="1" fill="url(#downloadGrad)"/>
    <rect x="8" y="5" width="8" height="1" fill="white" opacity="0.8"/>
    <rect x="8" y="7" width="6" height="1" fill="white" opacity="0.6"/>
    <rect x="8" y="9" width="4" height="1" fill="white" opacity="0.4"/>
    <path d="M12 15L9 12H11V18H13V12H15L12 15Z" fill="#67E8F9"/>
    <circle cx="18" cy="6" r="2" fill="#22D3EE"/>
    <path d="M17 6L17.5 6.5L19 5" stroke="white" stroke-width="1" stroke-linecap="round"/>
  </svg>`
}; 