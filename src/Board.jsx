import React from 'react';
import "./styles/Board.css";
import Tile from './Tile';

export default function MonopolyBoard({ positions }) {
    const cells = [];

    // Helper: get players on a given cell (by row & col)
    function getPlayersOnCell(row, col, span = 1) {
      // For corners, span is 2x2; for edges span 1x1
      return positions.filter(({ position }) => {
        const cell = getCellForPosition(position);
        if (!cell) return false;
        // Check if player's cell overlaps this cell
        const rowsOverlap = (row <= cell.row && cell.row < row + span) || (cell.row <= row && row < cell.row + cell.span);
        const colsOverlap = (col <= cell.col && cell.col < col + span) || (cell.col <= col && col < cell.col + cell.span);
        return rowsOverlap && colsOverlap;
      });
    }

    // Corners
    const cornerPositions = {
      parking: 21,
      gotojail: 31,
      jail: 11,
      go: 1,
    };

    cells.push(
      <div key={`corner-1-1`} className="corner" id="parking" style={{ gridRow: `1 / span 2`, gridColumn: `1 / span 2` }}>
        {getPlayersOnCell(1, 1, 2).map((p, i) => <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />)}
      </div>
    );
    cells.push(
      <div key={`corner-1-12`} className="corner" id="gotojail" style={{ gridRow: `1 / span 2`, gridColumn: `12 / span 2` }}>
        {getPlayersOnCell(1, 12, 2).map((p, i) => <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />)}
      </div>
    );
    cells.push(
      <div key={`corner-12-1`} className="corner" id="jail" style={{ gridRow: `12 / span 2`, gridColumn: `1 / span 2` }}>
        {getPlayersOnCell(12, 1, 2).map((p, i) => <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />)}
      </div>
    );
    cells.push(
      <div key={`corner-12-12`} className="corner" id="go" style={{ gridRow: `12 / span 2`, gridColumn: `12 / span 2` }}>
        {getPlayersOnCell(12, 12, 2).map((p, i) => <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />)}
      </div>
    );

    // Top edge
    for (let col = 3; col <= 11; col++) {
        const playersHere = getPlayersOnCell(1, col);
        cells.push(
          <Tile key={`top-edge-${col}`} type="top" col={col} row={1} players={playersHere} />
        );
    }

    // Bottom edge
    for (let col = 3; col <= 11; col++) {
        const playersHere = getPlayersOnCell(12, col);
        cells.push(
          <Tile key={`bottom-edge-${col}`} type="bottom" col={col} row={12} players={playersHere} />
        );
    }

    // Left edge
    for (let row = 3; row <= 11; row++) {
        const playersHere = getPlayersOnCell(row, 1);
        cells.push(
          <Tile key={`left-edge-${row}`} type="left" col={1} row={row} players={playersHere} />
        );
    }

    // Right edge
    for (let row = 3; row <= 11; row++) {
        const playersHere = getPlayersOnCell(row, 12);
        cells.push(
          <Tile key={`right-edge-${row}`} type="right" col={12} row={row} players={playersHere} />
        );
    }

    // Center block remains the same
    cells.push(
        <div key="center" className="center" style={{ gridRow: `3 / span 9`, gridColumn: `3 / span 9` }} />
    );

    return <div className="board">{cells}</div>;
}


function getCellForPosition(pos) {
  if (pos === 1) return { row: 12, col: 12, span: 2 }; // Go
  if (pos === 11) return { row: 12, col: 1, span: 2 }; // Jail
  if (pos === 21) return { row: 1, col: 1, span: 2 };  // Free Parking
  if (pos === 31) return { row: 1, col: 12, span: 2 }; // Go to Jail

  if (pos > 1 && pos < 11) {
    // Bottom edge (positions 2-10), row 12, columns 11 to 3 (right to left)
    return { row: 12, col: 12 - (pos - 1), span: 1 };
  }
  if (pos > 11 && pos < 21) {
    // Left edge (positions 12-20), col 1, rows 11 down to 3 (bottom to top)
    return { row: 23 - pos, col: 1, span: 1 };
  }
  if (pos > 21 && pos < 31) {
    // Top edge (positions 22-30), row 1, columns 3 to 11 (left to right)
    return { row: 1, col: pos - 19, span: 1 };
  }
  if (pos > 31 && pos < 41) {
    // Right edge (positions 32-40), col 12, rows 3 to 11 (top to bottom)
    return { row: pos - 28, col: 12, span: 1 };
  }
  return null;
}


