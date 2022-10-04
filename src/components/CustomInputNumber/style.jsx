import classNames from 'classnames'

export const btnStyle = ({ cond }) =>
  classNames('input-number-style input-number-button', {
    'border-gray-300': cond,
    'text-gray-300': cond,
    'not-allowed': cond
  })

export const inputStyle = ({ cond }) =>
  classNames(
    'input-number-style text-center mx-2 focus:border-blue-500 focus:border-2',
    {
      'border-gray-300': cond,
      'text-gray-300': cond
    }
  )
