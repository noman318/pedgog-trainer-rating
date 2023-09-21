/* eslint-disable no-unused-vars, array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useCallback, useEffect, useRef, useState } from "react";
import "./Range.scss";
import classNames from "classnames";

const Slider1 = ({ onChange, selectedValue }) => {
  let bulletes = [];
  for (let i = 0; i <= 5; i++) {
    bulletes.push(i);
  }

  const _handleClick = useCallback(
    (changedValue) => {
      onChange(changedValue);
    },
    [selectedValue]
  );

  return (
    <div className="slider1_cntr">
      <div className="range-input">
        {bulletes.map((o) => {
          return (
            <span
              className={classNames(`bullet-${o}`, {
                active: o == selectedValue,
              })}
            ></span>
          );
        })}

        <input
          type="range"
          value={selectedValue}
          min="0"
          max="5"
          step={1}
          onChange={({ target: { value: radius } }) => {
            _handleClick(radius);
          }}
        />
      </div>
    </div>
  );
};

export default Slider1;
