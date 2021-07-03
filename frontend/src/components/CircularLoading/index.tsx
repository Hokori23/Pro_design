import React, { FC } from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
interface CircularLoadingProps {
  color?: 'inherit' | 'primary' | 'secondary'
  disableShrink?: boolean
  size?: number | string
  thickness?: number
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value?: number
  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   */
  variant?: 'determinate' | 'indeterminate' | 'static'
  style?: React.CSSProperties
}
export const CircularLoading: FC<CircularLoadingProps> = ({
  color,
  disableShrink,
  size,
  thickness,
  value,
  variant,
  style,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.loading} style={style}>
      <CircularProgress
        color={color}
        disableShrink={disableShrink}
        size={size}
        thickness={thickness}
        value={value}
        variant={variant}
      />
    </div>
  )
}
