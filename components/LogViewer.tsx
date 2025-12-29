
import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Scroll } from 'lucide-react';

interface LogViewerProps {
  onShowChronicle: () => void;
}

export const LogViewer: React.FC<LogViewerProps> = ({ onShowChronicle }) => {
  const { history } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  return (
    <div className="h-full flex flex-col relative px-3 py-2">
      <div className="flex justify-between items-center mb-2 shrink-0">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Fate Log</h3>
          <button
            onClick={onShowChronicle}
            className="text-[10px] flex items-center gap-1 text-osrs-gold hover:text-white bg-osrs-gold/10 px-2 py-1 rounded border border-osrs-gold/20 transition-colors"
            title="View Chronicle Summary"
          >
            <Scroll size={12} /> The Chronicle
          </button>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 font-mono text-sm custom-scrollbar"
      >
        {history.length === 0 && (
          <div className="text-gray-600 italic text-center mt-10">The fate of your account is yet to be written...</div>
        )}
        {history.map((entry) => (
          <div key={entry.id} className="border-l-2 pl-2 py-1 border-gray-700 hover:bg-white/5 transition-colors rounded-r">
            <div className="flex justify-between text-xs text-gray-500 mb-0.5">
              <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
              {entry.type === 'ROLL' && (
                <span className={entry.result === 'SUCCESS' ? 'text-osrs-success' : 'text-osrs-fail'}>
                  {entry.result}
                </span>
              )}
            </div>
            <div className="text-gray-300">
              {entry.message}
            </div>
            {entry.details && (
              <div className="text-xs text-gray-500 mt-0.5">
                {entry.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
