import React from 'react';

export function FixedBoard({ price, locked, select, selection }: { price: number; locked: boolean; select: (x: string) => void; selection?: string }) {
  const precision = price >= 100 ? 2 : 5;
  const step = price >= 100 ? 2.5 : 0.00025;

  return (
    <div className="fixed-board">
      <div className="board-title">
        <span>RACE BOARD</span>
        <span>ROUND ENDS IN <b>{locked ? '00:28' : '00:42'}</b></span>
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        const p = price + (4 - i) * step;
        const targetStr = `Target $${p.toFixed(precision)}`;
        const isActive = selection === targetStr;
        return (
          <button disabled={locked} onClick={() => select(targetStr)} className={`race-row ${isActive ? 'active' : ''}`} key={i} aria-label={`Select realtime price target ${p.toFixed(precision)} dollars`}>
            <b>${p.toFixed(precision)}</b>
            <span className="race-track">
              <i style={{ width: `${39 + ((i * 13) % 34)}%` }} /><em />
            </span>
            <small>{isActive ? '›' : ''}</small>
          </button>
        )
      })}
      <div className="legend">
        <span><i /> You</span><span><i /> Other Players</span><span>▧ Finish Line</span>
      </div>
    </div>
  )
}
