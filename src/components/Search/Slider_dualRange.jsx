import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'styles/Search/slider_dualrange.css';

const DualRangeSlider = ({ min, max, onChange, className }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  const leftSlider = useRef(null);
  const rightSlider = useRef(null);

  // 퍼센트로 전환
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // 슬라이더 스타일 업데이트
  const updateSliderStyle = useCallback(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }

    if (leftSlider.current) {
      leftSlider.current.style.left = `${minPercent}%`;
    }

    if (rightSlider.current) {
      rightSlider.current.style.left = `${maxPercent}%`;
    }
  }, [getPercent, minVal, maxVal]);

  // 슬라이더 스타일 업데이트
  useEffect(() => {
    updateSliderStyle();
  }, [minVal, maxVal, updateSliderStyle]);

  // search의 rate 범위 설정
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  // min, max 값 변경 시 동기화
  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

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
