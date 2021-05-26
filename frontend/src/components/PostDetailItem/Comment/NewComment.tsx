import React, { FC, Fragment } from 'react'
import {
  Typography,
  makeStyles,
  Link,
  Snackbar,
  Avatar,
} from '@material-ui/core'
import { formValid } from '@/components/UserFormValid'
import { grey } from '@material-ui/core/colors'
import { Link as RouterLink } from 'react-router-dom'
import MuiAlert from '@material-ui/lab/Alert'
import { RootState, store } from '@/store'

// components
import { EmailInput, UrlInput, NewCommentInput } from '@/components/Input'

// hooks
import useNewComment from './useNewComment'
import { classnames } from '@material-ui/data-grid'
import { PathName } from '@/routes'
import { useSelector } from 'react-redux'

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
  commentForm__isLogin: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  commentLoginUser: {
    alignSelf: 'flex-start',
    marginRight: 22,
    '& .MuiAvatar-root': {
      width: 48,
      height: 48,
      padding: 0,
      marginBottom: 5,
    },
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
  commentInput: {
    flexGrow: 1,
  },
  emailInput: {
    flex: '2 1 200px',
  },
  urlInput: {
    flex: '1 1 150px',
  },
}))

export const NewComment: FC = () => {
  const state = useSelector((state: RootState) => state.postDetail)
  const dispatch = useSelector(() => store.dispatch.postDetail)

  const post = state.post
  const Retrieve = dispatch.RetrievePost

  const classes = useStyles()
  const {
    isLogin,
    userInfo,
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
          </Typography>
        )}
      </Typography>
      <form
        className={classnames(
          classes.commentForm,
          { [classes.commentForm__isLogin]: isLogin },
          'flex flex-column',
        )}
      >
        {isLogin ? (
          <div
            className={classnames(classes.commentLoginUser, 'flex flex-column')}
          >
            <Avatar alt={userInfo.userName} src={userInfo.avatarUrl} />
            <Typography
              align="center"
              color="primary"
              component="span"
              style={{ fontWeight: 600 }}
              variant="body2"
            >
              {userInfo.userName}
            </Typography>
          </div>
        ) : (
          <section className={classes.commentCommenter}>
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
          </section>
        )}

        <NewCommentInput
          className={classes.commentInput}
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
