import User from './User'
import Post from './Post'
import PostComment from './PostComment'
import PostTag from './PostTag'
import PostTagAssociation from './PostTagAssociation'
export { User, Post, PostComment, PostTag, PostTagAssociation }
export default { User, Post, PostComment, PostTag, PostTagAssociation }

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
PostComment.belongsTo(Post, { targetKey: 'id', foreignKey: 'uid' })
Post.hasMany(PostComment, {
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
