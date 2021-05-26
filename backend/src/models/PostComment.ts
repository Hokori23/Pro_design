import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'
import Post from './Post'
import User from './User'

class PostComment extends Model {
  id!: number
  rootId?: number
  parentId?: number
  pid!: number
  uid!: number
  content!: string
  email!: string
  url?: string
  ip!: string
  userAgent?: string
  likesCount?: number
  dislikesCount?: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export interface PostCommentWithAuthor extends PostComment {
  author?: User
}

PostComment.init(
  {
    id: {
      comment: '评论id',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    rootId: {
      comment: '根评论id',
      type: DataTypes.INTEGER.UNSIGNED,
    },
    parentId: {
      comment: '父评论id',
      type: DataTypes.INTEGER.UNSIGNED,
    },
    pid: {
      comment: '评论所处帖子id',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      /**
       * < references >
       * @description Sequelize关联模型
       * @example https://www.sequelize.com.cn/core-concepts/assocs
       */
      references: {
        model: Post,
        key: 'id',
      },
    },
    uid: {
      comment: '评论用户id, -1 代表未注册用户',
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    content: {
      comment: '评论内容',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      comment: 'email',
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: { msg: '请输入邮箱格式' },
        notNull: { msg: '邮箱不能为空' },
        notEmpty: { msg: '邮箱不能为空' },
      },
    },
    url: {
      comment: '个人网站',
      type: DataTypes.STRING(512),
    },
    ip: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        isIP: { msg: 'IP 格式错误' },
      },
    },
    userAgent: {
      comment: '用户代理',
      type: DataTypes.STRING(200),
    },
    likesCount: {
      comment: '点赞数',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    dislikesCount: {
      comment: '踩',
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
  },
)

export default PostComment
