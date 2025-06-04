import { useEffect, useState } from 'react'

import './App.css'
import "./styles/players.css"
import "./styles/home.css"
import generatePlayers from './cyphers/player.cypher.js'
import getDenominationQuantity from './cyphers/bank.cypher.js'
import MonopolyBoard from './Board.jsx'
function App() {

    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState([{}]);
    const [billsbank, setBillsbank] = useState([1, 5, 10, 20, 50, 100, 500, 1000, 2000]);
    const money_bills_value = [1, 5, 10, 20, 50, 100, 500, 1000, 2000];

    useEffect(() => {
        const result = generatePlayers("TREASURE");
        const bills = getDenominationQuantity("WELLDONE!");
        const newPositions = result.map(player => ({
            position: player.position,
            img: player.img,
        }));
        setPositions(newPositions);
        setBillsbank(bills);

        setPlayers(result);
    }, []);


    return (
        <>
            <main>
                <div className='tabletop'>
                    <div className='table'>
                        <MonopolyBoard positions={positions} />
                    </div>
                    <div className='bank'>
                        {
                            billsbank.map((value, index) => (
                                <div className='money-bill' key={index}>
                                    <img src={`./${money_bills_value[index]}_bill.png`} alt={`${money_bills_value[index]} bill`} />
                                    <span className='bill-number'>{value}</span>
                                </div>
                            ))
                        }

                    </div>

                    <input></input>
                </div>

                <div className='players-container'>
                    {players && players.map((player, index) => (
                        <div className='player' key={index}>
                            <div className='player-img'>
                                <img src={`./${player.img}.png`} alt={player.name} />
                                <h2>{player.name}</h2>
                            </div>
                            <p>Money: ${player.money}</p>
                            <div className='visual-money'>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default App
