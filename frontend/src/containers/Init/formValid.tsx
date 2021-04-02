import { Dispatch, SetStateAction } from 'react'
interface FormValidPropItem {
  value: any
  errorSetter: Dispatch<
    SetStateAction<{
      text: string
      error: boolean
    }>
  >
}
interface FormValidProps {
  [key: string]: FormValidPropItem | undefined
  userAccount?: FormValidPropItem
  userName?: FormValidPropItem
  password?: FormValidPropItem
  email?: FormValidPropItem
}
const validators: {
  [key: string]: Array<{ handler: RegExp; text: string }>
} = {
  userAccount: [
    {
      handler: /^(\d|\w){5,20}$/,
      text: '用户账号长度应为5至20字符',
    },
  ],
  userName: [
    {
      handler: /^(\d|\w){2,20}$/,
      text: '用户名长度应为2至20字符',
    },
  ],
  password: [
    {
      handler: /^.+$/,
      text: '密码长度应为2至20字符',
    },
  ],
  email: [
    {
      handler: /^.+$/,
      text: '邮箱不能为空',
    },
    {
      handler: /^[a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
      text: '邮箱格式错误',
    },
  ],
}

export const formValid = (props: FormValidProps): boolean => {
  const keys = Object.keys(props)
  let flag = true
  for (var i = 0; i < keys.length; i++) {
    const formItem = props[keys[i]]
    const validator = validators[keys[i]]
    for (var j = 0; j < validator.length; j++) {
      if (validator[j].handler.test(formItem?.value)) {
        formItem?.errorSetter({
          text: '',
          error: false,
        })
      } else {
        formItem?.errorSetter({
          text: validator[j].text,
          error: true,
        })
        flag = false
        break
      }
    }
  }
  return flag
}
