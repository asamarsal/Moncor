import React from 'react';

const priceText = (n: number) => n.toFixed(5);

export function FixedBoard({ price, locked, select }: { price: number; locked: boolean; select: (x: string) => void }) {
  return (
    <div className="fixed-board">
      <div className="board-title">
        <span>RACE BOARD</span>
        <span>ROUND ENDS IN <b>{locked ? '00:28' : '00:42'}</b></span>
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        const p = price + (i - 5) * .00025;
        return (
          <button disabled={locked} onClick={() => select(`Target ${priceText(p)}`)} className={`race-row ${i === 5 ? 'active' : ''}`} key={i}>
            <b>{p.toFixed(3)}</b>
            <span className="race-track">
              <i style={{ width: `${39 + ((i * 13) % 34)}%` }} /><em />
            </span>
            <small>{i === 5 ? '›' : ''}</small>
          </button>
        )
      })}
      <div className="legend">
        <span><i /> You</span><span><i /> Other Players</span><span>▧ Finish Line</span>
      </div>
    </div>
  )
}
