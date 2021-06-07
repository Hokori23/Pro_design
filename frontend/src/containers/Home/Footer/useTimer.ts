import { DAY, HOUR, MINUTE, SECOND } from '@/utils/const'
import { isDef, isUndef } from '@/utils/tools'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

const handleWatchDate = (
  blogCreatedAt: number | undefined,
  date: number,
  setDateText: Dispatch<SetStateAction<string>>,
) => {
  if (isUndef(blogCreatedAt)) return
  let text = ''
  let duration = date - blogCreatedAt

  const days = ~~(duration / DAY)
  if (days) {
    text += String(days) + '天'
    duration -= days * DAY
  }

  const hours = ~~(duration / HOUR)
  if (hours || days) {
    text += String(hours) + '小时'
    duration -= hours * HOUR
  }

  const minutes = ~~(duration / MINUTE)
  if (minutes || hours || days) {
    text += String(minutes) + '分'
    duration -= minutes * MINUTE
  }

  const seconds = ~~(duration / SECOND)
  text += String(seconds) + '秒'

  setDateText(text)
}
export default (blogCreatedAt?: number, blogName?: string) => {
  const [timer, setTimer] = useState(-1 as number | NodeJS.Timeout)
  const [dateText, setDateText] = useState('')
  const [date, setDate] = useState(Date.now())
  let yearText = `${String(new Date().getFullYear())}`
  if (isDef(blogCreatedAt)) {
    const createdYear = String(new Date(blogCreatedAt).getFullYear())
    if (createdYear !== yearText) {
      yearText = `${createdYear} - ${yearText}`
    }
  }
  if (blogName) {
    yearText += ` ${blogName}`
  }

  const refreshDate = () => {
    setTimer(
      setTimeout(() => {
        setDate(Date.now())
        refreshDate()
      }, 1000),
    )
  }

  useEffect(() => {
    refreshDate()
    return () => {
      timer !== -1 && clearTimeout(timer as NodeJS.Timeout)
    }
  }, [])
  useEffect(() => {
    handleWatchDate(blogCreatedAt, date, setDateText)
  }, [date])

  return { dateText, yearText }
}
