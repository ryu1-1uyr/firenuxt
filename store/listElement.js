export const state = () => ({
  list: [],
})

export const mutations = {
  // setList: (state, list) => {
  //   state.list = list
  // },
  addList (state, list) {
    state.list.push(list)
  },
}

export const getters = {
  getList: state => {
    return state.list
  },
}
