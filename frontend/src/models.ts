import { Models } from '@rematch/core'
import { demo } from '@/containers/Demo/model'

import { common } from './common-model'

export interface RootModel extends Models<RootModel> {
  demo: typeof demo
  common: typeof common
}

export const models: RootModel = {
  demo,
  common,
}
