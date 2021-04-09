import { PathName } from '@/routes'
import { store, RootState } from '@/store'
import { Button } from '@material-ui/core'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'

const Home: FC<RouteComponentProps> = ({ history }) => {
  const state = useSelector((state: RootState) => state.common)
  const dispatch = useSelector(() => store.dispatch.common)
  if (!state.isLogin) {
    return <Redirect to={PathName.LOGIN} />
  }
  return (
    <div>
      Home
      <Button
        color="primary"
        onClick={() => dispatch.LOGOUT()}
        variant="contained"
      >
        登出
      </Button>
    </div>
  )
}
export default Home
