import { store } from '@/store'
import { Request } from '@/utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Option } from '@/utils/Request/Option'
import { RouteName } from '@/routes'
import { cloneDeep } from 'lodash-es'

export interface EditDialogProps {
  open: boolean
  title: string
  module: string
  key: string
  value?: string
}
const defaultEditDialogProps: EditDialogProps = {
  open: false,
  title: '',
  module: '',
  key: '',
  value: '',
}
interface FormattedOptionItemValue {
  value: string
  createdAt?: Date
  updatedAt?: Date
}
export interface FormattedOptionItem {
  [key: string]: FormattedOptionItemValue
}
export interface FormattedOption {
  [module: string]: FormattedOptionItem
}
const FormatOption = (blogConfig: Option[]): FormattedOption => {
  const formattedOptions: FormattedOption = {}
  blogConfig.forEach((option) => {
    const { module, key, value, createdAt, updatedAt } = option
    formattedOptions[module] = formattedOptions[module] || {}
    formattedOptions[module][key] = {
      value,
      createdAt,
      updatedAt,
    }
  })
  return formattedOptions
}

const ReformatOption = (formattedOptions: FormattedOption): Option[] => {
  const blogConfig: Option[] = []
  Object.keys(formattedOptions).forEach((moduleKey) => {
    const module = formattedOptions[moduleKey]
    Object.keys(module).forEach((key) => {
      const option = module[key]
      blogConfig.push({
        module: moduleKey,
        key,
        value: option.value,
      })
    })
  })
  return blogConfig
}

export default () => {
  const dispatch = useSelector(() => store.dispatch.common)
  const [blogConfig, setBlogConfig] = useState<FormattedOption>({})
  const [clonedBlogConfig, setClonedBlogConfig] = useState<FormattedOption>({})
  const [loading, setLoading] = useState(true)
  const [editDialog, setEditDialog] = useState(defaultEditDialogProps)

  const handleEditDialogClose = () => {
    setEditDialog({
      ...editDialog,
      open: false,
    })
  }
  const handleEditDialogOpen = (
    props: Omit<Omit<EditDialogProps, 'open'>, 'valid'>,
  ) => {
    setEditDialog({ ...defaultEditDialogProps, ...props, open: true })
  }

  const handleEditDialogSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    if (!clonedBlogConfig) return
    const newBlogConfig = ReformatOption(clonedBlogConfig)
    setLoading(true)
    const res = await Request.Option.SaveAll(newBlogConfig)
    setLoading(false)
    if (res?.data) {
      const blogConfig = FormatOption(res.data)
      setBlogConfig(blogConfig)
      setClonedBlogConfig(cloneDeep(blogConfig))
      handleEditDialogClose()
      dispatch.SET_AXIOS_SNACK_BAR({
        message: res.message,
        open: true,
      })
    }
  }

  const RetrieveAll = async () => {
    setLoading(true)
    const res = await Request.Option.RetrieveAll()
    setLoading(false)
    if (res?.data) {
      dispatch.SET_BLOG_CONFIG(res.data)
      const blogConfig = FormatOption(res.data)
      setBlogConfig(blogConfig)
      setClonedBlogConfig(cloneDeep(blogConfig))
    }
  }

  useEffect(() => {
    dispatch.SET_APPBAR_TITLE(RouteName.SYSTEM)
    void RetrieveAll()
  }, [])

  return {
    loading,
    blogConfig,
    clonedBlogConfig,
    editDialog,
    setClonedBlogConfig,
    handleEditDialogClose,
    handleEditDialogOpen,
    handleEditDialogSubmit,
  }
}
