const state = {
  products: [],
  new_product: {
    title: '',
    price: 0.0,
    description: '',
    subject_id: null
  }
}

const getters = {
  products(state) {
    return state.products
  },
  new_product(state) {
    return state.new_product
  }
}

const actions = {
  fetchUserProducts({ commit }, teacher) {
    return new Promise((resolve, reject) => {
      this._vm.$http.plain.get(`/users/${teacher.id}/products`).then(
        ({ data }) => {
          commit('setProducts', data)
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  async createProduct({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .post(`products`, {
          product: params
        })
        .then(
          ({ data }) => {
            commit('setProduct', data)
            dispatch('createAlert', ['Product created.', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async updateProduct({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled
        .put(`products`, params.id, {
          product: params
        })
        .then(
          ({ data }) => {
            commit('setProduct', data)
            dispatch('createAlert', ['Product updated', 'success'])
            resolve(data)
          },
          (error) => {
            reject(error)
          }
        )
    })
  },
  async destroyProduct({ commit, dispatch }, productId) {
    return new Promise((resolve, reject) => {
      this._vm.$http.roled.delete(`products`, productId).then(
        ({ data }) => {
          commit('removeProduct', productId)
          dispatch('createAlert', ['Product deleted', 'success'])
          resolve(data)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
}

const mutations = {
  setProducts(state, products) {
    state.users = products
  },
  setProduct(state, product) {
    let idx = state.products.findIndex((s) => s.id === product.id)
    state.products.splice(idx, 1, product)
  },
  addProduct(state, product) {
    state.products.push(product || { ...state.new_product })
  },
  removeProduct(state, productId) {
    state.products = state.products.filter((s) => s.id !== productId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
