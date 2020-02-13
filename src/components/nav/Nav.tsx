import React from 'react';
import Status from './Status';
import './index.scss';

interface Props {
  game: boolean;
}

const Nav: React.FC<Props> = ({ game }) => {
  return (
    <nav className='nav'>
      <Status game={game} />
    </nav>
  );
};

export default Nav;
