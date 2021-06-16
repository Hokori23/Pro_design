import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import { Toggle } from './Post'
import User from './User'

class Mail extends Model {
  id!: number | null
  uid!: number
  isSubscribed!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Mail.init(
  {
    id: {
      comment: '自增字段（主键）',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      comment: '发帖用户id',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: 'uid',
      /**
       * < references >
       * @description Sequelize关联模型
       * @example https://www.sequelize.com.cn/core-concepts/assocs
       */
      references: {
        model: User,
        key: 'id',
      },
    },
    isSubscribed: {
      comment: '是否订阅',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: Toggle.N,
    },
  },
  {
    sequelize,
  },
)

export default Mail
