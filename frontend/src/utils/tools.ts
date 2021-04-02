export const isDef = <T>(v: T | undefined | null): v is T =>
  v !== undefined && v !== null
export const isUndef = (v: any): v is undefined | null =>
  v === undefined || v === null
export const isEmail = (v: string): boolean =>
  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(v)

export default { isDef, isUndef, isEmail }
