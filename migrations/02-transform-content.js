module.exports = function (migration) {
  const genderFromAge = (age) => {
    if (age > 20) {
      return 'man'
    }
    return 'woman'
  }

  migration.transformEntries({
    contentType: 'users',
    from: ['age'],
    to: ['gender'],
    transformEntryForLocale: async (from, locale) => {
      return {
        gender: genderFromAge(from.age[locale])
      }
    }
  })
}