import React, { Dispatch, FC, SetStateAction } from 'react'
import { Input } from '@/components/Input'
import { makeStyles } from '@material-ui/core/styles'
import { FormattedOption } from './useSystem'
import { cloneDeep } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0.5rem 3rem 2rem 3rem',
    backgroundColor: theme.palette.grey[50],
  },
  formTitle: {
    textAlign: 'center',
    margin: '2rem 0',
  },
  formItem: {
    marginBottom: '1rem',
  },
  genderRadio: {
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    justifyContent: 'space-around',
  },
}))

interface EditDialogInputProps {
  module: string
  itemKey: string
  loading: boolean
  blogConfig: FormattedOption
  setBlogConfig: Dispatch<SetStateAction<FormattedOption>>
}
const EditDialogInput: FC<EditDialogInputProps> = ({
  module,
  itemKey,
  loading,
  blogConfig,
  setBlogConfig,
}) => {
  const classes = useStyles()
  const optionItem = blogConfig[module]

  return (
    <Input
      className={classes.formItem}
      color="primary"
      disabled={loading}
      fullWidth
      label={itemKey}
      onChange={(e) => {
        const clonedBlogConfig = cloneDeep(blogConfig)
        clonedBlogConfig[module][itemKey].value = e.target.value
        setBlogConfig(clonedBlogConfig)
      }}
      required
      value={optionItem[itemKey].value}
    />
  )
}

export default EditDialogInput
