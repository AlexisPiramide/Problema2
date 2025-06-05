import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { secretsUnder8, secretsUnder9 } from './cyphers/secret.vault.js';
import "./styles/Other.css"
import "./styles/home.css"
import generatePlayers from './cyphers/player.cypher.js'
import getDenominationQuantity from './cyphers/bank.cypher.js'
import MonopolyBoard from './Board.jsx'
function App() {
    const [currentSecret1, setCurrentSecret1] = useState("");
    const [currentSecret2, setCurrentSecret2] = useState("");

    const [players, setPlayers] = useState([]);
    const [positions, setPositions] = useState([{}]);
    const [billsbank, setBillsbank] = useState([1, 5, 10, 20, 50, 100, 500, 1000, 2000]);
    const money_bills_value = [1, 5, 10, 20, 50, 100, 500, 1000, 2000];

    const [secret1, setSecret1] = useState("");
    const [secret2, setSecret2] = useState("");

    const solveCypher = () => {
        if (secret1 === "" || secret2 === "") {

            if( secret1 === currentSecret1 || secret1 === currentSecret2 || secret2 === currentSecret1 || secret2 === currentSecret2) {
                  mostrarResultado("You got one cypher right, keep the good work with the next one.", false);
            }
            return
        }
        const input1 = secret1.trim().toLowerCase();
        const input2 = secret2.trim().toLowerCase();
        const secretA = currentSecret1.trim().toLowerCase();
        const secretB = currentSecret2.trim().toLowerCase();

        if ((input1 === secretA && input2 === secretB) || (input1 === secretB && input2 === secretA)) {
            mostrarResultado("Congratulations! You solved the cypher!", true);
        } 
        else if ((input1 === secretA && input2 !== secretB) || (input1 !== secretA && input2 === secretB)) {
            mostrarResultado("You got one cypher right, but the other is incorrect.", false);
        }
        
        
        else {
            mostrarError("Incorrect cyphers.");
        }


    }

    useEffect(() => {
        const randomIndex1 = Math.floor(Math.random() * secretsUnder8.length);
        const randomIndex2 = Math.floor(Math.random() * secretsUnder9.length);
        setCurrentSecret1(secretsUnder8[randomIndex1]);
        setCurrentSecret2(secretsUnder9[randomIndex2]);

        const result = generatePlayers(secretsUnder8[randomIndex1]);
        const bills = getDenominationQuantity(secretsUnder9[randomIndex2]);
        const newPositions = result.map(player => ({
            position: player.position,
            img: player.img,
        }));
        setPositions(newPositions);
        setBillsbank(bills);
        setPlayers(result);

    }, []);


    const mostrarError = (mensaje) => {
        toast.error(mensaje, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: mensaje,
        })
    }

    const mostrarResultado = (mensaje, estado) => {
        const tipoToast = estado ? toast.success : toast.warning;
        tipoToast(mensaje, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: mensaje,
        })
    }


    return (
        <>
            <main>
                <div className='tabletop'>
                    <div className='table'>
                        <MonopolyBoard positions={positions} />
                    </div>
                </div>
                <aside>
                    <div className='players-container'>
                        {players && players.map((player, index) => (
                            <div className='player' key={index}>
                                <div className='player-img'>
                                    <img src={`./${player.img}.png`} alt={player.name} />
                                    {player.name}
                                </div>
                                <p>Money: ${player.money}</p>
                            </div>
                        ))}
                    </div>

                    <div className='bank'>
                        {
                            billsbank.map((value, index) => (
                                <div className='money-bill' key={index}>
                                    <img src={`./bills /${money_bills_value[index]}.png`} alt={`${money_bills_value[index]} bill`} />
                                    <span className='bill-number'>{value}</span>
                                </div>
                            ))
                        }

                    </div>
                    <div className='input-container'>
                        <label htmlFor="secret-1">Secret 1:</label>
                        <input type="text" id="secret-1" onChange={(e) => setSecret1(e.target.value)} placeholder="First Cypher" />
                        <label htmlFor="secret-2">Secret 2:</label>
                        <input type="text" id="secret-2" onChange={(e) => setSecret2(e.target.value)} placeholder="Second Cypher" />

                        <button onClick={solveCypher}>Check</button>
                        *Not Case Sensitive
                    </div>
                </aside>
            </main>
            <ToastContainer />
        </>
    )
}

export default App
