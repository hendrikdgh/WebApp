import React from 'react';

function Buttons({ onCreate, onDelete, onShowStats }) {
  return (
    <div>
      <button onClick={onCreate}>Create Contact</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onShowStats}>Show Stats</button>
    </div>
  );
}


export default Buttons;
