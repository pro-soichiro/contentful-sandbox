const contentful = require('contentful-management')
require('dotenv').config();

const CTF_ENVIRONMENT = 'dev'
// const CTF_ENVIRONMENT = 'master'

async function unpublishEntriesInBatch(environment, entriesIds) {
  const promises = entriesIds.map(entryId => {
    return environment.getEntry(entryId)
    .then((entry) => entry.unpublish())
    .then(() => console.log('Entry unpublish.'))
    .catch(err => {
      console.error(`Failed to unpublish entry: ${entryId}`, err);
    });
  });

  return Promise.all(promises);
}

async function main() {
  const client = contentful.createClient({
    accessToken: process.env.CTF_CMA_ACCESS_TOKEN
  })
  const space = await client.getSpace(process.env.CTF_SPACE_ID);
  const environment = await space.getEnvironment(CTF_ENVIRONMENT);

  const response = await environment.getEntries({content_type: 'postStackedRichText'});
  const postsData = response.items.map(item => item.sys.id).filter(id => id.endsWith('__block1'));

  const batchSize = 5;
  for (let i = 0; i < postsData.length; i += batchSize) {
    const batch = postsData.slice(i, i + batchSize);
    await unpublishEntriesInBatch(environment, batch);

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
