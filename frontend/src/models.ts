import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'
import { postDetail } from '@/containers/Home/PostDetail/model'
import { postDetailAdmin } from '@/containers/Admin/PostDetailAdmin/model'
import { momentDetailAdmin } from '@/containers/Admin/MomentDetailAdmin/model'

import { common } from './common-model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  postDetail: typeof postDetail
  postDetailAdmin: typeof postDetailAdmin
  momentDetailAdmin: typeof momentDetailAdmin
  common: typeof common
}

export const models: RootModel = {
  demo,
  postDetail,
  postDetailAdmin,
  momentDetailAdmin,
  common,
}
