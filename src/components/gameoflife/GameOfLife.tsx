import React, { useState, useRef, useCallback, useEffect } from 'react';
import uuid from 'uuid';
import './index.scss';
import produce from 'immer';
import { ReactComponent as On } from '../../assets/on.svg';
import { ReactComponent as Off } from '../../assets/off.svg';

// rows + column constants for graph
const NUM_ROWS = 20;
const NUM_COLUMNS = 20;

// math shortcuts to get neighbors
const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

// generate an empty graph
const genGraph = (): number[][] => [
  ...Array(NUM_ROWS).fill([...Array(NUM_COLUMNS).fill(0)])
];

interface Props {
  game: boolean;
  setGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOfLife: React.FC<Props> = ({ game, setGame }) => {
  // reset game state on render;
  useEffect(() => {
    setGame(false);
  }, []);

  // initial graph state
  const [graph, setGraph] = useState<number[][]>(() => {
    return genGraph();
  });

  // click or hover state
  const [clickOrHover, setClickOrHover] = useState<string>('click');

  // animation speed
  const [speed, setSpeed] = useState<number>(500);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  // ref to store game state --> line of communication between game loop and game state
  const gameRef = useRef(game);
  gameRef.current = game;

  // toggle game state
  const toggle = (i: number, j: number): void => {
    setGraph(g => {
      return produce(g, draft => {
        draft[i][j] = g[i][j] ? 0 : 1;
      });
    });
  };

  // randomize graph state
  const randomize = (): void => {
    setGraph(g => {
      return produce(g, draft => {
        g.forEach((row, i) => {
          row.forEach((_, j) => {
            const a = Math.random();
            const b = Math.random();
            draft[i][j] = a > b ? 0 : 1;
          });
        });
      });
    });
  };

  // run the automation, update graph based on Game of Life rules
  const run = useCallback((): void => {
    if (!gameRef.current) {
      return;
    }

    setGraph(g => {
      return produce(g, draft => {
        g.forEach((row, i) => {
          row.forEach((node, j) => {
            let count = 0;
            NEIGHBORS.forEach(([x, y]) => {
              const nX = i + x;
              const nY = j + y;
              if (
                nX > 0 &&
                nX < NUM_ROWS &&
                nY > 0 &&
                nY < NUM_COLUMNS &&
                g[nX][nY]
              )
                count++;
            });

            if ((node && count < 2) || (node && count > 3)) {
              draft[i][j] = 0;
            }

            if (
              (node && (count === 2 || count === 3)) ||
              (!node && count === 3)
            ) {
              draft[i][j] = 1;
            }
          });
        });
      });
    });
    // timing can be adjusted based on preferred speed
    setTimeout(run, speedRef.current);
  }, []);

  // game switch
  const toggleGame = (): void => {
    setGame(!game);
    // state updates are async, so need to run game if state is NOT TRUE
    if (!game) {
      gameRef.current = true;
      run();
    }
  };

  // click on node
  const handleClick = (i: number, j: number): void => {
    toggle(i, j);
  };

  // click on node via keyboard (accessibility)
  const handleKeyDown = (
    i: number,
    j: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (e.keyCode == 13) {
      toggle(i, j);
    }
  };

  // clear graph

  const clear = (): void => {
    setGraph(genGraph());
  };

  return (
    <div className='grid'>
      {graph.map((row, i) => (
        <div className='row' key={uuid.v4()}>
          {row.map((node, j) => (
            <div
              className='node'
              onKeyDown={(e): void => handleKeyDown(i, j, e)}
              onClick={(): void | false =>
                clickOrHover === 'click' && handleClick(i, j)
              }
              onMouseOver={(): void | false =>
                clickOrHover === 'hover' && !node && handleClick(i, j)
              }
              onFocus={(): void | false =>
                clickOrHover === 'hover' && !node && handleClick(i, j)
              }
              key={uuid.v4()}
              role='button'
              tabIndex={0}
            >
              {!node ? '⚫' : '⚪'}
            </div>
          ))}
        </div>
      ))}
      <div className='controls'>
        <div className='left-side-controls'>
          <button
            className={game ? 'button' : 'button off'}
            onClick={toggleGame}
          >
            {game ? 'stop' : 'start'}
          </button>
          <button
            onClick={(): void => setSpeed(500 * 0.5)}
            className={speed === 500 / 0.5 ? 'speed active' : 'speed'}
          >
            0.5x
          </button>
          <button
            onClick={(): void => setSpeed(500)}
            className={speed === 500 ? 'speed active' : 'speed'}
          >
            1.0x
          </button>
          <button
            onClick={(): void => setSpeed(500 * 1.5)}
            className={speed === 500 / 1.5 ? 'speed active' : 'speed'}
          >
            1.5x
          </button>
        </div>
        <div className='right-side-controls'>
          <div className='click-or-hover'>
            <button
              className='button-reset'
              onClick={(): void => setClickOrHover('click')}
            >
              {clickOrHover === 'click' ? <On /> : <Off />}
            </button>
            <span className='interaction-label'>click</span>
          </div>
          <div className='click-or-hover'>
            <button
              className='button-reset'
              onClick={(): void => setClickOrHover('hover')}
            >
              {clickOrHover === 'hover' ? <On /> : <Off />}
            </button>
            <div className='interaction-label'>hover</div>
          </div>
          <button onClick={randomize} className='button-alt'>
            random
          </button>
          <button onClick={clear} className='button-alt'>
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
