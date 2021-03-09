import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import PostTag from './PostTag'
import Post from './Post'

class PostTagAssociation extends Model {
  id!: number
  pid!: number
  tid!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PostTagAssociation.init(
  {
    id: {
      comment: '自增字段（主键）',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    pid: {
      comment: '帖子id',
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Post,
        key: 'id',
      },
    },
    tid: {
      comment: '帖子标签id',
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: PostTag,
        key: 'id',
      },
    },
  },
  {
    sequelize,
  },
)

export default PostTagAssociation
