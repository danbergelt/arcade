import React from 'react';
import './index.scss';

const Instructions: React.FC = () => {
  return (
    <section className='instructions'>
      <div className='instructions-spacer'>
        <div className='instructions-top'>
          <h1 className='title'>arcade</h1>

          <div className='desc'>
            currently playing:{' '}
            <a
              className='desc'
              href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
            >
              game of life
            </a>
          </div>
        </div>
        <div className='credit'>
          by:{' '}
          <a className='credit' href='https://danbergelt.com'>
            dan bergelt
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
