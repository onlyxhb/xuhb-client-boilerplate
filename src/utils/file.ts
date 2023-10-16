import * as XLSX from 'xlsx'
import { createWorker } from 'tesseract.js'

export const recognizeFile = (fileItem: any) => {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      if (!/\.(jpg|png|jpeg)$/.test(fileItem.name.toLowerCase())) {
        reject(new Error('上传格式不正确，请上传jpg/png/jepg格式的图片'))
        return false
      }
      const worker = createWorker({
        workerPath: new URL('../assets/tesseract/worker.min.js', import.meta.url).href,
        langPath: new URL('../assets/tesseract/', import.meta.url).href,
        corePath: new URL('../assets/tesseract/tesseract-core.wasm.js', import.meta.url).href,
        logger: (m: any) => console.log(m)
      })
      await worker.load()
      await worker.loadLanguage('chi_sim')
      await worker.initialize('chi_sim', 1)
      // eslint-disable-next-line
      await worker.setParameters({ tessedit_pageseg_mode: '6' as any })
      const { data } = await worker.recognize(fileItem)
      resolve(data.text)
    } catch (error) {
      reject(new Error('识别失败，请上传图片后重试...'))
    }
  })
}

/** 将上传的excel表格转换为数组 */
export const getCsvToList = (file: any, maps: any) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        window.Message.error('请上传文件')
        reject()
        return
      }
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        window.Message.error('上传格式不正确，请上传xls或者xlsx格式')
        reject()
        return false
      }
      // 读取表格
      const fileReader = new FileReader()
      fileReader.onload = (ev: any) => {
        const workbook = XLSX.read(ev.target.result, {
          type: 'binary'
        })
        const name = workbook.SheetNames[0]
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[name])
        const list = ws.map((item: any, index: number) => {
          const value: any = { id: index + 1 }
          Object.keys(maps).forEach(map => {
            if (item[map]) {
              value[maps[map]] = item[map]
            }
          })
          return value
        })
        resolve(list)
      }
      fileReader.readAsBinaryString(file.file)
    } catch (error) {
      reject()
      console.log(error)
    }
  })
}

// 解析txt文件
const parseTxtFile = (str: any, maps?: any) => {
  const tip = '编码~~名称~~简码~~税号~~地址电话~~银行账号~~邮件地址~~备注~~身份证校验'
  const idx = str.indexOf(tip)
  const content = str.substring(idx + tip.length)
  const list: any = []
  content.split('\n').map((line: any) => {
    const values = line.split('~~')
    if (values && values[0]) {
      const obj: any = {}
      values.forEach((val: any, key: number) => {
        obj[maps[key]] = val
      })
      list.push(obj)
    }
  })
  return list
}

// 解析xml文件
const parseXmlFile = (str: any, maps?: any) => {
  const content = str.replace('ANSI', 'utf-8').replace('ansi', 'utf-8')
  const xmlDoc = new DOMParser().parseFromString(content, 'text/xml')
  const rows: any = xmlDoc.getElementsByTagName('Row')
  const list: any = []
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index]
    const attrs = row.attributes
    const obj: any = {}
    Object.values(attrs).map((attr: any) => {
      const key = maps[attr.name] || attr.name
      obj[key] = attr.value
    })
    list.push(obj)
  }
  return list
}

/** 将上传的txt客户编码转换为数组 */
export const getListFromFile = (file: any, maps?: any, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        window.Message.error('请上传文件')
        reject()
        return
      }
      if (!/\.(txt|xml)$/.test(file.name.toLowerCase())) {
        window.Message.error('上传格式不正确，请上传txt或者xml格式')
        reject()
        return false
      }
      // 读取表格
      const fileReader = new FileReader()
      fileReader.onload = async (ev: any) => {
        const res = ev.target.result || ''
        // 如果内容出现�则编码方式不对
        if (res.indexOf('�') > -1) {
          reject(new Error('error encoding'))
        }
        if (file.name.endsWith('.txt')) {
          resolve(parseTxtFile(res, maps))
        }
        if (file.name.endsWith('.xml')) {
          resolve(parseXmlFile(res, maps))
        }
        reject()
      }
      fileReader.readAsText(file.file, encoding)
    } catch (error) {
      reject()
      console.log(error)
    }
  })
}
