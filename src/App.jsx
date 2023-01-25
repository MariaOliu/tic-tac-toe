import { useState } from "react";

const TURN = {
  X: "X",
  O: "0",
};

const Square = ({ children, index, isSelected, updateBoard }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};






const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);

  const updateBoard = (index) => {
    // si ya tiene algo no se actualiza esta posicion
    if (board[index]) return;
    // actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiamos el turno del jugador
    const changeTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(changeTurn);
  };

  return (
    <main className="board">
      <h1>Tic tac toc</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>
    </main>
  );
};

export default App;
