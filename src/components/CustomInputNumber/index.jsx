import React, { useEffect, useRef, useState } from 'react'
import isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import { btnStyle, inputStyle } from './style'

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  onBlur,
  disabled
}) => {
  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    return () => stopInput()
  }, [])

  useEffect(() => {
    if (isFunction(onChange) && inputValue !== value) {
      onChange({ inputValue })
    }
  }, [inputValue])

  const handleInputChange = (e) => {
    let newValue = Number(e.currentTarget.value)
    if (newValue > max) newValue = max
    if (newValue < min) newValue = min
    setInputValue(newValue)
  }

  const handleInputBlur = () => {
    const target = inputRef.current
    console.log('input name: ', target.name, 'input value: ', target.value)
    if (isFunction(onBlur)) onBlur({ event: e, inputValue })
  }

  const continousInput = (type) => {
    if (intervalRef.current) return
    if (disabled) return

    const callback = () =>
      setInputValue((prev) => {
        let res = 0
        switch (type) {
          case 'minus':
            res = prev - step
            if (res < min) {
              stopInput()
              return min
            }
            return res
          case 'plus':
            res = prev + step
            if (res > max) {
              stopInput()
              return max
            }
            return res
          default:
            throw new Error('no continousInput action type')
        }
      })
    callback()
    intervalRef.current = setInterval(() => callback(), 200)
  }

  const stopInput = () => {
    if (!intervalRef.current) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <div className="flex">
      <button
        className={btnStyle({
          cond: disabled || inputValue === min
        })}
        disabled={inputValue === min}
        onMouseDown={() => continousInput('minus')}
        onMouseUp={stopInput}
        onTouchStart={() => continousInput('minus')}
        onTouchEnd={stopInput}
        onMouseLeave={stopInput}
      >
        -
      </button>
      <input
        name={name}
        ref={inputRef}
        className={inputStyle({ cond: disabled || min === max })}
        type="number"
        disabled={disabled || min === max}
        value={inputValue.toString()}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <button
        className={btnStyle({
          cond: disabled || inputValue === max
        })}
        disabled={inputValue === max}
        onMouseDown={() => continousInput('plus')}
        onMouseUp={stopInput}
        onTouchStart={() => continousInput('plus')}
        onTouchEnd={stopInput}
        onMouseLeave={stopInput}
      >
        +
      </button>
    </div>
  )
}

CustomInputNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
}

export default CustomInputNumber
