export default function Tile({ type, col, row, players = [] }) {
    const isHorizontal = type === "top" || type === "bottom";

    let style, classes, id;
    if (isHorizontal) {
        style = { gridRow: `${row} / span 2`, gridColumn: col };
        classes = `edge-horizontal ${type}`;
        id = `${type}-${col - 2}`;
    } else {
        style = { gridRow: row, gridColumn: `${col} / span 2` };
        classes = `edge-vertical ${type}`;
        id = `${type}-${row - 2}`;
    }

    const playerImgs = players.map((p, i) => (
        <img key={i} src={`./${p.img}.png`} alt={`player-${p.position}`} className="player-img" />
    ));

    return (
        <div key={`${type}-edge-${col}`} id={id} className={classes} style={style}>
            <div className="top"></div>
            <div className="bottom">
                {playerImgs}
            </div>
        </div>
    );
}