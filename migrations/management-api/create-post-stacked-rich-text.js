const contentful = require('contentful-management')
require('dotenv').config();

const CTF_ENVIRONMENT = 'dev'

async function createEntriesInBatch(environment, entriesData) {
  const promises = entriesData.map(entryData => {
    return environment.createEntryWithId('postStackedRichText', entryData.slug, {
      fields: {
        name: {
          'en-US': entryData.slug
        },
        richText: {
          'en-US': entryData.content
        }
      }
    })
    .then(entry => entry.publish())
    .then(() => console.log('Entry create and published.'))
    .catch(err => {
      console.error(`Failed to create entry: ${entryData.slug}`, err.message);
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

  const response = await environment.getEntries({content_type: 'posts'});
  const postsData = response.items.map(item => {
    return {
      slug: `${item.fields.slug['en-US']}__block1`,
      content: item.fields.content['en-US']
    };
  });

  const batchSize = 5;
  for (let i = 0; i < postsData.length; i += batchSize) {
    const batch = postsData.slice(i, i + batchSize);
    await createEntriesInBatch(environment, batch);

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
