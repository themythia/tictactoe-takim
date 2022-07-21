const Button = ({
  row,
  col,
  buttons,
  setButtons,
  turn,
  setTurn,
  lastMove,
  setLastMove,
}) => {
  const handleClick = () => {
    if (turn === 'player') {
      setButtons({
        ...buttons,
        [row]: buttons[row].map((button, index) =>
          col === index ? 'X' : null
        ),
      });
      setLastMove({ row, col });
      setTurn('cpu');
    }
  };
  return <button onClick={handleClick}>{buttons?.[row]?.[col]}</button>;
};
export default Button;
