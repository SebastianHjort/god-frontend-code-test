import React from 'react';
import ChevronCircle from '../../../../assets/chevron-circled.svg';
import './ChevronButton.css';

function ChevronButton({
  onClick,
  direction = 'right',
  width = 40,
  disabled,
  ...props
}: {
  onClick: () => void;
  direction?: 'right' | 'left';
  width?: number;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`chevronButton ${direction} ${disabled && 'disabled'}`}
      {...props}
    >
      <img src={ChevronCircle} width={width} alt={`Chevron ${direction}`} />
    </button>
  );
}

export default ChevronButton;
