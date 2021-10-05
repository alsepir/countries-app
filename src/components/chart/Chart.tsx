import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { ICountryModel } from '../../store/types';

interface Props {
  title: string;
  data: ICountryModel[];
  height: number | null;
}

export default function Chart({ title, data, height }: Props) {
  const element = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any | null>(null);

  useEffect(() => {
    if (!!element.current) {
      const newChart = echarts.init(element.current);
      setChartInstance(newChart);
    }
  }, [])

  useEffect(() => {
    const tooltipData: { [key: string]: { label: string; value: number } } = {}

    const chartData = data.map((country, index) => {
      const maxToCurrent = data[0].population / country.population
      const maxToMin = data[0].population / data[data.length - 1].population
      const additionalCoefficient = 1.8;
      const paletteCoefficient = 100 / (maxToMin * additionalCoefficient)

      tooltipData[country.cca2] = {
        label: `${country.name.common}`,
        value: country.population,
      }

      return {
        value: (maxToMin * additionalCoefficient - maxToCurrent) * paletteCoefficient,
        name: country.cca2
      }
    })

    const labelLineLengthCoeff = !!height ? Math.min(height / 1000, 1) : 1;

    const option = {
      title: {
        text: `${title[0].toUpperCase()}${title.substring(1)}`,
        left: 'center',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 20,
          fontWeight: 400,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return params.marker + `${tooltipData[params.name].label}: ${tooltipData[params.name].value.toLocaleString('ru-RU')}`;
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 140,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Population',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: chartData.sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: '#A0A0A0',
            fontSize: 10,
            fontWeight: 500,
          },
          labelLine: {
            lineStyle: {
              color: '#A0A0A0',
              width: 0.5,
            },
            length: Math.floor(80 * labelLineLengthCoeff),
            length2: Math.floor(25 * labelLineLengthCoeff)
          },
          itemStyle: {
            color: '#c23531',
          },

          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx: number) {
            return Math.random() * 200;
          }
        }
      ]
    };

    chartInstance && chartInstance.setOption(option);
  }, [title, data, chartInstance, height])

  useEffect(() => {
    chartInstance && chartInstance.resize();
  }, [height, chartInstance])

  useEffect(() => {
    return () => !!chartInstance && chartInstance.dispose()
  }, [chartInstance])

  return (
    <div
      className='pie-chart'
      ref={element}
      style={{
        height: `${height}px`,
        width: `${height}px`
      }}
    />
  )
}
