import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@mui/material'
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import classNames from 'classnames'
import React, { FC, ChangeEvent, KeyboardEvent, useState } from 'react'

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
  onKeyDown?: (
    event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
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
  onKeyDown,
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
              size="large">
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        error={error}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
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
  );
}
