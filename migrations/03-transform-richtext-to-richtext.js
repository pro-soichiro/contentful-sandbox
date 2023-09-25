module.exports = function (migration) {
  const posts = migration.editContentType('posts');

  // 新しいリッチテキスト用フィールドの作成
  posts.createField('richtextA')
    .name('RichtextA')
    .type('RichText');


  // データの移行
  migration.transformEntries({
    contentType: 'posts',
    from: ['content'],
    to: ['richtextA'],
    transformEntryForLocale: async function(fromFields) {
      return {
        richtextA: fromFields.content['en-US']
      };
    }
  });
}