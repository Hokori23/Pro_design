import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}
export enum Group {
  SUBSCRIBER = 0,
  ADMIN = 1,
  SUPER_ADMIN = 2,
}
export enum GroupCN {
  SUBSCRIBER = '普通用户',
  ADMIN = '管理员',
  SUPER_ADMIN = '超级管理员',
}

class User extends Model {
  public id!: number | null
  public userAccount!: string
  public userName!: string
  public password?: string
  public gender?: Gender
  public email!: string
  public url?: string
  public avatarUrl?: string
  public profile?: string
  public group?: Group
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户id',
    },
    userAccount: {
      type: DataTypes.STRING(20),
      unique: 'userAccount',
      allowNull: false,
      validate: {
        notNull: {
          msg: '用户账号不能为空',
        },
        notEmpty: {
          msg: '用户账号不能为空',
        },
        len: {
          args: [5, 20],
          msg: '用户账号长度应为5至20字符',
        },
      },
      comment: '用户账号',
    },
    userName: {
      type: DataTypes.STRING(20),
      unique: 'userName',
      allowNull: false,
      validate: {
        notNull: {
          msg: '用户名不能为空',
        },
        notEmpty: {
          msg: '用户名不能为空',
        },
        len: {
          args: [2, 20],
          msg: '用户名长度应为2至20字符',
        },
      },
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: '密码哈希值不能为空',
        },
        notEmpty: {
          msg: '密码哈希值不能为空',
        },
      },
      comment: '用户密码哈希值',
    },
    gender: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: Gender.UNKNOWN,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: {
          msg: '请输入邮箱格式',
        },
        notNull: {
          msg: '邮箱不能为空',
        },
        notEmpty: {
          msg: '邮箱不能为空',
        },
      },
      comment: 'email',
    },
    url: {
      type: DataTypes.STRING(512),
      comment: '个人网站',
    },
    avatarUrl: {
      type: DataTypes.STRING(512),
      comment: '头像图片路径',
    },
    profile: {
      type: DataTypes.STRING(2083),
      comment: '个人简介',
    },
    group: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: Group.SUBSCRIBER,
      allowNull: false,
    },
  },
  {
    sequelize,
  },
)

export default User
