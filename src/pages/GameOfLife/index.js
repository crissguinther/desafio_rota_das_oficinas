import React, { useCallback, useRef, useState } from 'react';
import { Cell, GameBoard } from './styled';
import { Button } from '../../styles/globalStyles';

export default function GameOfLife() {
  const numberOfRows = screen.width > 600 ? 30 : 15;
  const numberOfColumns = screen.width > 600 ? 30 : 15;

  const [running, setRunning] = useState(false); // eslint-disable-line
  const runRef = useRef();
  runRef.current = running;

  const possibleNeighbors = [
    [0, 1],
    [-1, -1],
    [0, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  const [generation, setGeneration] = useState(() => {
    let rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      rows.push(Array(numberOfColumns).fill(0));
    }

    return rows;
  });

  const resetGeneration = () => {
    if (running) setRunning(false);
    return setGeneration(() => {
      let rows = [];
      for (let i = 0; i < numberOfRows; i++) {
        rows.push(Array(numberOfColumns).fill(0));
      }
      return rows;
    });
  };

  const genNextGeneration = (state, cb) => {
    const newState = JSON.parse(JSON.stringify(state));
    cb(newState);
    return newState;
  };

  const play = useCallback(() => {
    if (!runRef.current) return;
    setGeneration((generation) => {
      return genNextGeneration(generation, (nextGeneration) => {
        for (let row = 0; row < numberOfRows; row++) {
          for (let column = 0; column < numberOfColumns; column++) {
            let neighbors = 0;
            possibleNeighbors.forEach(([x, y]) => {
              const Xaxis = row + x;
              const Yaxis = column + y;
              if (Xaxis >= 0 && Xaxis < numberOfRows && Yaxis >= 0 && Yaxis < numberOfColumns)
                neighbors += generation[Xaxis][Yaxis];
            });

            if (neighbors < 2 || neighbors > 3) nextGeneration[row][column] = 0;
            else if (neighbors === 3 && generation[row][column] === 0)
              nextGeneration[row][column] = 1;
          }
        }
      });
    });

    setTimeout(play, 300);
  }, []);

  return (
    <>
      <GameBoard columns={numberOfColumns}>
        {generation.map((row, ri) => {
          return row.map((col, ci) => (
            <Cell
              onClick={() => {
                const newGeneration = JSON.parse(JSON.stringify(generation));
                newGeneration[ri][ci] = generation[ri][ci] ? 0 : 1;
                setGeneration(newGeneration);
              }}
              key={`${ri}/${ci}`}
              isAlive={generation[ri][ci] ? true : false}
            />
          ));
        })}
      </GameBoard>
      <Button
        onClick={() => {
          setRunning(!running);
          runRef.current = true;
          play();
        }}>
        {running ? 'Parar' : 'Reproduzir'}
      </Button>
      <Button onClick={resetGeneration}>Resetar</Button>
    </>
  );
}
