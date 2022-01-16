import { User } from '@/utils/Request/User'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { EmailInput, GenderSelect, Input, UrlInput } from '@/components/Input'
import { formValid } from '@/components/UserFormValid'
import makeStyles from '@mui/styles/makeStyles'
import classnames from 'classnames'

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
  attr: keyof User
  loading: boolean
  userInfo: Partial<User> | null
  handleValid: (valid: boolean) => void
  setUserInfo: Dispatch<SetStateAction<Partial<User> | null>>
}
const EditDialogInput: FC<EditDialogInputProps> = ({
  attr,
  loading,
  userInfo,
  handleValid,
  setUserInfo,
}) => {
  const classes = useStyles()
  const [error, setError] = useState({
    text: '',
    error: false,
  })

  useEffect(() => {
    if (error.error) {
      handleValid(false)
    } else {
      handleValid(true)
    }
  }, [error.error])

  useEffect(() => {
    if (attr === 'gender' || attr === 'profile') return
    if ((attr === 'url' && userInfo?.[attr]) || attr !== 'url') {
      formValid({
        [attr]: {
          value: userInfo?.[attr],
          errorSetter: setError,
        },
      })
    }
  }, [])

  if (attr === 'userName') {
    return (
      <Input
        className={classes.formItem}
        color="primary"
        disabled={loading}
        error={error.error}
        fullWidth
        helperText={error.text}
        label="用户名"
        onChange={(e) => {
          setUserInfo({ ...userInfo, [attr]: e.target.value })
          formValid({
            [attr]: {
              value: e.target.value,
              errorSetter: setError,
            },
          })
        }}
        required
        value={userInfo?.[attr] || ''}
      />
    )
  }
  if (attr === 'gender') {
    return (
      <GenderSelect
        className={classnames(classes.formItem, classes.genderRadio)}
        disabled={loading}
        label="性别"
        onChange={(e) =>
          setUserInfo({ ...userInfo, [attr]: Number(e.target.value) })
        }
        value={userInfo?.[attr]}
      />
    )
  }
  if (attr === 'email') {
    return (
      <EmailInput
        className={classes.formItem}
        color="primary"
        email={userInfo?.[attr]}
        error={error.error}
        fullWidth
        helperText={error.text}
        label="邮箱"
        onChange={(e) => {
          setUserInfo({ ...userInfo, [attr]: e.target.value })
          formValid({
            [attr]: {
              value: e.target.value,
              errorSetter: setError,
            },
          })
        }}
        required
      />
    )
  }

  if (attr === 'url') {
    return (
      <UrlInput
        className={classes.formItem}
        color="primary"
        disabled={loading}
        error={error.error}
        fullWidth
        helperText={error.text}
        onChange={(e) => {
          setUserInfo({ ...userInfo, [attr]: e.target.value })
          e.target.value
            ? formValid({
                url: {
                  value: e.target.value,
                  errorSetter: setError,
                },
              })
            : setError({ ...error, error: false })
        }}
        url={userInfo?.[attr] || ''}
      />
    )
  }

  if (attr === 'profile') {
    return (
      <Input
        className={classes.formItem}
        color="primary"
        disabled={loading}
        error={error.error}
        fullWidth
        helperText={error.text}
        label="个人简介"
        multiline
        onChange={(e) => {
          setUserInfo({ ...userInfo, [attr]: e.target.value })
        }}
        required
        value={userInfo?.[attr] || ''}
      />
    )
  }
  return null
}

export default EditDialogInput
