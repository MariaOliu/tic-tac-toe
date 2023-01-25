import { WINNER_COMOS } from "../constants";


 export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O gano
    for (const combo of WINNER_COMOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //si no hay ganador devuelve null
    return null;
  };

 export const checkEndGame = (newBoard) => { 
    //revisamos si hay empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square !== null);
  };
