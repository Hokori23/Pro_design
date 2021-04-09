import {
  Button,
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
} from '@material-ui/core'
import { Sms as SmsIcon } from '@material-ui/icons'
import classNames from 'classnames'
import React, { FC, ChangeEvent, useState, useEffect } from 'react'

interface EmailCaptchaProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  emailCaptcha?: string
  error?: boolean
  label?: string
  required?: boolean
  helperText?: string
  sendCaptcha: () => Promise<boolean>
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
}

const CaptchaTimeout = 30 // 邮箱验证码倒计时，单位s

export const EmailCaptcha: FC<EmailCaptchaProps> = ({
  className,
  color = 'primary',
  disabled = false,
  emailCaptcha,
  helperText,
  error = false,
  label = '邮箱',
  required = false,
  sendCaptcha,
  onChange,
  onBlur,
}) => {
  const [timer, setTimer] = useState(-1) // 计时器编号
  const [timerText, setTimerText] = useState('0 秒') // 倒计时
  const handleCaptchaTimeout = () => {
    if (timer !== -1) return
    const recur = (time: number) => {
      if (time === 0) {
        setTimer(-1)
        return
      }
      setTimerText(`${time} 秒`)
      setTimer(
        (setTimeout(() => {
          setTimerText(`${time} 秒`)
          recur(time - 1)
        }, 1000) as unknown) as number,
      )
    }
    recur(CaptchaTimeout) // 初始化倒计时
  }

  useEffect(() => {
    return () => {
      // 销毁组件前清除计时器
      timer !== -1 && clearTimeout(timer)
    }
  }, [timer])

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
            <Button
              disableElevation
              disabled={disabled || timer !== -1}
              onClick={async () => {
                if (await sendCaptcha()) {
                  handleCaptchaTimeout()
                }
              }}
              onMouseDown={(e) => e.preventDefault()}
              size="small"
              variant="text"
            >
              {timer === -1 ? '发送验证码' : timerText}
            </Button>
          </InputAdornment>
        }
        error={error}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        startAdornment={
          <InputAdornment className="non-select" position="start">
            <Icon style={{ marginRight: '5px' }}>
              <SmsIcon color="action" />
            </Icon>
          </InputAdornment>
        }
        value={emailCaptcha}
      />
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
