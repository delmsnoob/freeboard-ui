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
      return key
    },

    getPostCount: state => {
      return state.postCount
    }
  },

  mutations: {
    SET_STATE (state, payload) {
      state[payload.name] = payload.data
    }
  },

  actions: {
    async create ({ commit, state }, data) {
      console.log(data, 'data')
      try {
        return await axios.post('/post', data)
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  }
}