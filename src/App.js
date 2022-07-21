import './App.css';
import GameWrapper, { GameContext, ThemeContext } from './context/GameContext';
import { useContext, useEffect, useState } from 'react';
import ThemeWrapper from './context/GameContext';
import createInitialState from './utils/createInitialState';
import Container from './components/Container';
import Buttons from './components/Buttons';
import findRandomEmptyButton from './utils/findRandomEmptyButton';

function App() {
  // buton state
  const [buttons, setButtons] = useState(createInitialState().buttons);
  // buton kontrolu state
  const [buttonState, setButtonState] = useState(
    createInitialState().buttonState
  );

  console.log('buttons', buttons);

  // game over
  const [gameOver, setGameOver] = useState(false);
  // son hamle
  const [lastMove, setLastMove] = useState({ row: null, col: null });
  // kimin sirasi?
  const [turn, setTurn] = useState('player');

  useEffect(() => {
    if (turn === 'cpu') {
      const { row, col, gameOver: go } = findRandomEmptyButton(buttons);
      setGameOver(go);
      setLastMove({ row, col });
      setButtons({
        ...buttons,
        [row]: buttons[row].map((button, index) =>
          col === index ? 'O' : button
        ),
      });
      setTurn('player');
    }
  }, [turn]);

  return (
    <Container>
      <Buttons
        buttons={buttons}
        setButtons={setButtons}
        turn={turn}
        setTurn={setTurn}
        lastMove={lastMove}
        setLastMove={setLastMove}
      />
    </Container>
  );
}

export default App;
