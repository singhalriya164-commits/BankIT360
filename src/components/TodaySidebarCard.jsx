import React, { memo } from 'react';

export function SparkleIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" />
    </svg>
  );
}

export function BookOpenIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function CompassIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function StarFilledIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={color} 
      stroke={color} 
      strokeWidth="1"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function SidebarToggleIcon({ className = "w-5 h-5", color = "#00f5ff" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <line x1="8" y1="3" x2="8" y2="17" stroke={color} strokeWidth="1.8" />
      <rect x="3" y="4" width="4.2" height="12" fill={color} />
    </svg>
  );
}

export default function TodaySidebarCard({
  activeId = 'home',
  onSelect = () => {},
  onToggleCollapse = () => {},
  isCollapsed = false,
  theme = 'dark', // 'dark' | 'light'
  className = ""
}) {
  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: SparkleIcon
    },
    {
      id: 'my-learning',
      label: 'Runbooks & SOPs',
      icon: BookOpenIcon
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: CompassIcon
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: StarFilledIcon
    }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`
      rounded-3xl border transition-all duration-300 overflow-hidden font-sans select-none
      ${isCollapsed ? 'w-18 p-2' : 'w-full max-w-[280px] pt-4 pb-3'}
      ${isDark 
        ? 'bg-[#0c0e17]/95 border-white/12 backdrop-blur-2xl text-white shadow-2xl' 
        : 'bg-white border-slate-200/90 text-[#032d60] shadow-md shadow-slate-900/5'
      }
      ${className}
    `}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 pb-2 border-b border-transparent ${isCollapsed ? 'justify-center px-1' : ''}`}>
        {!isCollapsed && (
          <h2 className={`text-[20px] font-display font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-[#032d60]'}`}>
            Today
          </h2>
        )}
        <button 
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar panel"
          title="Toggle Panel"
          className={`p-1 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
            isDark ? 'hover:bg-white/10 text-cyan-400' : 'hover:bg-slate-100 text-[#032d60]'
          }`}
        >
          <SidebarToggleIcon className="w-5 h-5" color={isDark ? "#00f5ff" : "#032d60"} />
        </button>
      </div>

      {/* Navigation List */}
      <nav aria-label="Today Navigation" className="flex flex-col py-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          let itemClasses = '';
          let iconColor = '';
          let labelClasses = '';

          if (isDark) {
            if (isActive) {
              itemClasses = 'bg-gradient-to-r from-cyan-500/20 via-[#0176d3]/20 to-transparent text-white border-y border-cyan-400/20';
              iconColor = '#00f5ff';
              labelClasses = 'font-black text-white';
            } else {
              itemClasses = 'text-white/70 hover:text-white hover:bg-white/5';
              iconColor = 'rgba(255,255,255,0.65)';
              labelClasses = 'font-semibold text-white/80 group-hover:text-white';
            }
          } else {
            if (isActive) {
              itemClasses = 'bg-[#eff6ff] text-[#0176d3]';
              iconColor = '#0176d3';
              labelClasses = 'font-bold text-[#0176d3]';
            } else {
              itemClasses = 'text-[#032d60] hover:bg-slate-50';
              iconColor = '#032d60';
              labelClasses = 'font-semibold text-[#032d60] group-hover:text-[#0176d3]';
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`
                relative flex items-center w-full px-4 py-2.5 transition-all duration-150 group cursor-pointer text-left
                ${isCollapsed ? 'justify-center px-0 py-2.5' : 'gap-3.5'}
                ${itemClasses}
              `}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] rounded-r-xs ${
                  isDark ? 'bg-[#00f5ff] shadow-[0_0_12px_#00f5ff]' : 'bg-[#0176d3]'
                }`} />
              )}

              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center">
                <Icon 
                  className={`w-6 h-6 transition-transform duration-150 group-hover:scale-110 ${
                    isActive && isDark ? 'drop-shadow-[0_0_8px_rgba(0,245,255,0.7)]' : ''
                  }`}
                  color={iconColor}
                />
              </div>

              {/* Label */}
              {!isCollapsed && (
                <span className={`text-[14.5px] tracking-tight transition-colors ${labelClasses}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
