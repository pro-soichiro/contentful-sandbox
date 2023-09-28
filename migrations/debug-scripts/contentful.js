const contentful = require("contentful");
require("dotenv").config();

// ===================
// ====== DEBUG ======
// ===================
const config = {
  space: process.env.CTF_SPACE_ID,

  // Delivery API
  // accessToken: process.env.CTF_CDA_ACCESS_TOKEN,

  // Preview API
  accessToken: process.env.CTF_CPA_ACCESS_TOKEN,
  host: "preview.contentful.com",

  // environment: "master",
  // environment: "dev",
  // environment: "master-2023-09-27",
};

async function main() {
  const client = await contentful.createClient(config);
  // const responce = await client.getEntries({content_type: 'posts'})
  const responce = await client.getEntries({
    content_type: "postStackedRichText",
  });

  console.log(responce.items.length);
}

main();
