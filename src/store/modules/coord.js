
//{`${data.logradouro}, ${data.localidade} - ${data.cep}`}

import { firebaseMutations, firebaseAction  } from 'vuexfire'

const updateCoords = firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, coords ) => {

  //bind data
  bindFirebaseRef('data', data)
})

export default {
  state: {
    hasCoordinates: false
  },
  mutations: {
    setCoords (state, hasCoordinates) {
      state.hasCoordinates = hasCoordinates
    }
  },
  actions: {
    hasCoordinatesChanged(context, hasCoordinates){

      console.log('hasCoordinates changed', hasCoordinates)

      context.commit('setCoords', hasCoordinates)
    }
  },
  getters: {
    hasCoordinates (state, getters, rootState) {
      return state.hasCoordinates
    }
  }
}
