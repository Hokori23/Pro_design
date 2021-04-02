import React, { FC } from 'react'
import { Gender, GenderCN } from '@/utils/Request/user'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

interface GenderRadioProps {
  className?: string
  disabled?: boolean
  value: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: Gender) => void
}
export const GenderRadio: FC<GenderRadioProps> = ({
  className,
  disabled = false,
  value,
  onChange,
}) => {
  return (
    <RadioGroup
      className={className}
      onChange={(e, v) => onChange?.(e, Number(v))}
      value={value}
    >
      <FormControlLabel
        control={<Radio />}
        disabled={disabled}
        label={GenderCN.UNKNOWN}
        value={Gender.UNKNOWN}
      />
      <FormControlLabel
        control={<Radio />}
        disabled={disabled}
        label={GenderCN.MALE}
        value={Gender.MALE}
      />
      <FormControlLabel
        control={<Radio />}
        disabled={disabled}
        label={GenderCN.FEMALE}
        value={Gender.FEMALE}
      />
    </RadioGroup>
  )
}
