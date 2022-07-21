import Button from './Button';

const Buttons = ({
  buttons,
  setButtons,
  turn,
  setTurn,
  lastMove,
  setLastMove,
}) => {
  return (
    <>
      {[...Array(220)].map((_, index) => (
        <Button
          key={index}
          col={index % 11}
          row={Math.floor(index / 11) + 1}
          buttons={buttons}
          setButtons={setButtons}
          turn={turn}
          setTurn={setTurn}
          lastMove={lastMove}
          setLastMove={setLastMove}
        />
      ))}
    </>
  );
};
export default Buttons;
