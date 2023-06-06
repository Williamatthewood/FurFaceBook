const User = require('./User');
const Post = require('./Post');
const Event = require('./Event');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Event };