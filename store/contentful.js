import createClient from "~/plugins/contentful.js";
const client = createClient();

// import { createManagementClient } from "~/plugins/contentful-management.js";
// const managementClient = createManagementClient();


export const state = () => ({
  entries: [],
  entry: null,
  user: null,
  post: null,
  tag: null,
});

export const mutations = {
  SET_ENTRIES(state, entries) {
    state.entries = entries;
  },
  SET_ENTRY(state, entry) {
    state.entry = entry;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_POST(state, post) {
    state.post = post;
  },
  SET_TAG(state, tag) {
    state.tag = tag;
  },
};

export const actions = {
  async fetchEntries({ commit }, contentTypeId) {
    const response = await client.getEntries({
      content_type: contentTypeId,
    });
    if (response.items.length > 0) {
      commit("SET_ENTRIES", response.items);
    }
  },
  async fetchEntry({ commit }, payload) {
    const response = await client.getEntry(payload.entryId);
    commit("SET_ENTRY", response);
  },
  async fetchUser({ commit }, id) {
    try {
      const response = await client.getEntries({
        content_type: "users",
        "fields.id": id,
      });
      if (response.items.length > 0) {
        commit("SET_USER", response.items[0].fields);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async fetchPost({ commit }, slug) {
    try {
      const response = await client.getEntries({
        content_type: "posts",
        "fields.slug": slug,
      });
      if (response.items.length > 0) {
        commit("SET_POST", response.items[0].fields);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async fetchTag({ commit }, url) {
    try {
      const response = await client.getEntries({
        content_type: "postsTag",
        "fields.url": url,
      });
      if (response.items.length > 0) {
        commit("SET_TAG", response.items[0].fields);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async updateUser({ commit }, user) {
    const response = await client.getEntries({
      content_type: "users",
      "fields.id": user.id,
    });
    if (response.items.length > 0) {
      const entryId = response.items[0].sys.id

      // managementClient
      //   .getSpace("ceccmyla1s68")
      //   .then((space) => space.getEnvironment("master"))
      //   .then((environment) => environment.getEntry(entryId))
      //   .then((entry) => {
      //     entry.fields.name["en-US"] = user.name;
      //     entry.fields.id["en-US"] = Number(user.id);
      //     entry.fields.age["en-US"] = Number(user.age);
      //     return entry.update();
      //   })
      //   .then((entry) => {
      //     commit("SET_USER", {
      //       id: entry.fields.id["en-US"],
      //       age: entry.fields.age["en-US"],
      //       name: entry.fields.name["en-US"],
      //     });
      //   })
      //   .catch(console.error);
    }
  },
};
