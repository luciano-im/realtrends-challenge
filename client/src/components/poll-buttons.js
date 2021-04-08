import React from 'react';
import play from '../play.svg';
import pause from '../pause.svg';
import stop from '../stop.svg';

function PollButtons(props) {
  const { paused, onPause, onRestart } = props;

  const handlePlayPause = () => {
    onPause(!paused);
  };

  const handleRestart = () => {
    onRestart();
  };

  return (
    <div className="poll-buttons">
      {paused ? (
        <button className="play-poll" onClick={handlePlayPause}>
          <img src={play} alt="Comenzar votación" /> Comenzar votación
        </button>
      ) : (
        <button className="pause-poll" onClick={handlePlayPause}>
          <img src={pause} alt="Pausar votación" /> Pausar votación
        </button>
      )}
      <button className="stop-poll" onClick={handleRestart}>
        <img src={stop} alt="Reiniciar votación" /> Reiniciar votación
      </button>
    </div>
  );
}

export default PollButtons;
