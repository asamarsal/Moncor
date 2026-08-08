import React from 'react';

const priceText = (n: number) => n.toFixed(5);

export function Matrix({ locked, select, selection, activeColumn, price }: { locked: boolean; select: (x: string) => void; selection: string; activeColumn: number; price: number }) {
  const values = ['1.1x', '1.2x', '1.3x', '1.4x', '1.6x', '1.8x', '2.8x', '3.6x', '5.6x', '8.0x']
  const times = ['0s', '+2s', '+4s', '+6s', '+8s', '+12s', '+14s', '+18s', '+22s', '+26s', '+30s']
  
  return (
    <div className="matrix">
      <div className="matrix-cursor" style={{ left: `${((activeColumn + 1) / 11) * 100}%` }} aria-hidden="true" />
      <div className="price-marker" style={{ top: `${58 + activeColumn * 3}%` }}>
        <span>{priceText(price)}</span><small>LIVE</small>
      </div>
      <div className="matrix-row matrix-head">
        {times.map((x, i) => <span className={i === activeColumn + 1 ? 'time-active' : ''} key={x}>{x}</span>)}
      </div>
      {Array.from({ length: 9 }, (_, row) => (
        <div className="matrix-row" key={row}>
          <b>{values[row]}</b>
          {Array.from({ length: 10 }, (_, col) => {
            const v = values[(row + col + 2) % values.length];
            const selectionId = `${row}:${col}:${v}`;
            const isRunning = col === activeColumn;
            const isSelected = selection === selectionId;
            return (
              <button
                type="button"
                disabled={locked}
                className={`odds tone-${(row + col) % 5} ${isRunning ? 'odds-running' : ''} ${isSelected ? 'odds-selected' : ''}`}
                data-running={isRunning}
                data-selected={isSelected}
                aria-pressed={isSelected}
                aria-label={`Select multiplier ${v}, row ${row + 1}, time ${times[col + 1]}`}
                onClick={() => select(selectionId)}
                key={col}
              >
                {v}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
