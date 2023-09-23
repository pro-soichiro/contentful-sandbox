const contentful = require("contentful-management");

const config = {
  accessToken: process.env.CTF_CMA_ACCESS_TOKEN,
}

module.exports = {
  createManagementClient() {
    console.log(config)
    return contentful.createClient(config);
  },
};