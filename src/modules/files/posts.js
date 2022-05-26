import axios from 'axios'

export default {
  namespaced: true,

  state: {
    postList: [],
    postCount: 0
  },

  /* getter: {
    getPostList: state => {
      const key = []

      state.posts.forEach(e => {
        key.push({
          author_id: e.author_id,
          author_name: e.author_name,
          author_email: e.author_email,
          created_at: e.created_at
        })
      })
      key
    },

    getPostCount: state => {
      return state.postCount
    }
  }, */

  mutations: {
    SET_STATE (state, payload) {
      state[payload.name] = payload.data
    },

    SET_COUNT (state, count) {
      state.count = count
    }
  },

  actions: {
    async create ({ commit }, data) {
      try {
        return await axios.post('/posts', data)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    /* async fetchPosts ({ commit }, posts) {
      await axios.get('/posts', posts)
    } */
  }
}