import * as echarts from 'echarts';

import EChartsWC from './components/Chart';
import './App.css'
import ChartCard from './components/ChartCard';
import { CHART_OPTIONS, CHART_TYPE_OPTIONS, THEMES } from './constants/global';
import { ChangeEvent, useState } from 'react';

function App() {
  const [chartType, setChartType] = useState(0);
  const [theme, setTheme] = useState(THEMES.DARK);
  const [isLoading, setLoading] = useState(false);

  const handleTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
      setChartType(+e.target.value);
    });
    setLoading(false);
  };  

  const toggleTheme = () => setTheme((prevState) => prevState === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);

  return (
    <div className="card">
      <ChartCard
        options={CHART_TYPE_OPTIONS}
        selectedOption={chartType}
        onChange={handleTypeChange}
        toggleTheme={toggleTheme}
      >
        <EChartsWC
          options={CHART_OPTIONS[chartType] as echarts.EChartsOption} 
          style={{ width: '800px', height: '600px' }}
          theme={theme}
          loading={isLoading}
        />
      </ChartCard>
    </div>
  );
};

export default App;
