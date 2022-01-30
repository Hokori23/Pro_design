import { AnimationConfig, loadAnimation } from '@/utils/tools'
import { useEffect, useRef } from 'react'

export const useAnimation = (
  lottieJsonData: any,
  options?: AnimationConfig,
) => {
  const animationDOM = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (animationDOM.current) {
      const lottieIns = loadAnimation(
        animationDOM.current,
        lottieJsonData,
        options,
      )
      return () => {
        lottieIns.destroy()
      }
    }
  })
  return {
    ref: animationDOM,
  }
}
