import { formValid } from '@/components/UserFormValid'
import { PostTag } from '@/utils/Request/PostTag'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'

export default (tag: PostTag | null, isNew: boolean, onSubmit: () => void) => {
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))

  const [nameError, setNameError] = useState({
    text: '',
    error: false,
  })
  const [slugError, setSlugError] = useState({
    text: '',
    error: false,
  })
  const [valid, setValid] = useState(false)

  const checkValid = (): boolean => {
    return formValid({
      tagName: {
        value: tag?.name,
        errorSetter: setNameError,
      },
      tagSlug: {
        value: tag?.slug,
        errorSetter: setSlugError,
      },
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (checkValid()) {
      onSubmit()
    }
  }

  useEffect(() => {
    if (!isNew) {
      setValid(checkValid())
    }
  }, [])
  return {
    nameError,
    slugError,
    valid,
    isMobileSize,
    setNameError,
    setSlugError,
    setValid,
    handleSubmit,
  }
}
