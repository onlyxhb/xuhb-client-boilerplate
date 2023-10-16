import { ref } from 'vue'

export function useConfig() {
  const config = ref<any>({})
  const modules = import.meta.glob('../../package.json')
  for (const path in modules) {
    modules[path]().then((mod: any) => {
      config.value = Object.assign({}, config.value, mod.default)
    })
  }
  return { config }
}
