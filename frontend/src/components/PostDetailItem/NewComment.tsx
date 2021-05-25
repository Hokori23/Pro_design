import React, { FC, Fragment } from 'react'
import { Post } from '@/utils/Request/Post'
import { Typography, makeStyles, Link, Snackbar } from '@material-ui/core'
import { formValid } from '@/components/UserFormValid'
import { grey } from '@material-ui/core/colors'
import { Link as RouterLink } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'

// components
import { EmailInput, UrlInput, NewCommentInput } from '@/components/Input'

// hooks
import useNewComment from './useNewComment'
import { classnames } from '@material-ui/data-grid'
import { PathName } from '@/routes'

const useStyles = makeStyles((theme) => ({
  commentBox: {
    backgroundColor: grey[200],
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
  emailInput: {
    flex: '2 1 200px',
  },
  urlInput: {
    flex: '1 1 150px',
  },
}))

interface NewCommentProps {
  post: Post
  Retrieve: (id: string) => Promise<void>
}
export const NewComment: FC<NewCommentProps> = ({ post, Retrieve }) => {
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
  } = useNewComment(post, Retrieve)
  // 已登录：直接填comment
  // 未登录：uid = -1、comment、email
  return (
    <section className={classes.commentBox}>
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
          添加新评论
        </Typography>
        {!isLogin && (
          <Typography color="secondary" component="span" variant="subtitle1">
            <Link
              className="plain-a"
              component={RouterLink}
              to={PathName.LOGIN}
            >
              前往登录账号评论 &gt;&gt;
            </Link>
          </Typography>
        )}
      </Typography>
      <form className={classnames(classes.commentForm, 'flex flex-column')}>
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
          placeholder="输入评论内容"
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
