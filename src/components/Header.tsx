import { CalendarDays, Compass, Dumbbell, TrendingUp } from 'lucide-react';
import { AppView } from '../types/calisthenics';

interface HeaderProps {
  activeView: AppView;
  onChangeView: (view: AppView) => void;
  onStartToday: () => void;
  todayButtonLabel: string;
}

const NAV_ITEMS: { id: AppView; label: string; icon: typeof Compass }[] = [
  { id: 'resumen', label: 'Resumen', icon: Compass },
  { id: 'rutinas', label: 'Rutinas', icon: Dumbbell },
  { id: 'horarios', label: 'Horarios', icon: CalendarDays },
  { id: 'progresion', label: 'Progresión', icon: TrendingUp }
];

export function Header({
  activeView,
  onChangeView,
  onStartToday,
  todayButtonLabel
}: HeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => onChangeView('resumen')}
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded"
          >
            Eje Calistenia
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChangeView(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded ${
                    isActive
                      ? 'text-[#1D4ED8]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-[17px] h-[2px] bg-[#1D4ED8]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single primary action button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onStartToday}
              className="px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] active:scale-[0.98] rounded-lg transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D4ED8]"
            >
              {todayButtonLabel}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Thumb Zone) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200"
        aria-label="Navegación móvil"
      >
        <div className="grid grid-cols-4 h-16">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                  isActive ? 'text-[#1D4ED8]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="text-[11px] font-medium mt-1 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
