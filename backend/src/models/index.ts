import User from './User'
import Post from './Post'
import PostComment from './PostComment'
import PostTag from './PostTag'
import PostTagAssociation from './PostTagAssociation'
import Mail from './Mail'
import MailCaptcha from './MailCaptcha'
import Option from './Option'

export {
  User,
  Post,
  PostComment,
  PostTag,
  PostTagAssociation,
  Mail,
  Option,
  MailCaptcha,
}

/**
 * Post : User
 * N : 1
 */
Post.belongsTo(User, { as: 'author', targetKey: 'id', foreignKey: 'uid' })
User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'uid',
})

/**
 * PostComment : Post
 * N : 1
 */
PostComment.belongsTo(Post, {
  as: 'post',
  targetKey: 'id',
  foreignKey: 'pid',
  onDelete: 'CASCADE',
})
Post.hasMany(PostComment, {
  as: 'postComments',
  sourceKey: 'id',
  foreignKey: 'pid',
})

/**
 * PostComment : User
 * N : 1
 */
PostComment.belongsTo(User, {
  as: 'author',
  targetKey: 'id',
  foreignKey: 'uid',
})
User.hasMany(PostComment, {
  as: 'postComments',
  sourceKey: 'id',
  foreignKey: 'uid',
})

/**
 * Post : PostTag
 * N : N
 * @description 通过中间表建立关系
 */
Post.belongsToMany(PostTag, {
  through: PostTagAssociation,
  as: 'tags',
  foreignKey: 'pid',
  otherKey: 'tid',
  onDelete: 'CASCADE',
})
PostTag.belongsToMany(Post, {
  through: PostTagAssociation,
  as: 'posts',
  foreignKey: 'tid',
  otherKey: 'pid',
  onDelete: 'CASCADE',
})
Post.hasMany(PostTagAssociation, {
  as: 'association',
  sourceKey: 'id',
  foreignKey: 'pid',
})
PostTag.hasMany(PostTagAssociation, {
  as: 'association',
  sourceKey: 'id',
  foreignKey: 'tid',
})
/**
 * Mail : User
 * 1 : 1
 */
Mail.belongsTo(User, {
  as: 'mail',
  targetKey: 'id',
  foreignKey: 'uid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
User.hasOne(Mail, {
  as: 'mail',
  sourceKey: 'id',
  foreignKey: 'uid',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
