export default function Tile({ type, col, row, players = [] }) {
    const isHorizontal = type === "top" || type === "bottom";

    return (
        isHorizontal ? (
            <div key={`${type}-edge-${col}`} id={`${type}-${col-2}`} className={`edge-horizontal ${type}`} style={{ gridRow: `${row} / span 2`, gridColumn: col }}>
                <div className="top"></div>
                <div className="bottom">
                    {players.map((p, i) => (
                        <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />
                    ))}
                </div>
            </div>
        ) : (
            <div key={`${type}-edge-${col}`} id={`${type}-${row-2}`} className={`edge-vertical ${type}`} style={{ gridRow: row, gridColumn: `${col} / span 2` }}>
                <div className="top"></div>
                <div className="bottom">
                    {players.map((p, i) => (
                        <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />
                    ))}
                </div>
            </div>
        )
    );
}
