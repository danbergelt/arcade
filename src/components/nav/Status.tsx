import React from 'react';

interface Props {
  game: boolean;
}

const Status: React.FC<Props> = ({ game }) => {
  return game ? (
    <svg
      className='spinner'
      height='20px'
      width='20px'
      fill='#0b0000'
      version='1.1'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
    >
      <path d='M50.6,95c-14.3,0-27.9-6.9-36.4-18.5l14.5-10.6C33.9,72.9,42,77,50.6,77c14.9,0,27-12.1,27-27  s-12.1-27-27-27l-0.1,0V5v9l0-9c24.9,0,45.1,20.2,45.1,45S75.4,95,50.6,95z'></path>
    </svg>
  ) : (
    <svg
      height='20px'
      width='20px'
      fill='#0b0000'
      version='1.1'
      viewBox='0 0 725 721'
      x='0px'
      y='0px'
      fillRule='evenodd'
      clipRule='evenodd'
    >
      <defs>
        <style type='text/css'></style>
      </defs>
      <g>
        <rect className='fil0' width='244' height='721'></rect>
        <rect className='fil0' x='481' width='244' height='721'></rect>
      </g>
    </svg>
  );
};

export default Status;
