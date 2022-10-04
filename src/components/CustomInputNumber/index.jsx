import React, { useEffect, useId, useRef, useState } from 'react'
import isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import { btnStyle, inputStyle } from './style'

const CustomInputNumber = ({
  min = 0,
  max,
  step = 1,
  name,
  value = 0,
  onChange,
  onBlur,
  disabled
}) => {
  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const [inputValue, setInputValue] = useState(value)
  const id = useId()

  useEffect(() => {
    return () => stopInput()
  }, [])

  useEffect(() => {
    if (!inputRef.current) return
    console.log('component name', inputRef.current.name)
    console.log('component value', inputRef.current.value)
  }, [inputValue])

  const handleInputChange = (e) => {
    let newValue = Number(e.currentTarget.value)
    if (newValue > max) newValue = max
    if (newValue < min) newValue = min
    setInputValue(newValue)
    if (isFunction(onChange)) onChange(e)
  }

  const handleInputBlur = (e) => {
    const target = inputRef.current
    console.log('name', target.name, 'value', target.value)
    if (isFunction(onBlur)) onBlur(e)
  }

  const continousInput = (type) => {
    if (intervalRef.current) return
    if (disabled) return

    intervalRef.current = setInterval(() => {
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
    }, 50)
  }

  const stopInput = () => {
    if (!intervalRef.current) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <div className="flex border-dashed p-2 border rounded border-gray-500">
      {/* 因為 Btn 只有這裡用到，就不額外拆一個 Btn Component 了 */}
      <button
        className={btnStyle({
          cond: disabled || inputValue === min
        })}
        disabled={inputValue === min}
        onMouseDown={() => continousInput('minus')}
        onMouseUp={stopInput}
        onMouseLeave={stopInput}
      >
        -
      </button>
      <input
        name={name + id}
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
        onMouseLeave={stopInput}
      >
        +
      </button>
    </div>
  )
}

// 也可直接寫 ts，webpack 的配置稍微修改一下就好
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
