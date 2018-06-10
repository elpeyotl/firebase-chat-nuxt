import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            user: ''
        },
        mutations: {
            setUser(state, payload) {
                state.user = payload
            }
        }
    })
}

export default createStore