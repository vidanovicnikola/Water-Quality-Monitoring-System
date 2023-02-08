import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartDataModel } from '../model/chart-data-model';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  getStandardChart(chart: ChartDataModel): Highcharts.Options {
    return {
      series: [
        {
          type: 'area',
          name: chart.titile,
          data: chart.data,
        },
      ],
      chart: {
        zoomType: 'x',
      },
      title: {
        text: chart.titile,
      },
      xAxis: {
        type: 'datetime',
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    } as Highcharts.Options;
  }

  getBulletChartOptions(
    value: number,
    min: number,
    max: number,
    chartName: string
  ): Highcharts.Options {
    return {
      chart: {
        inverted: true,
        type: 'bullet',
      },
      title: null,
      plotOptions: {
        series: {
          pointPadding: 0.25,
          borderWidth: 0,
          color: '#000',
          targetOptions: {
            width: '200%',
          },
        },
      },
      xAxis: {
        categories: [`<span class="hc-cat-title">${chartName}</span><br/>`],
      },
      yAxis: {
        plotBands: [
          {
            from: 0,
            to: min,
            color: '#666',
          },
          {
            from: min,
            to: min + (max - min) * 0.5,
            color: '#999',
          },
          {
            from: min + (max - min) * 0.5,
            to: max,
            color: '#bbb',
          },
        ],
        title: null,
      },
      series: [
        {
          data: [
            {
              y: value,
            },
          ],
        },
      ],
      legend: { enabled: false },
    } as unknown as Highcharts.Options;
  }

  getSpeedGaugeChartOptions(
    value: number,
    min: number,
    max: number,
    chartName: string,
    unit: string
  ): Highcharts.Options {
    return {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '70%',
      },

      title: {
        text: chartName,
      },

      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '100%',
      },

      yAxis: {
        min: min,
        max: max,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: '#FFFFFF',
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: '14px',
          },
        },
        plotBands: [
          {
            from: min,
            to: min + (max - min) * 0.6,
            color: '#55BF3B', // green
            thickness: 20,
          },
          {
            from: min + (max - min) * 0.6,
            to: min + (max - min) * 0.8,
            color: '#DDDF0D',
            thickness: 20,
          },
          {
            from: min + (max - min) * 0.8,
            to: max,
            color: '#DF5353',
            thickness: 20,
          },
        ],
      },

      series: [
        {
          name: chartName,
          data: [value],
          tooltip: {
            valueSuffix: unit,
          },
          dataLabels: {
            format: '{y} ' + unit,
            borderWidth: 0,
            color:
              (Highcharts.defaultOptions.title &&
                Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              '#333333',
            style: {
              fontSize: '16px',
            },
          },
          dial: {
            radius: '80%',
            backgroundColor: 'gray',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%',
          },
          pivot: {
            backgroundColor: 'gray',
            radius: 6,
          },
        },
      ],
    } as unknown as Highcharts.Options;
  }

  getSolidGaugeOptions(
    value: number,
    min: number,
    max: number,
    chartName: string,
    unit: string
  ): Highcharts.Options {
    return {
      chart: {
        type: 'solidgauge',
        height: '64%',
      },
      title: chartName,
      pane: {
        center: ['50%', '85%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      exporting: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      // the value axis
      yAxis: {
        stops: [
          [0.1 * max, '#55BF3B'],
          [0.5 * max, '#DDDF0D'],
          [0.9 * max, '#DF5353'],
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70,
          text: chartName,
        },
        labels: {
          y: 16,
        },
        min: min,
        max: max,
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      series: [
        {
          name: chartName,
          data: [value],
          dataLabels: {
            format:
              `<div style="text-align:center">` +
              `<span style="font-size:25px">{y}</span><br/>` +
              `<span style="font-size:12px;opacity:0.4">${unit}</span>` +
              `</div>`,
          },
        },
      ],
    } as unknown as Highcharts.Options;
  }

  getColumnChartOptions(
    chartData: ChartData[],
    title: string,
    unit: string
  ): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: chartData.map((x) => x.label),
      },
      yAxis: {
        title: {
          text: unit,
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: undefined,
          data: chartData.map((x) => x.value),
        },
      ],
      legend: { enabled: false },
    } as unknown as Highcharts.Options;
  }
}

export interface ChartData {
  label: string;
  value: number;
}
