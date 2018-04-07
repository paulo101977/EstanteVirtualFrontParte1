import Vuex from 'vuex'
import Vue from 'vue'
import cep from './modules/cep.js'
import idgen from './modules/idgen'

import { firebaseMutations } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
    mutations:{
      ...firebaseMutations
    },
    modules: {
      mCep: cep,
      mId: idgen
    }
  })


//module.export =
