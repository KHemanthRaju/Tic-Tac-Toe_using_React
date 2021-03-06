import React,{useState} from "react";
import Board from "./components/Board";
import { calculateWinner } from "./helpers";

import "./styles/root.scss";

const App = () => {

    const[history, setHistory] = useState([{board:Array(9).fill(null),isNext:true},]);
    const [currentMove, setCurrentMove] = useState(0);

    const current = history[currentMove];

    const winner = calculateWinner(current,board);

    const message = winner ? `Winner is ${winner}` : `Next player is ${current.isNext? 'X' : 'O'}`;

    const handleSquareClick = position => {
        if(current.board[position] || winner){
            return;
        }
        setHistory(prev=>{
            const last = prev[prev.length-1];
            const newBoard = last.board.map((square,pos) => {
                if(pos === position){
                    return last.isNext? 'X' : 'O';
                }
                return square;
            });
            return prev.concat({board:newBoard,isNext:!last.isNext});
        });
        setCurrentMove(prev => prev + 1);

    };


    return (
        <div className="app">
        <h1>TIC TAC TOE</h1>
        <h2>{message}</h2>
        <Board board={current.board} handleSquareClick={handleSquareClick}/>
        </div>
    );
}

export default App;