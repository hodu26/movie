import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'styles/Search/slider_dualrange.css';

const DualRangeSlider = ({ min, max, onChange, className }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // 퍼센트로 전환
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // 왼쪽 슬라이더 움직일 시
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // 오른쪽 슬라이더 움직일 시
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // search의 rate 범위 설정
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={`dual-range-slider ${className}`}>
      
      {/* 왼쪽 슬라이더 */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={0.1}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 0.1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="dual-range-slider__thumb dual-range-slider__thumb--left"
      />

      {/* 오른쪽 슬라이더 */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={0.1}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 0.1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="dual-range-slider__thumb dual-range-slider__thumb--right"
      />

      {/* 트랙 및 선택 범위 */}
      <div className="dual-range-slider__track" />
      <div ref={range} className="dual-range-slider__range" />
    </div>
  );
};

export default DualRangeSlider;
