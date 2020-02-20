import React, { useState } from 'react';
import Nav from './components/nav/Nav';
import Instructions from './components/instructions/Instructions';
import GameOfLife from './components/gameoflife/GameOfLife';
import './index.scss';
import './styles/reset.scss';

const App: React.FC = () => {
  const [game, setGame] = useState(false);

  return (
    <>
      <Nav game={game} />
      <main className='app'>
        <Instructions />
        <GameOfLife game={game} setGame={setGame} />
      </main>
    </>
  );
};

export default App;
