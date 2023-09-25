module.exports = function (migration) {
  const users = migration.editContentType('users');
  users.createField('gender')
    .name('Gender')
    .type('Symbol');
}
