import React from 'react';
import Instructions from './components/ui/Instructions';
import GameOfLife from './components/gameoflife/GameOfLife';
import './index.scss';
import './styles/reset.scss';

const App: React.FC = () => {
  return (
    <main className='app'>
      <Instructions />
      <GameOfLife />
    </main>
  );
};

export default App;
