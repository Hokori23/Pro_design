import React, { useEffect, FC } from 'react'
import { useAnimation } from '@/hooks/useAnimation'
import makeStyles from '@mui/styles/makeStyles'
import loadingSvg1 from '@/static/svg/loading1.json'
import loadingSvg2 from '@/static/svg/loading2.json'
import loadingSvg3 from '@/static/svg/loading3.json'
import loadingSvg4 from '@/static/svg/loading4.json'
import loadingSvg5 from '@/static/svg/loading5.json'
import loadingSvg6 from '@/static/svg/loading6.json'
import loadingSvg7 from '@/static/svg/loading7.json'

const LOADING_SVG = [
  loadingSvg1,
  loadingSvg2,
  loadingSvg3,
  loadingSvg4,
  loadingSvg5,
  loadingSvg6,
  loadingSvg7,
]
const loadingSvgLength = LOADING_SVG.length
let curSvgIdx = 0

const useStyles = makeStyles(() => ({
  loading: {
    height: '100%',
    width: '100%',
    background: '#fff',
  },
  loadingAnimation: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
  },
}))

interface PageLoadingProps {
  style?: React.CSSProperties
}

export const PageLoading: FC<PageLoadingProps> = ({ style }) => {
  const classes = useStyles()
  const { ref: animationDOM } = useAnimation(LOADING_SVG[curSvgIdx])

  useEffect(() => {
    return () => {
      curSvgIdx = ++curSvgIdx % loadingSvgLength
    }
  })

  return (
    <div className={classes.loading}>
      <div
        className={classes.loadingAnimation}
        ref={animationDOM}
        style={style}
      />
    </div>
  )
}
