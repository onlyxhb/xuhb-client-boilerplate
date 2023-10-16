import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

const driver = new Driver({
  stageBackground: 'transparent',
  doneBtnText: '完成',
  closeBtnText: '关闭',
  nextBtnText: '下一步',
  prevBtnText: '上一步'
})

driver.defineSteps([
  {
    element: '#home-tour-one',
    popover: {
      title: '在线文档(1/8)',
      description: '查看更加详细的图文教程和视频教程，祝您使用愉快，不明白的地方欢迎联系我们！',
      position: 'left'
    }
  },
  {
    element: '#home-tour-two',
    popover: {
      title: '下载模板(2/8)',
      description: '首次使用需请下载模板',
      position: 'right'
    }
  },
  {
    element: '#home-tour-three',
    popover: {
      title: '导入销货清单(3/8)',
      description: '编辑模板里开票信息明细内容导入',
      position: 'right'
    }
  },
  {
    element: '#home-tour-four',
    popover: {
      title: '自动赋码(4/8)',
      description: '无需在税控盘添加编码，直接点击自动赋码',
      position: 'left'
    }
  },
  {
    element: '#home-tour-five',
    popover: {
      title: '购货方信息(5/8)',
      description: '航信可以不输入，百旺和UKEY版必须输入',
      position: 'bottom'
    }
  },
  {
    element: '#home-tour-six',
    popover: {
      title: '开票设置(6/8)',
      description: '设置发票限额，开票人信息和设置生成纸质或者电子发票',
      position: 'bottom'
    }
  },
  {
    element: '#home-tour-seven',
    popover: {
      title: '金额，税额信息(7/8)',
      description: '查看导入的清单自动计算的总金额和总税额信息',
      position: 'bottom'
    }
  },
  {
    element: '#home-tour-eight',
    popover: {
      title: '备注(8/8)',
      description: '支持输入备注信息',
      position: 'bottom'
    }
  }
])

// driver.start()
