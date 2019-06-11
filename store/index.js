import moment from '~/plugins/moment'

// export const state = () => ({
//   isLoggedIn: false,
//   user: null
// })

// export const getters = {
//   isLoggedIn: state => state.isLoggedIn,
//   user: state => state.user
// }

// export const mutations = {
//   setUser(state, { user }) {
//     state.user = user
//   },
//   updateUser(state, { user }) {
//     state.user = user
//   },
// }

export const state = () => ({
  list: {},
  user: null
})

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const getters = {
  getList: state => {
    return state.list
  },
  user: state => state.user
}


export const actions = {

  setUser(state, { user }) {
    state.user = user
  },
  updateUser(state, { user }) {
    state.user = user
  },

  async login({ commit }, { id }) {
    if (id.match(/_|@|\./)) {
      throw new TypeError('invalid username')
    }
    const user = await this.$axios.$get(`/users/${id}.json`)
    console.log(user)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },
  async register({ commit }, { id }) {
    const payload = {}
    payload[id] = { id }
    await this.$axios.$patch(`/users.json`, payload)
    const user = await this.$axios.$get(`/users/${id}.json`)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },
  async addLikeLogToUser({ commit }, { user, post }) {
    user.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('updateUser', { user: newUser })
  },
  async removeLikeLogToUser({ commit }, { user, post }) {
    user.likes = post.likes.filter(like => like.user_id !== user.id) || []
    const newUser = await this.$axios.$put(`/users/${user.id}.json`, user)
    commit('updateUser', { user: newUser })
  }
}
