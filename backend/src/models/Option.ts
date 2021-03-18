import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
export interface OptionAttribute {
  module: string
  key: string
  value?: string
}
class Option extends Model {
  module!: string
  key!: string
  value!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Option.init(
  {
    module: {
      comment: '设置模块名',
      type: DataTypes.STRING(32),
      primaryKey: true,
    },
    key: {
      comment: '设置key值',
      type: DataTypes.STRING(32),
      primaryKey: true,
    },
    value: {
      comment: '设置value值',
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
  },
)

export default Option
