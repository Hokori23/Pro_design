import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { postDetail } from '@/containers/Home/PostDetail/model'

import { common } from './common-model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  postDetail: typeof postDetail
  common: typeof common
}

export const models: RootModel = {
  demo,
  postDetail,
  common,
}
