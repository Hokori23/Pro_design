import { StandardTextFieldProps, TextField } from '@material-ui/core'
import classNames from 'classnames'
import React, { ChangeEvent, FC } from 'react'
export { GenderRadio } from './GenderRadio'
export { GenderSelect } from './GenderSelect'
export { PasswordInput } from './PasswordInput'
export { EmailInput } from './EmailInput'
export { EmailCaptcha } from './EmailCaptcha'

interface InputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  error?: boolean
  label?: string
  required?: boolean
  value?: string
  helperText?: string
  InputProps?: {
    startAdornment: JSX.Element
  }
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
}
export const Input: FC<InputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  error = false,
  label = '密码',
  required = false,
  value,
  helperText,
  InputProps,
  onChange,
  onBlur,
}) => {
  return (
    <TextField
      InputProps={InputProps}
      className={classNames(
        error ? 'animate__animated animate__headShake' : '',
        className,
      )}
      color={color}
      disabled={disabled}
      error={error}
      helperText={helperText}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      required={required}
      value={value}
    />
  )
}
