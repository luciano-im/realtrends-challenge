import React from 'react';
import twitter from '../twitter.svg';
import github from '../github.svg';

function Footer(props) {
  const { sticky } = props;

  return (
    <footer className={sticky ? 'sticky' : ''}>
      <p>
        <a href="https://www.real-trends.com/" className="real-trends">
          Real Trends
        </a>{' '}
        challenge por <a href="https://www.luciano.im/">Luciano Muñoz</a>
      </p>
      <p className="social">
        <span>
          <img src={twitter} className="twitter" alt="twitter" />
          <a href="https://twitter.com/luciano_dev">@luciano_dev</a>
        </span>
        <span>
          <img src={github} className="github" alt="github" />
          <a href="https://github.com/luciano-im">luciano-im</a>
        </span>
      </p>
    </footer>
  );
}

export default Footer;
