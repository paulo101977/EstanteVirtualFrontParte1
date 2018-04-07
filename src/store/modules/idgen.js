
//{`${data.logradouro}, ${data.localidade} - ${data.cep}`}


export default {
  state: {
    id: null
  },
  mutations: {
    generateNew (state) {
      state.id = Math.random().toString(36).substring(7);
    },
    set (state, id){
      state.id = id;
    }
  },
  actions: {
    newId (context) {
      context.commit('generateNew')
    },
    setId(context, id){
      console.log('setId' , id)

      context.commit('set', id)
    }
  },
  getters: {
    generatedId (state, getters, rootState) {
      return state.id ? state.id :  Math.random().toString(36).substring(7)
    }
  }
}
