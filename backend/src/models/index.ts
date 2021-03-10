import User from './User'
import Post from './Post'
import PostComment from './PostComment'
import PostTag from './PostTag'
import PostTagAssociation from './PostTagAssociation'
import Mail from './Mail'
import Setting from './Setting'

export { User, Post, PostComment, PostTag, PostTagAssociation, Mail, Setting }
export default {
  User,
  Post,
  PostComment,
  PostTag,
  PostTagAssociation,
  Mail,
  Setting,
}

/**
 * Post : User
 * N : 1
 */
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'uid' })
User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'uid',
})

/**
 * PostComment : Post
 * N : 1
 */
PostComment.belongsTo(Post, { targetKey: 'id', foreignKey: 'pid' })
Post.hasMany(PostComment, {
  sourceKey: 'id',
  foreignKey: 'pid',
})

/**
 * Post : PostTag
 * N : N
 * @description 通过中间表建立关系
 */
Post.belongsToMany(PostTag, {
  through: PostTagAssociation,
  as: 'Tags',
  foreignKey: 'pid',
  otherKey: 'tid',
})
PostTag.belongsToMany(Post, {
  through: PostTagAssociation,
  as: 'Posts',
  foreignKey: 'tid',
  otherKey: 'pid',
})

/**
 * Mail : User
 * 1 : 1
 */
Mail.belongsTo(User, { targetKey: 'id', foreignKey: 'uid' })
User.hasOne(Mail, { sourceKey: 'id', foreignKey: 'uid' })
