import React from 'react'
import { useAnimation } from '@/hooks/useAnimation'
import makeStyles from '@mui/styles/makeStyles'
import loadingSvg from '@/static/svg/404.json'

const useStyles = makeStyles(() => ({
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loadingAnimation: {},
}))
export const PageLoading = () => {
  const classes = useStyles()
  const { ref: animationDOM } = useAnimation(loadingSvg)

  return (
    <div className={classes.loading}>
      <div className={classes.loadingAnimation} ref={animationDOM} />
    </div>
  )
}
