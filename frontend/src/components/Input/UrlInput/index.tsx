import {
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@material-ui/core'
import WebIcon from '@material-ui/icons/Web'
import classNames from 'classnames'
import React, { FC, ChangeEvent } from 'react'

interface UrlInputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  url?: string
  error?: boolean
  label?: string
  required?: boolean
  helperText?: string
  placeholder?: string
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
}
export const UrlInput: FC<UrlInputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  url,
  helperText,
  error = false,
  label = '个人网站',
  required = false,
  onChange,
  onBlur,
  placeholder = 'http(s)://',
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
        placeholder={placeholder}
        required={required}
        startAdornment={
          <InputAdornment className="non-select" position="start">
            <Icon style={{ marginRight: '5px' }}>
              <WebIcon color="action" />
            </Icon>
          </InputAdornment>
        }
        value={url}
      />
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
