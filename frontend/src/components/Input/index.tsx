import {
  InputLabelProps,
  StandardTextFieldProps,
  TextField,
} from '@mui/material'
import classNames from 'classnames'
import React, { ChangeEvent, FC } from 'react'
export { GenderRadio } from './GenderRadio'
export { GenderSelect } from './GenderSelect'
export { PasswordInput } from './PasswordInput'
export { EmailInput } from './EmailInput'
export { EmailCaptcha } from './EmailCaptcha'
export { UrlInput } from './UrlInput'
export { NewCommentInput } from './NewCommentInput'

interface InputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  error?: boolean
  label?: string
  required?: boolean
  value?: string
  type?: string
  helperText?: string
  placeholder?: string
  InputProps?: {
    startAdornment?: JSX.Element
    endAdornment?: JSX.Element
  }
  InputLabelProps?: Partial<InputLabelProps>
  fullWidth?: boolean
  multiline?: boolean
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
  type,
  helperText,
  placeholder,
  InputProps,
  InputLabelProps,
  fullWidth,
  multiline,
  onChange,
  onBlur,
}) => {
  return (
    <TextField
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      className={classNames(
        error ? 'animate__animated animate__headShake' : '',
        className,
      )}
      color={color}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={helperText}
      label={label}
      multiline={multiline}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
}
