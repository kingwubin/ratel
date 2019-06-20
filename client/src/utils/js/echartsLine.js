export function echartsLine(data) {
  const unit = data.unit ? `{value} ${data.unit}` : '{value}';
  if (data.keyMonitor) {
    // eslint-disable-next-line no-param-reassign
    data.name = data.keyMonitor;
  }
  return {
    title: {
      text: data.name,
      textStyle: {
        color: '#25feff',
        fontFamily: '幼圆',
        fontWeight: 'lighter',
      },
      subtextStyle: {
        color: '#25feff',
        fontFamily: '幼圆',
        fontWeight: 'lighter',
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '17%',
      containLabel: true,
    },
    color: ['#81f483', '#31c9c7', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80'],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.date,
      axisLine: {
        lineStyle: {
          color: '#069DAF',
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#069DAF',
        },
      },
      axisLabel: {
        formatter: unit,
      },
    },
    series: [
      {
        name: data.name,
        type: 'line',
        stack: '总量',
        data: data.data,
      },
    ],
  };
}

export function echartsStyle(width, height) {
  return {
    width,
    height,
  };
}
