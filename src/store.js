import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [{
      id: 0,
      title: 'One',
      complete: false
    }]
  },
  mutations: {
    add (state, text) {
      const newItem = {
        id: Math.random(),
        title: text,
        complete: false
      }
      state.todos.push(newItem)
    },
    remove (state, item) {
      state.todos = state.todos.filter(element => element.id !== item.id)
    },
    update (state, item) {
      const index = state.todos.findIndex(element => element.id === item.id)
      state.todos.splice(index, 1, item)
    }
  },
  actions: {
    add ({commit, state}, newText) {
      commit('add', newText)
    },
    remove ({commit, state}, item) {
      if (item.status) {
        commit('remove', item)
      } else {
        item.status = 'archived'
        commit('update', item)
      }
    },
    update ({commit, state}, item) {
      item.complete = !item.complete
      commit('update', item)
    }
  }
})
