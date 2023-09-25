module.exports = function (migration) {
  const posts = migration.editContentType('posts')

  // 03-transform-richtext-to-richtext.jsで追加したリッチテキストフィールドを削除する
  posts.deleteField('richtextA')
}