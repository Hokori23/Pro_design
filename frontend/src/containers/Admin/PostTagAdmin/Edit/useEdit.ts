import { formValid } from '@/components/UserFormValid'
import { PostTag } from '@/utils/Request/PostTag'
import { useMobileSize } from '@/hooks/useScreenSize'
import { useEffect, useState } from 'react'

export default (tag: PostTag | null, isNew: boolean, onSubmit: () => void) => {
  const isMobileSize = useMobileSize()

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
