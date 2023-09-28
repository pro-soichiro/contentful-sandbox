const contentful = require("contentful");

export default () => {
  const config = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CPA_ACCESS_TOKEN,
    host: "preview.contentful.com",
  };

  return contentful.createClient(config);
};
