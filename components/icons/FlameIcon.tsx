
import React from 'react';

const FlameIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path
      fillRule="evenodd"
      d="M12.963 2.286a.75.75 0 00-1.071 1.071L12 4.44l-1.071-1.071a.75.75 0 10-1.071 1.071L10.929 5.5l-1.07 1.071a.75.75 0 001.07 1.071L12 6.57l1.07 1.07a.75.75 0 001.071-1.07L13.07 5.5l1.071-1.07a.75.75 0 00-1.178-1.144z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3V12.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 013.75-3.75 3.75 3.75 0 013.75 3.75v3a.75.75 0 01-1.5 0v-3a2.25 2.25 0 00-2.25-2.25 2.25 2.25 0 00-2.25 2.25v1.524a.75.75 0 01-1.5 0V6.75z"
      clipRule="evenodd"
    />
  </svg>
);

export default FlameIcon;
