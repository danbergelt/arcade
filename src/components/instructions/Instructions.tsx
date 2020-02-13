import React from 'react';
import './index.scss';

const Instructions: React.FC = () => {
  return (
    <section className='instructions'>
      <div className='instructions-spacer'>
        <div className='instructions-top'>
          <h1 className='title'>arcade</h1>

          <div className='desc'>
            currently playing: <span className='desc'>game of life</span>
          </div>
        </div>
        <div className='credit credit-container'>
          <a className='credit' href='https://danbergelt.com'>
            dan bergelt
          </a>
          <a
            className='credit'
            href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
          >
            learn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
