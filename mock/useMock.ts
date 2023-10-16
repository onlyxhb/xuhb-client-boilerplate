import fs from 'fs'

// 默认配置
const defaultConfig = { dir: '/mock', pattern: '/mock', delay: [0, 100] }

/**
 * 延迟时间
 * @param time - 延迟时间
 */
const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))

/**
 * 随机生成最大最小之间的值
 * @param min - 最小值
 * @param max - 最大值
 */
const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

/**
 * 找到真实的文件类型和路径
 * @param dir - 不带后缀的文件路径
 */
const findPath = (dir: string) => {
  if (fs.existsSync(`${dir}.js`)) {
    return { url: `${dir}.js`, type: 'js' }
  }
  if (fs.existsSync(`${dir}.json`)) {
    return { url: `${dir}.json`, type: 'json' }
  }
  if (fs.existsSync(`${dir}/index.js`)) {
    return { url: `${dir}/index.js`, type: 'js' }
  }
  if (fs.existsSync(`${dir}/index.json`)) {
    return { url: `${dir}/index.json`, type: 'json' }
  }
  return false
}

/**
 * 读取文件内容
 */
const getFileContent = (dir: string) => {
  try {
    if (require.cache) {
      // 删除缓存
      delete require.cache[dir]
      // eslint-disable-next-line
      return require(dir)
    }
    const content = fs.readFileSync(dir, { encoding: 'utf-8' })
  
    return JSON.parse(content)
  } catch (error) {
    return { error }
  }
}

const useMiddleWare = (opts = {}) => {
  const options = { ...defaultConfig, ...opts }

  const pattern = new RegExp(`^${options.pattern}(.+)`)
  // eslint-disable-next-line
  const dir = process.cwd() + options.dir
  const minDelayTime = options.delay[0] || 0
  const maxDelayTime = options.delay[1] || 0

  return async function (req: any, res: any, next: any) {
    // 请求路径为空
    if (!req || !req.url) {
      return next()
    }
    // 检查是否符合mock请求
    const match = pattern.exec(req.url)

    if (!match) {
      return next()
    }

    const [mockpath] = match[1].split('?')

    // 真实mock文件地址
    const mock = findPath(dir + mockpath)

    if (mock) {

      let data = {}

      let mocker: any = {}

      let delayTime = getRandom(minDelayTime, maxDelayTime)

      if (mock.type === 'json') {
        data = getFileContent(mock.url)
      } else {
        mocker = getFileContent(mock.url)
        delayTime = mocker.delay ? mocker.delay : delayTime
        data = await mocker(req)
      }

      await delay(delayTime)
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify(data))
    } else {
      res.setHeader('Content-Type', 'application/json;charset=utf-8')
      res.end(JSON.stringify({ success: false, code: '0000000', desc: '无mock文件', data: null }))
    }
  }
}

const MockPlugin: any = (opts = {}) => {
  return {
    name: 'use-local-mock',
    configureServer(server: any) {
      server.middlewares.use(useMiddleWare(opts))
    }
  }
}

export default MockPlugin
