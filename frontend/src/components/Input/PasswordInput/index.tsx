import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@material-ui/core'
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons'
import classNames from 'classnames'
import React, { FC, ChangeEvent, useState } from 'react'

interface PasswordInputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  error?: boolean
  label?: string
  password?: string
  required?: boolean
  helperText?: string
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
}
export const PasswordInput: FC<PasswordInputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  error = false,
  label = '密码',
  password,
  required = false,
  helperText,
  onChange,
  onBlur,
}) => {
  const [show, setShow] = useState(false)
  return (
    <FormControl
      className={classNames(
        error ? 'animate__animated animate__headShake' : '',
        className,
      )}
    >
      <InputLabel disabled={disabled} required={required}>
        {label}
      </InputLabel>
      <Input
        color={color}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
              onClick={() => setShow(!show)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={error}
        onBlur={(e) => {
          onBlur?.(e)
        }}
        onChange={(e) => {
          onChange?.(e)
        }}
        required={required}
        startAdornment={
          <InputAdornment position="start">
            <Lock color="action" />
          </InputAdornment>
        }
        type={show ? 'text' : 'password'}
        value={password}
      />
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
