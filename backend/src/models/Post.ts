import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import User from './User'
import PostComment from './PostComment'

/**
 * @description 添加字段同时要更改相应字段的validate属性
 * @example
 * validate: {
 *   min: PostType.POST,
 *   max: PostType.PAGE,
 * },
 */
export enum PostType {
  POST = 0,
  LANDSCAPE = 1,
  MOMENT = 2,
  PAGE = 3, // TODO: 自定义页面
}
export enum Toggle {
  N = 0,
  Y = 1,
}
class Post extends Model {
  id!: number | null
  uid!: number
  title?: string
  coverUrl?: string
  content!: string
  type?: PostType
  draftContent?: string
  isDraft?: Toggle
  isHidden?: Toggle
  isLocked?: Toggle
  priority?: number

  postComments?: PostComment[]

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Post.init(
  {
    id: {
      comment: '帖子id',
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
    title: {
      comment: '帖子标题',
      type: DataTypes.STRING(50),
    },
    coverUrl: {
      comment: '封面图片路径',
      type: DataTypes.STRING(2083),
    },
    content: {
      comment: '帖子内容',
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: '帖子内容不能为空' },
        notEmpty: { msg: '帖子内容不能为空' },
      },
    },
    type: {
      comment: '帖子类型',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: PostType.POST,
      validate: {
        min: PostType.POST,
        max: PostType.PAGE,
      },
    },
    draftContent: {
      comment: '草稿内容',
      type: DataTypes.TEXT,
    },
    isDraft: {
      comment: '是否为草稿',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: Toggle.N,
    },
    isHidden: {
      comment: '是否隐藏',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: Toggle.N,
    },
    isLocked: {
      comment: '是否封锁评论区',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: Toggle.N,
    },
    priority: {
      comment: '置顶优先级',
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
  },
)

export default Post
