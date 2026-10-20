import React from 'react';

interface ZestLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTaglines?: boolean;
  theme?: 'light' | 'dark';
}

export const ZestLogo: React.FC<ZestLogoProps> = ({
  className = '',
  size = 'md',
  showTaglines = true,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const taglineSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-xs',
    xl: 'text-xs sm:text-sm',
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Typography & Brand Names - Pure text without any logo mark */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} ${
              isDark ? 'text-white' : 'text-[#243315]'
            }`}
          >
            ZEST
          </span>
          <span
            className={`font-black tracking-wider uppercase ${subSizes[size]} text-[#4D6429]`}
          >
            ENTERPRISES
          </span>
        </div>

        {showTaglines && (
          <div className="mt-0.5 space-y-0.5">
            <p
              className={`font-semibold tracking-wide ${taglineSizes[size]} ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              } leading-tight`}
            >
              For All Your Supply Needs
            </p>
            <p
              className={`font-medium italic ${taglineSizes[size]} ${
                isDark ? 'text-[#A3BE7A]' : 'text-[#4D6429]'
              } leading-tight`}
            >
              You name it, We have it
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
