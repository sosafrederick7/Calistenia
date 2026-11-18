import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 text-slate-600 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Dumbbell className="w-8 h-8 text-slate-500 mb-2" strokeWidth={1.75} />
        <span className="text-xs font-medium text-center text-slate-600 max-w-[18ch]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
