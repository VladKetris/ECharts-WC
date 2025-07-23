import type { ECharts, EChartsType } from 'echarts';

export interface EChartsElement extends HTMLElement {
  options: string;
  theme: string;
  loading: string;
  getChartInstance(): ECharts | null;
  onChartReady?: (chart: EChartsType) => void;
}

export interface Option {
  label: string;
  value: string | number;
}

export type Nullable<T> = T | null;
