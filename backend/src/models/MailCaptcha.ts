import { DataTypes, Model } from 'sequelize'
import sequelize from 'database'

class MailCaptcha extends Model {
  id!: number | null
  email!: string
  captcha!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

MailCaptcha.init(
  {
    id: {
      comment: '自增字段（主键）',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      comment: '欲验证邮箱',
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    captcha: {
      comment: '邮箱验证码',
      type: DataTypes.STRING(8),
      allowNull: false,
    },
  },
  {
    sequelize,
  },
)

export default MailCaptcha
