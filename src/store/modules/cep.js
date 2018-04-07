
//{`${data.logradouro}, ${data.localidade} - ${data.cep}`}

import { firebaseMutations, firebaseAction  } from 'vuexfire'

const updateData = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, data ) => {

  //bind data 
  bindFirebaseRef('data', data)
})

export default {
  state: {
    data: []
  },
  mutations: {

  },
  actions: {
    updateData
  },
  getters: {
    items (state, getter, rootState){
      return state.data;
    }
  }
}
