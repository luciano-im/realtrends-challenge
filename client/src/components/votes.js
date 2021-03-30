import React from 'react';

function Votes(props) {
  const { votes } = props;

  return (
    <div className="votes">
      <ul>
        {votes.map((vote) => {
          return (
            <li key={vote.user} className="vote">
              <span className="user">{vote.user}:</span> {vote.comment}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Votes;
