import {ChangeEvent, PropsWithChildren } from 'react';
import { Option } from '../types/types';

interface ChartCardProps {
  options: Option[];
  selectedOption: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  toggleTheme: () => void;
}

const ChartCard = ({ options, children, onChange, selectedOption, toggleTheme }: PropsWithChildren<ChartCardProps>) => {  
  return (
    <div className="chart-card">
      <div className="actions">
        <div className="selector">
          <label htmlFor="chart-type">Chart type:</label>
          <select
            id="chart-type"
            value={selectedOption}
            onChange={onChange}
          >
            {(options ?? []).map((el) => (
              <option key={el.value} value={el.value}>{el.label}</option>
            ))}
          </select>
        </div>
        <button onClick={toggleTheme}>Toggle theme</button>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;