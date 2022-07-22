import './App.css';
import GameWrapper, { GameContext, ThemeContext } from './context/GameContext';
import { useContext, useEffect } from 'react';
import Container from './components/Container';
import Buttons from './components/Buttons';
import findRandomEmptyButton from './utils/findRandomEmptyButton';

function App() {
  const {
    buttons,
    setButtons,
    buttonState,
    setButtonState,
    gameOver,
    setGameOver,
    lastMove,
    setLastMove,
    turn,
    setTurn,
  } = useContext(GameContext);

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

  // console.log('lastMove', lastMove);
  // console.log('buttonsState', buttonState);

  useEffect(() => {
    const handleHorizontal = (row, first, second, third) => {
      setButtonState({
        ...buttonState,
        [row]: buttonState[row].map((obj, index) => {
          if (index === first || index === second || index === third) {
            return {
              ...obj,
              h: true,
            };
          } else return obj;
        }),
      });
    };

    const handleVertical = (col, first, second, third) => {
      setButtonState({
        ...buttonState,
        [first]: buttonState[first].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
        [second]: buttonState[second].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
        [third]: buttonState[third].map((obj, index) =>
          index === col ? { ...obj, v: true } : obj
        ),
      });
    };

    const handleDiagonal = (first, second, third, type) => {
      setButtonState({
        ...buttonState,
        [first.row]: buttonState[first.row].map((obj, index) =>
          index === first.col ? { ...obj, [type]: true } : obj
        ),
        [second.row]: buttonState[second.row].map((obj, index) =>
          index === second.col ? { ...obj, [type]: true } : obj
        ),
        [third.row]: buttonState[third.row].map((obj, index) =>
          index === third.col ? { ...obj, [type]: true } : obj
        ),
      });
    };
    const { row, col } = lastMove;

    if (row !== null && col !== null) {
      console.log('row:', row);
      console.log('col', col);

      // yatay
      // en son tiklanan en sol tus
      if (
        col >= 0 &&
        col <= 9 &&
        buttons[row][col] &&
        buttons[row][col] === buttons[row][col + 1] &&
        buttons[row][col] === buttons[row][col + 2] &&
        !buttonState[row][col].h &&
        !buttonState[row][col + 1].h &&
        !buttonState[row][col + 2].h
      ) {
        handleHorizontal(row, col, col + 1, col + 2);
      }
      // en son tiklanan ortada
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 1 &&
        row <= 20 &&
        buttons[row][col] === buttons[row][col + 1] &&
        buttons[row][col] === buttons[row][col - 1] &&
        buttons[row][col] &&
        !buttonState[row][col].h &&
        !buttonState[row][col + 1].h &&
        !buttonState[row][col - 1].h
      ) {
        handleHorizontal(row, col, col - 1, col + 1);
      }
      // en son tiklanan en sagda
      else if (
        col >= 2 &&
        col <= 10 &&
        row >= 1 &&
        row <= 20 &&
        buttons[row][col] === buttons[row][col - 1] &&
        buttons[row][col] === buttons[row][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].h &&
        !buttonState[row][col - 1].h &&
        !buttonState[row][col - 2].h
      ) {
        handleHorizontal(row, col, col - 1, col - 2);
      }
      // dikey
      // en son tiklanan en ust tus
      if (
        row >= 1 &&
        row <= 18 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row + 1][col] &&
        buttons[row][col] === buttons[row + 2][col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row + 1][col].v &&
        !buttonState[row + 2][col].v
      ) {
        handleVertical(col, row, row + 1, row + 2);
      }
      // en son tiklnan orta tus
      else if (
        row >= 2 &&
        row <= 19 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row + 1][col] &&
        buttons[row][col] === buttons?.[row - 1]?.[col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row + 1][col].v &&
        !buttonState?.[row - 1]?.[col]?.v
      ) {
        handleVertical(col, row, row - 1, row + 1);
      }
      // en son tiklanan en alt tus
      else if (
        row >= 3 &&
        row <= 20 &&
        col >= 0 &&
        col <= 10 &&
        buttons[row][col] === buttons[row - 1][col] &&
        buttons[row][col] === buttons[row - 2][col] &&
        buttons[row][col] &&
        !buttonState[row][col].v &&
        !buttonState[row - 1][col].v &&
        !buttonState[row - 2][col].v
      ) {
        handleVertical(col, row, row - 1, row - 2);
      }
      // capraz 1 (sol ustten sag alta)
      // son tiklanan sol ust tus
      if (
        col >= 0 &&
        col <= 8 &&
        row <= 18 &&
        row >= 1 &&
        buttons[row][col] === buttons[row + 1][col + 1] &&
        buttons[row][col] === buttons[row + 2][col + 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row + 1][col + 1].d1 &&
        !buttonState[row + 2][col + 2].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row + 1, col: col + 1 },
          { row: row + 2, col: col + 2 },
          'd1'
        );
      }
      // son tiklnan orta tus
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 2 &&
        row <= 19 &&
        buttons[row][col] === buttons[row - 1][col - 1] &&
        buttons[row][col] === buttons[row + 1][col + 1] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row - 1][col - 1].d1 &&
        !buttonState[row + 1][col + 1].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col - 1 },
          { row: row + 1, col: col + 1 },
          'd1'
        );
      }
      // son tiklanan sag alt tus
      else if (
        col >= 2 &&
        col <= 10 &&
        row >= 3 &&
        row <= 20 &&
        buttons[row][col] === buttons[row - 1][col - 1] &&
        buttons[row][col] === buttons[row - 2][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d1 &&
        !buttonState[row - 1][col - 1].d1 &&
        !buttonState[row - 2][col - 2].d1
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col - 1 },
          { row: row - 2, col: col - 2 },
          'd1'
        );
      }

      // capraz 2 (sag ustten sol alta)
      // en son tiklanan sag ust
      if (
        col >= 2 &&
        col <= 10 &&
        row <= 18 &&
        row >= 0 &&
        buttons[row][col] === buttons[row + 1][col - 1] &&
        buttons[row][col] === buttons[row + 2][col - 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row + 1][col - 1].d2 &&
        !buttonState[row + 2][col - 2].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row + 1, col: col - 1 },
          { row: row + 2, col: col - 2 },
          'd2'
        );
      }
      // en son tiklanan orta
      else if (
        col >= 1 &&
        col <= 9 &&
        row >= 2 &&
        row <= 19 &&
        buttons[row][col] === buttons[row - 1][col + 1] &&
        buttons[row][col] === buttons[row + 1][col - 1] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row - 1][col + 1].d2 &&
        !buttonState[row + 1][col - 1].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row + 1, col: col - 1 },
          'd2'
        );
      }
      // en son tiklanan sol alt
      else if (
        col >= 0 &&
        col <= 8 &&
        row >= 3 &&
        row <= 20 &&
        buttons[row][col] === buttons[row - 1][col + 1] &&
        buttons[row][col] === buttons[row - 2][col + 2] &&
        buttons[row][col] &&
        !buttonState[row][col].d2 &&
        !buttonState[row - 1][col + 1].d2 &&
        !buttonState[row - 2][col + 2].d2
      ) {
        handleDiagonal(
          { row, col },
          { row: row - 1, col: col + 1 },
          { row: row - 2, col: col + 2 },
          'd2'
        );
      }
    }
  }, [buttonState, buttons, lastMove, setButtonState, turn]);

  return (
    <Container>
      <Buttons />
    </Container>
  );
}

export default App;
