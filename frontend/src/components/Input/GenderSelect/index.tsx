import React, { FC } from 'react'
import { Gender, GenderCN } from '@/utils/Request/User'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

interface GenderSelectProps {
  className?: string
  disabled?: boolean
  displayEmpty?: boolean
  label?: string
  value: any
  onChange?: (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
    child: React.ReactNode,
  ) => void
}
export const GenderSelect: FC<GenderSelectProps> = ({
  className,
  disabled = false,
  displayEmpty = true,
  label,
  value,
  onChange,
}) => {
  return (
    <FormControl className={className}>
      {label && <InputLabel disabled={disabled}>{label}</InputLabel>}

      <Select
        disabled={disabled}
        displayEmpty={displayEmpty}
        fullWidth
        onChange={onChange}
        style={{ textAlign: 'center' }}
        value={value}
      >
        <MenuItem value={Gender.UNKNOWN}>{GenderCN.UNKNOWN}</MenuItem>
        <MenuItem value={Gender.MALE}>{GenderCN.MALE}</MenuItem>
        <MenuItem value={Gender.FEMALE}>{GenderCN.FEMALE}</MenuItem>
      </Select>
    </FormControl>
  )
}
