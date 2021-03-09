import User from './User'
import Post from './Post'
export { User, Post }
export default { User, Post }

/**
 * Post : User
 * N : 1
 */
Post.belongsTo(User, { targetKey: 'id', foreignKey: 'uid' })
User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'uid',
})
