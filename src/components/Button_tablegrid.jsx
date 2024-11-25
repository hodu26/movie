import React from 'react';
import 'styles/button_tablegrid.css';

const Button_TableGrid = ({ isTable, setIsTable }) => {

  return (
    <div className="view-toggle">
      <button
        className={`button ${isTable ? 'button-unselected' : 'button-selected'}`}
        aria-label="Grid view"
        onClick={() => setIsTable(false)}
      >
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        className={`button ${isTable ? 'button-selected' : 'button-unselected'}`}
        aria-label="Table view"
        onClick={() => setIsTable(true)}
      >
        <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  )
};

export default Button_TableGrid;