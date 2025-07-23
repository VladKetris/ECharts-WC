import React, { useEffect, useRef } from 'react';

import './EChartsWC';
import { EChartsElement } from '../types/types';

interface EChartsWCProps {
  options: echarts.EChartsOption;
  theme?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  onChartReady?: (chart: echarts.ECharts) => void;
}

const EChartsWC: React.FC<EChartsWCProps> = ({
  options,
  theme = 'dark',
  loading = false,
  style = { width: '100%', height: '400px' },
  onChartReady
}) => {
  const chartRef = useRef<EChartsElement>(null);

  useEffect(() => {
    if (chartRef.current && onChartReady) {
      chartRef.current.onChartReady = onChartReady;
    }
  }, [onChartReady]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setAttribute('options', JSON.stringify(options));
    }
  }, [options]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setAttribute('loading', loading.toString());
    }
  }, [loading]);

  return (
    <echarts-wc
      ref={chartRef}
      style={style}
      theme={theme}
    />
  );
};

export default EChartsWC;