import React from 'react';

interface Props {
  game: boolean;
}

const Status: React.FC<Props> = ({ game }) => {
  return (
    <svg
      height='10px'
      width='10px'
      fill={game ? 'chartreuse' : 'red'}
      version='1.1'
      viewBox='0 0 847 847'
      x='0px'
      y='0px'
      fillRule='evenodd'
      clipRule='evenodd'
    >
      <defs>
        <style type='text/css'></style>
      </defs>
      <g>
        <circle className='fil0' cx='423' cy='423' r='402'></circle>
      </g>
    </svg>
  );
};

export default Status;
