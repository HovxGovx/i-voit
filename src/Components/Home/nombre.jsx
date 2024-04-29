import React, { useState } from 'react';

const CustomNum = () => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => {
    setValue(prevValue => Math.min(prevValue + 1, 10));
  };

  const handleDecrement = () => {
    setValue(prevValue => Math.max(prevValue - 1, 0));
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
    } else if (value === 0) {
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
      <i className="fas fa-angle-up arr-up" style={{ display: arrUpDisplay }} onClick={handleIncrement}></i>
      <input
        type="number"
        className="num-input"
        min={0}
        max={10}
        value={value}
        onChange={e => setValue(e.target.value)}
        data-color="#21d99b"
      />
      <i  className="fas fa-angle-down arr-down" style={{ display: arrDownDisplay }} onClick={handleDecrement} ></i>
    </div>
  );
};

export default CustomNum;
