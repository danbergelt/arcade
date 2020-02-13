import React from 'react';
import './index.scss';

const Instructions: React.FC = () => {
  return (
    <section className='instructions'>
      <div className='instructions-spacer'>
        <div className='instructions-top'>
          <h1 className='title'>arcade</h1>
          <h2 className='desc'>
            <span id='playing'>playing:</span> game of life
          </h2>
        </div>
        <a href='https://danbergelt.com' className='credit'>
          by: dan bergelt
        </a>
      </div>
    </section>
  );
};

export default Instructions;
