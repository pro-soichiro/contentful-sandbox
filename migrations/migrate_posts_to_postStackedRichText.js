module.exports = function (migration) {

  // やりたいこと
  // 1. posts(column)からエントリーを取得する
  // 2. contentフィールドのリッチテキストのデータを取得する
  // 3. 取得したデータを元にpostStackedRichTextを作成する
  // 4. 1で取得したエントリーのcontentBlocksフィールドへアタッチする
  // 5. posts(column)を公開する
  // 6. posts(column)のフィールドからcontentを削除する
  migration.deriveLinkedEntries({
    contentType: 'posts',
    derivedContentType: 'postStackedRichText',
    from: ['slug', 'content'],
    toReferenceField: 'contentBlocks',
    derivedFields: ['name','richText'],
    identityKey: async (from) => {
      return `${from.slug['en-US']}__block1`
    },
    deriveEntryForLocale: async (from, locale) => {
      return {
        name: `${from.slug[locale]}__block1`,
        richText: from.content[locale]
      }
    }
  })
  // 適用後に実行する必要がある
  // const posts = migration.editContentType('posts')
  // posts.deleteField('content')
}

