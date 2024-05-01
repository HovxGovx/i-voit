import React, { useState } from 'react';

const CustomNum = ({ value, onValueChange }) => {

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, 10);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, 0);
    onValueChange(newValue);
  };

  const checkMaxMin = () => {
    if (value === 10) {
      return {
        paddingTop: '0.8rem',
        height: '5em',
        arrUpDisplay: 'none',
        paddingBottom: '0',
        arrDownDisplay: 'block'
      };
    } else if (value === 1) {
      return {
        paddingTop: '0.8rem',
        height: '5em',
        arrDownDisplay: 'none',
        paddingBottom: '0',
        arrUpDisplay: 'block'
      };
    } else {
      return {
        padding: '0rem',
        height: '5em',
        arrUpDisplay: 'block',
        arrDownDisplay: 'block'
      };
    }
  };

  const { paddingTop, height, arrUpDisplay, paddingBottom, arrDownDisplay } = checkMaxMin();

  return (
    <div className="custom-num" style={{ paddingTop, height, paddingBottom }}>
      <i className="fas fa-plus-circle" style={{ display: arrUpDisplay }} onClick={handleIncrement}></i>
      <input
        type="number"
        className="num-input"
        min={1}
        max={10}
        value={value}
        onChange={e => onValueChange(parseInt(e.target.value))}
        data-color="#21d99b"
      />
      <i  className="fas fa-minus-circle" style={{ display: arrDownDisplay }} onClick={handleDecrement} ></i>
    </div>
  );
};

export default CustomNum;
