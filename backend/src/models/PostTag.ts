import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'

class PostTag extends Model {
  id!: number | null
  name!: string
  description?: string
  slug!: string
  iconClass?: string
  iconColor?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PostTag.init(
  {
    id: {
      comment: '标签id',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      comment: '标签名',
      unique: 'name',
      type: DataTypes.STRING(25),
    },
    description: {
      comment: '标签简述',
      type: DataTypes.STRING(2083),
    },
    slug: {
      comment: '标签路由uri',
      unique: 'slug',
      type: DataTypes.STRING(50),
    },
    iconClass: {
      comment: '图标icon class',
      type: DataTypes.STRING(100),
    },
    iconColor: {
      comment: '图标颜色: { 16位进值 | rgb | rgba } 帖子类型',
      unique: 'slug',
      type: DataTypes.STRING(50),
    },
  },
  {
    sequelize,
  },
)

export default PostTag
