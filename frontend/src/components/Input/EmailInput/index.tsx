import {
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@mui/material'
import { Email } from '@mui/icons-material'
import classNames from 'classnames'
import React, { FC, ChangeEvent } from 'react'

interface EmailInputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  email?: string
  error?: boolean
  label?: string
  required?: boolean
  helperText?: string
  fullWidth?: boolean
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
  placeholder?: string
}
export const EmailInput: FC<EmailInputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  email,
  helperText,
  fullWidth,
  error = false,
  label = '邮箱',
  required = false,
  onChange,
  onBlur,
  placeholder,
}) => {
  return (
    <FormControl
      className={classNames(
        error ? 'animate__animated animate__headShake' : '',
        className,
        fullWidth ? 'spread-box__x' : '',
      )}
    >
      <InputLabel disabled={disabled} required={required}>
        {label}
      </InputLabel>
      <Input
        color={color}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        startAdornment={
          <InputAdornment className="non-select" position="start">
            <Icon style={{ marginRight: '5px' }}>
              <Email color="action" />
            </Icon>
          </InputAdornment>
        }
        type="email"
        value={email}
      />
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
