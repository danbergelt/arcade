import React from 'react';
import './index.scss';

const Instructions: React.FC = () => {
  return (
    <section className='instructions'>
      <div className='instructions-spacer'>
        <div className='instructions-top'>
          <h1 className='title'>arcade</h1>
          <div>
            <a
              href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
              className='desc'
            >
              currently playing: game of life
            </a>
          </div>
        </div>
        <a href='https://danbergelt.com' className='credit'>
          by: dan bergelt
        </a>
      </div>
    </section>
  );
};

export default Instructions;
