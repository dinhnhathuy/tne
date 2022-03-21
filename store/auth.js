export const state = () => ({
  isLoggedIn: false,
  user: {},
})

export const actions = {

}

export const mutations = {
  USER(state, payload) {
    state.isLoggedIn = !!payload
    state.user = payload || {}
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  user: state => state.user,
}
