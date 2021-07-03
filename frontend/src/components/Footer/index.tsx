import {
  Box,
  Typography,
  Link,
  useMediaQuery,
  Divider,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React, { FC, Fragment } from 'react'
import classnames from 'classnames'

// hooks
import useTimer from './useTimer'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  root: {
    display: 'flex',
  },
  footerBox: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignSelf: 'center',
  },
  left: {
    flex: '1 1 50%',
  },
  right: {
    flex: '1 1 50%',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    '& > img': {
      height: '25px',
      padding: '0 5px',
    },
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '0.35em',
  },
}))

interface FooterProps {
  id?: string
  className?: string
}

const Footer: FC<FooterProps> = ({ id, className }) => {
  const state = useSelector((state: RootState) => state.common)
  const classes = useStyles()
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'))

  const blogCreatedAt = state.blogConfig.find(
    (v) => v.module === 'system' && v.key === 'createdAt',
  )?.value

  const blogName = state.blogConfig.find(
    (v) => v.module === 'system' && v.key === 'blogName',
  )?.value

  const { dateText, yearText } = useTimer(Number(blogCreatedAt), blogName)
  return (
    <Box className={classnames(className, classes.rootWrapper)} id={id}>
      <Box className={classes.root}>
        {/* LEFT */}
        <Typography className={classnames(classes.left, classes.footerBox)}>
          <Typography component="span" gutterBottom>
            {`@ ${yearText}`}
          </Typography>
          {dateText && (
            <Typography
              component="span"
              variant={isMobileSize ? 'caption' : 'body1'}
            >{`感谢陪伴 ${dateText}`}</Typography>
          )}
        </Typography>
        {/* RIGHT */}
        <Typography className={classnames(classes.right, classes.footerBox)}>
          <Typography
            component="span"
            gutterBottom
            variant={isMobileSize ? 'caption' : 'body1'}
          >
            由GeekBlog提供支持
          </Typography>
          {!isMobileSize && (
            <Typography component="span" gutterBottom variant="caption">
              <Link
                className={classes.link}
                href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
                target="_blank"
              >
                本站由
                <img src="https://upyun.hokori.online/2021-03-07/upyun.png"></img>
                提供 CDN 加速 / 云存储服务
              </Link>
            </Typography>
          )}
          <Typography component="span" variant="caption">
            互联网ICP备案：
            <Link className={classes.link} href="http://www.beian.gov.cn">
              粤ICP备19141609号
            </Link>
          </Typography>
        </Typography>
      </Box>
      {isMobileSize && (
        <Fragment>
          <Divider className={classes.divider} />
          <Typography variant="caption">
            <Link
              className={classes.link}
              href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
              target="_blank"
            >
              本站由
              <img src="https://upyun.hokori.online/2021-03-07/upyun.png"></img>
              提供 CDN 加速 / 云存储服务
            </Link>
          </Typography>
        </Fragment>
      )}
    </Box>
  )
}

export default Footer
