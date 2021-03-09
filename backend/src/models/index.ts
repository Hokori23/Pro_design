import User from './User'
import Post from './Post'
import PostComment from './PostComment'
export { User, Post, PostComment }
export default { User, Post, PostComment }

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
