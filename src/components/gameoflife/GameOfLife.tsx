import React, { useState, useRef, useCallback } from 'react';
import uuid from 'uuid';
import './index.scss';
import produce from 'immer';

const NUM_ROWS = 20;
const NUM_COLUMNS = 20;

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => {
    return [...Array(NUM_ROWS).fill([...Array(NUM_COLUMNS).fill(0)])];
  });

  const comeAlive = (i: number, j: number): void => {
    const nextGrid = produce(grid, newGrid => {
      newGrid[i][j] = newGrid[i][j] ? 0 : 1;
    });
    setGrid(nextGrid);
  };

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];

  const simulate = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < NUM_ROWS; i++) {
          for (let k = 0; k < NUM_COLUMNS; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < NUM_ROWS &&
                newK >= 0 &&
                newK < NUM_COLUMNS
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(simulate, 500);
  }, [operations]);

  const run = (): void => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      simulate();
    }
  };

  return (
    <>
      <button onClick={run}>{running ? 'Stop' : 'Start'}</button>
      <div className='grid'>
        {grid.map((row, i) => (
          <div className='row' key={uuid.v4()}>
            {row.map((lifeform, j) => (
              <div
                onClick={(): void => comeAlive(i, j)}
                className='lifeform'
                key={uuid.v4()}
              >
                {lifeform ? '😃' : '💀'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameOfLife;
