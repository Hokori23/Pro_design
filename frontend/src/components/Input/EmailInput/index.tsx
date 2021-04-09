import {
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@material-ui/core'
import { Email } from '@material-ui/icons'
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
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
}
export const EmailInput: FC<EmailInputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  email,
  helperText,
  error = false,
  label = '邮箱',
  required = false,
  onChange,
  onBlur,
}) => {
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
        error={error}
        onBlur={onBlur}
        onChange={onChange}
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
