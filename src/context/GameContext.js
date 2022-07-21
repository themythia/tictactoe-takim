import { createContext, useState } from 'react';
import createInitialState from '../utils/createInitialState';

export const GameContext = createContext();

const GameWrapper = ({ children }) => {
  // buton state
  const [buttons, setButtons] = useState({});
  // buton kontrolu state
  const [buttonState, setButtonState] = useState({});

  // game over
  const [gameOver, setGameOver] = useState(false);
  // son hamle
  const [lastMove, setLastMove] = useState({ row: null, col: null });
  // kimin sirasi?
  const [turn, setTurn] = useState('player');

  // const value = {
  //   buttons: [buttons, setButtons],
  //   buttonState: [buttonState, setButtonState],
  //   gameOver: [gameOver, setGameOver],
  //   lastMove: [lastMove, setLastMove],
  //   turn: [turn, setTurn],
  // };

  return (
    <GameContext.Provider value={{ buttons, setButtons }}>
      {children}
    </GameContext.Provider>
  );
};
export default GameWrapper;
