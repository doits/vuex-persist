/**
 * Created by championswimmer on 23/07/17.
 */

import { assert, expect, should } from 'chai'
import Vue from 'vue'
import { Store } from 'vuex'
import Vuex from 'vuex'
import VuexPersistence from '..'

Vue.use(Vuex)
const vuexPersist = new VuexPersistence({
  modules: ['dog']
})

const store = new Store<any>({
  state: {
    dog: {
      barks: 0
    },
    cat: {
      mews: 0
    }
  },
  mutations: {
    dogBark(state) {
      state.dog.barks++
    },
    catMew(state) {
      state.cat.mews++
    }
  },
  plugins: [vuexPersist.plugin]
})
const getSavedStore = () => JSON.parse((vuexPersist.storage as any).getItem('vuex') as string)

describe('Storage: MockStorage, Test: modules', () => {
  it('should persist specified module', () => {
    store.commit('dogBark')
    expect(getSavedStore().dog.barks).to.equal(1)
  })
  it('should not persist unspecified module', () => {
    store.commit('catMew')
    expect(getSavedStore().cat).to.be.undefined
  })
})

describe('storageConstructorName', () => {
  it('should handle undefined storage', () => {
    expect(vuexPersist.storageConstructorName(undefined as any)).to.equal("")
  })
  it('should handle undefiend storage.constructor', () => {
    expect(vuexPersist.storageConstructorName({ constructor: undefined } as any)).to.equal("")
  })
  it('should handle undefined storage.constructor.name', () => {
    expect(vuexPersist.storageConstructorName({ constructor: { name: undefined } } as any)).to.equal("")
  })
  it('should get storage constructor name', () => {
    expect(vuexPersist.storageConstructorName({ constructor: { name: "a-valid-name" } } as any)).to.equal("a-valid-name")
  })
  it('should lowercase name', () => {
    expect(vuexPersist.storageConstructorName({ constructor: { name: "A-Valid-NAME" } } as any)).to.equal("a-valid-name")
  })
})
