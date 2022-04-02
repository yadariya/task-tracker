import React from 'react';

interface Props {
  completed: boolean;
}

const TodoStatusIcon: React.FC<Props> = ({ completed }) => {
  if (completed) {
    return (
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="25.8785"
          height="26"
          rx="12.5"
          fill="#B8F1BE"
          stroke="#0CA31B"
        />
        <path d="M6.9685 14.9677L11.5361 20L18.9145 8" stroke="#0CA31B" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="26" height="26" rx="12.5" fill="white" stroke="#808080" />
    </svg>
  );
};

export default TodoStatusIcon;
