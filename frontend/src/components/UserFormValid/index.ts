import { Dispatch, SetStateAction } from 'react'
export interface FormValidPropItem {
  value: any
  errorSetter: Dispatch<
    SetStateAction<{
      text: string
      error: boolean
    }>
  >
}
export interface FormValidProps {
  [key: string]: FormValidPropItem | undefined
}

export const validators: {
  [key: string]: Array<{ handler: RegExp; text: string }>
} = {
  userAccount: [
    {
      handler: /^.{5,20}$/,
      text: '用户账号长度应为5至20字符',
    },
    {
      handler: /^\w+$/,
      text: '用户账号只能由字母、数字、下划线组成',
    },
  ],
  userName: [
    {
      handler: /^.{2,20}$/,
      text: '用户名长度应为2至20字符',
    },
    {
      handler: /^\w+$/,
      text: '用户名只能由字母、数字、下划线组成',
    },
  ],
  password: [
    {
      handler: /^.{5,20}$/,
      text: '密码长度应为5至20字符',
    },
    {
      handler: /^\w+$/,
      text: '密码只能由字母、数字、下划线组成',
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
  emailCaptcha: [
    {
      handler: /^.+$/,
      text: '邮箱验证码不能为空',
    },
    {
      handler: /^[a-z0-9]{8,8}$/,
      text: '邮箱验证码为8位小写字母和数字组成，请检查格式',
    },
  ],
  comment: [
    {
      handler: /^.+$/,
      text: '评论不能为空',
    },
  ],
  url: [
    {
      handler: /(https?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
      text: '网站格式不合法',
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

export const checkPassword = (
  password: string,
  confirmPassword: string,
  confirmPasswordErrorSetter: Dispatch<
    SetStateAction<{
      text: string
      error: boolean
    }>
  >,
) => {
  if (!confirmPassword) {
    confirmPasswordErrorSetter({ text: '请输入确认密码', error: true })
    return
  }
  if (password !== confirmPassword) {
    confirmPasswordErrorSetter({
      text: '两次输入的密码不同，请检查',
      error: true,
    })
    return
  }
  confirmPasswordErrorSetter({
    text: '',
    error: false,
  })
}
