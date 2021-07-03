import React, { FC, Fragment } from 'react'
import { Input } from '@/components/Input'
import { Button, Chip, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { PostTag } from '@/utils/Request/PostTag'
import { formValid } from '@/components/UserFormValid'
import classnames from 'classnames'
import Icon from '@material-ui/core/Icon'
import 'material-design-icons/iconfont/material-icons.css'
import 'material-design-icons/iconfont/MaterialIcons-Regular.ttf'
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff'
import 'material-design-icons/iconfont/MaterialIcons-Regular.woff2'

// hooks
import useEdit from './useEdit'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  formTitle: {
    textAlign: 'center',
    margin: '2rem 0',
  },
  formItem: {
    width: '100%',
    marginBottom: '1rem',
  },
}))

interface EditProps {
  isNew: boolean
  loading: boolean
  tag: PostTag | null
  style?: React.CSSProperties
  setTag: React.Dispatch<React.SetStateAction<PostTag | null>>
  onSubmit: () => void
}
const Edit: FC<EditProps> = ({
  isNew,
  loading,
  tag,
  style,
  setTag,
  onSubmit,
}) => {
  const classes = useStyles()
  const {
    nameError,
    slugError,
    valid,
    isMobileSize,
    setNameError,
    setSlugError,
    setValid,
    handleSubmit,
  } = useEdit(tag, isNew, onSubmit)
  return (
    <Fragment>
      {tag ? (
        <form
          className={classnames('spread-box flex flex-column', classes.form)}
          onSubmit={handleSubmit}
          style={style}
        >
          <Chip
            clickable
            color={tag.iconColor}
            icon={tag.iconClass ? <Icon>{tag.iconClass}</Icon> : undefined}
            label={tag.name}
            size={isMobileSize ? 'small' : 'medium'}
            style={{ marginBottom: '1rem' }}
            variant="outlined"
          />
          <Input
            className={classes.formItem}
            color="primary"
            disabled={loading}
            error={nameError.error}
            fullWidth
            helperText={nameError.text}
            label="标签名"
            onChange={(e) => {
              setTag({ ...tag, name: e.target.value })
              setValid(
                formValid({
                  tagName: {
                    value: e.target.value,
                    errorSetter: setNameError,
                  },
                }),
              )
            }}
            required
            value={tag.name}
          />
          <Input
            className={classes.formItem}
            color="primary"
            disabled={loading}
            error={slugError.error}
            fullWidth
            helperText={slugError.text}
            label="slug"
            onChange={(e) => {
              setTag({ ...tag, slug: e.target.value })
              setValid(
                formValid({
                  tagSlug: {
                    value: e.target.value,
                    errorSetter: setSlugError,
                  },
                }),
              )
            }}
            required
            value={tag.slug}
          />
          <Input
            className={classes.formItem}
            color="primary"
            disabled={loading}
            fullWidth
            label="标签描述"
            onChange={(e) => setTag({ ...tag, description: e.target.value })}
            value={tag.description}
          />
          <Input
            className={classes.formItem}
            color="primary"
            disabled={loading}
            fullWidth
            label="图标class"
            onChange={(e) => setTag({ ...tag, iconClass: e.target.value })}
            value={tag.iconClass}
          />
          <Input
            className={classes.formItem}
            color="primary"
            disabled={loading}
            fullWidth
            label="图标Color"
            onChange={(e) =>
              setTag({
                ...tag,
                iconColor: e.target.value as
                  | 'default'
                  | 'primary'
                  | 'secondary',
              })
            }
            value={tag.iconColor}
          />
          <div style={{ position: 'relative' }}>
            <Button
              color="primary"
              disabled={!valid || loading}
              type="submit"
              variant="contained"
            >
              {isNew ? '创建' : '保存'}
            </Button>
            {loading && (
              <CircularProgress
                size={20}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  marginTop: -10,
                  marginLeft: -10,
                }}
              />
            )}
          </div>
        </form>
      ) : (
        <div
          className={classnames(
            'spread-box flex flex-column flex-center',
            classes.form,
          )}
          style={style}
        >
          <Typography
            align="center"
            className="non-select"
            color="primary"
            variant="h5"
          >
            暂无选中标签
          </Typography>
        </div>
      )}
    </Fragment>
  )
}

export default Edit
