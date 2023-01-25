import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square";
import { TURN } from "./constants";
import { checkEndGame, checkWinner } from "./logic/board";
import WinnerModal from "./components/WinnerModal";

const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURN.X;
  });
  const [winner, setWinner] = useState(null);
  // null es que no hay ganador, false es que hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  };

  const updateBoard = (index) => {
    // si ya tiene algo no se actualiza esta posicion
    if (board[index] || winner) return;

    // actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiamos el turno del jugador
    const changeTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(changeTurn);
    //guardar partida en localstorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", changeTurn);

    // revisar si hay winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }

    // revisar si hay empate
  };

  return (
    <main className="board">
      <h1>Tic tac toc</h1>
      <button onClick={resetGame}>Resetear el juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
};

export default App;
