
// 封装一个柱状图组件

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

// 1 功能代码复制
// 2 可变部分抽象为prop参数

const BarChart = ( {title} ) => {
  const chatRef = useRef(null)
  useEffect(() => {
    // 保证dom可用之后才进行图表渲染，因为图表需要获取一个dom节点

    // 1 获取要渲染图表的dom节点
    const chartDom = chatRef.current
    // 2 初始化图表，生成一个实例
    const myChart = echarts.init(chartDom)

    // 3 准备图表参数
    const option = {
      title: {
        text: title
      },

      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    };

    // 4 setOption使用图表参数，完成图表渲染
    option && myChart.setOption(option)

  }, [])
  return <div ref={chatRef} style={{width:'500px', height:'400px'}}></div>
}

export default BarChart