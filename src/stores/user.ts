import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      loading: true,
      isClient: true,
      avatar: '',
      name: '',
      certification: '',
      accountId: '',
      phone: '',
      registrationDate: ''
    }
  },
  getters: {
    isWeb: state => !state.isClient
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage
      }
    ]
  }
})
