import React, { FC, Fragment } from 'react'
import {
  Typography,
  makeStyles,
  Link,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import { RootState } from '@/store'
import { FormattedPostComment } from '@/utils/Request/PostComment'
import { formValid } from '@/components/UserFormValid'
import { Link as RouterLink } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

// components
import { EmailInput, UrlInput, NewCommentInput } from '@/components/Input'

// hooks
import useReplyComment from './useReplyComment'
import { useSelector } from 'react-redux'
import { PathName } from '@/routes'
import { classnames } from '@material-ui/data-grid'

const useStyles = makeStyles((theme) => ({
  commentBox: {
    borderRadius: 5,
    padding: '1rem',
    marginBottom: '1rem',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentHeader: {
    marginBottom: '1rem',
    fontWeight: 600,
  },
  commentCommenter: {
    display: 'flex',
    marginBottom: '1rem',
  },
  commentCommenterItem: {
    marginRight: '1rem',
    '&:last-child': {
      marginRight: 0,
    },
  },
  Icon: {
    fontSize: 20,
    padding: 5,
    marginLeft: 10,
  },
  emailInput: {
    flex: '2 1 200px',
  },
  urlInput: {
    flex: '1 1 150px',
  },
}))

interface ReplyCommentProps {
  id: string
  root: FormattedPostComment
  parent?: FormattedPostComment
  setDisplayReplyBox: React.Dispatch<React.SetStateAction<boolean>>
}

export const ReplyComment: FC<ReplyCommentProps> = ({
  id,
  root,
  parent,
  setDisplayReplyBox,
}) => {
  const state = useSelector((state: RootState) => state.postDetail)
  const classes = useStyles()
  const {
    isLogin,
    isLoading,
    comment,
    setComment,
    url,
    setUrl,
    email,
    setEmail,
    commentError,
    setCommentError,
    emailError,
    setEmailError,
    urlError,
    setUrlError,
    onSubmit,
    submitSnackBar,
    onSubmitSnackBarClose,
  } = useReplyComment(id, state.post.id as number, root, parent)
  return (
    <section className={classes.commentBox} id={id}>
      <Typography
        className="flex flex-row"
        style={{ justifyContent: 'space-between' }}
      >
        <Typography
          className={classes.commentHeader}
          color="primary"
          component="span"
          variant="subtitle1"
        >
          回复评论
        </Typography>
        {!isLogin ? (
          <Typography
            className={classes.commentHeader}
            color="primary"
            component="span"
            variant="subtitle1"
          >
            <Link
              className="plain-a"
              component={RouterLink}
              to={PathName.LOGIN}
            >
              前往登录账号评论 &gt;&gt;
            </Link>
            <IconButton
              className={classes.Icon}
              onClick={() => {
                setDisplayReplyBox(false)
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        ) : (
          <IconButton
            className={classes.Icon}
            onClick={() => {
              setDisplayReplyBox(false)
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Typography>
      <form className={classes.commentForm}>
        <section className={classes.commentCommenter}>
          {!isLogin && (
            <Fragment>
              <EmailInput
                className={classnames(
                  classes.commentCommenterItem,
                  classes.emailInput,
                )}
                color="primary"
                disabled={isLoading}
                email={email}
                error={emailError.error}
                helperText={emailError.text}
                onBlur={() =>
                  formValid({
                    email: {
                      value: email,
                      errorSetter: setEmailError,
                    },
                  })
                }
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
              />
              <UrlInput
                className={classnames(
                  classes.urlInput,
                  classes.commentCommenterItem,
                )}
                color="primary"
                disabled={isLoading}
                error={urlError.error}
                helperText={urlError.text}
                onBlur={() =>
                  url
                    ? formValid({
                        url: {
                          value: url,
                          errorSetter: setUrlError,
                        },
                      })
                    : setUrlError({ ...urlError, error: false })
                }
                onChange={(e) => setUrl(e.target.value)}
                url={url}
              />
            </Fragment>
          )}
        </section>

        <NewCommentInput
          comment={comment}
          disabled={isLoading}
          error={commentError.error}
          helperText={commentError.text}
          label="评论内容"
          loading={isLoading}
          onBlur={() =>
            formValid({
              comment: {
                value: comment,
                errorSetter: setCommentError,
              },
            })
          }
          onChange={(e) => setComment(e.target.value)}
          onSubmit={onSubmit}
          placeholder={`回复 @${
            parent
              ? parent.author?.userName || parent.email
              : root.author?.userName || root.email
          }：`}
          required
        />
      </form>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={submitSnackBar.autoHideDuration}
        key={submitSnackBar.message}
        onClose={onSubmitSnackBarClose}
        open={submitSnackBar.open}
      >
        <MuiAlert onClose={onSubmitSnackBarClose} severity="success">
          {submitSnackBar.message}
        </MuiAlert>
      </Snackbar>
    </section>
  )
}
