export const state = () => ({
  list: [],
})

export const mutations = {
  addList (state, list) {
    state.list.push(list)
  },
}

export const getters = {
  getList: state => {
    return state.list
  },
}
