import {
  IconButton,
  FormControl,
  FormHelperText,
  Icon,
  Input,
  InputAdornment,
  InputLabel,
  StandardTextFieldProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import SendIcon from '@material-ui/icons/Send'
import classNames from 'classnames'
import React, { FC, ChangeEvent } from 'react'

const buttonSize = 34
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -buttonSize / 2,
    marginLeft: -buttonSize / 2,
  },
}))

interface NewCommentInputProps {
  className?: string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  comment?: string
  error?: boolean
  label?: string
  required?: boolean
  helperText?: string
  placeholder?: string
  loading?: boolean
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void
  onBlur?: StandardTextFieldProps['onBlur']
  onSubmit?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  sendButton?: boolean
}
export const NewCommentInput: FC<NewCommentInputProps> = ({
  className,
  color = 'primary',
  disabled = false,
  comment,
  helperText,
  error = false,
  label = '评论内容',
  required = false,
  loading = false,
  onChange,
  onBlur,
  onSubmit,
  placeholder,
  sendButton = true,
}) => {
  const classes = useStyles()
  return (
    <FormControl
      className={classNames(
        error ? 'animate__animated animate__headShake' : '',
        className,
      )}
    >
      <InputLabel disabled={disabled} required={required}>
        {label}
      </InputLabel>
      <Input
        color={color}
        disabled={disabled}
        endAdornment={
          sendButton && (
            <InputAdornment position="end">
              <div className={classes.wrapper}>
                <IconButton
                  color="primary"
                  onClick={onSubmit}
                  size="small"
                  style={{ padding: 8 }}
                >
                  <SendIcon color="action" />
                </IconButton>
                {loading && (
                  <CircularProgress
                    className={classes.buttonProgress}
                    size={buttonSize}
                  />
                )}
              </div>
            </InputAdornment>
          )
        }
        error={error}
        multiline
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        startAdornment={
          <InputAdornment className="non-select" position="start">
            <Icon style={{ marginRight: '5px' }}>
              <CommentIcon color="action" />
            </Icon>
          </InputAdornment>
        }
        value={comment}
      />
      {helperText && error && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
