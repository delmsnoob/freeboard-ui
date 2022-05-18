import axios from 'axios'

export default {
  namespaced: true,

  state: {
    posts: [],
    postCount: 0
  },

  getter: {
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
  },

  mutations: {
    SET_STATE (state, payload) {
      state[payload.name] = payload.data
    },

    SET_COUNT (state, count) {
      state.count = count
    }
  },

  actions: {
    async create ({ commit }, posts) {
      await axios.post('/posts', posts)
      console.log(posts, 'posts')
    }
  }
}