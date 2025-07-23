import React from 'react';
import * as echarts from 'echarts';
import { CHART_THEMES } from '../constants/global';
import { Nullable } from '../types/types';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'echarts-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        options?: string;
        theme?: string;
        loading?: string | boolean;
      };
    }
  }
}

Object.entries(CHART_THEMES).forEach(([name, theme]) => {
  echarts.registerTheme(name, theme);
});

class EChartsElement extends HTMLElement {
  private chart: Nullable<echarts.ECharts> = null;
  private _theme: string = 'dark';
  private _readyCallback: Nullable<((chart: echarts.ECharts) => void)> = null;
  private resizeObserver: Nullable<ResizeObserver> = null;
  private resizeDebounceTimer: Nullable<number> = null;
  private _options: Nullable<echarts.EChartsOption> = null;

  static get observedAttributes() {
    return ['options', 'theme', 'loading'];
  }

  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    if (this._theme !== value && value in CHART_THEMES) {
      this._theme = value;
      this.applyTheme();      
    }
  }

  set onChartReady(callback: (chart: echarts.ECharts) => void) {
    this._readyCallback = callback;
    if (this.chart && callback) {
      callback(this.chart);
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.initChart();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  private render() {
    if (!this.shadowRoot) return;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        .chart-container {
          width: 100%;
          height: 100%;
          min-height: 300px;
        }
      </style>
      <div class="chart-container"></div>
    `;
  }

  private initChart() {
    const container = this.shadowRoot?.querySelector('.chart-container') as Nullable<HTMLElement>;
    if (!container) return;

    this._theme = this.getAttribute('theme') || 'dark';
    this.chart = echarts.init(container, this._theme);
    this.updateOptions();

    this.setupEventListeners();

    if (this._readyCallback) {
      this._readyCallback(this.chart);
    }

    this.dispatchChartReadyEvent();
  }

  private dispatchChartReadyEvent() {
    if (!this.chart) return;
    
    const event = new CustomEvent('chart-ready', {
      detail: { chart: this.chart },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private cleanup() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    if (this.resizeDebounceTimer) {
      window.clearTimeout(this.resizeDebounceTimer);
      this.resizeDebounceTimer = null;
    }
  }

  private setupEventListeners() {
    if (!this.chart) return;
    
    const handleResize = () => {
      if (this.resizeDebounceTimer) {
        window.clearTimeout(this.resizeDebounceTimer);
      }
      
      this.resizeDebounceTimer = window.setTimeout(() => {
        this.chart?.resize();
        this.resizeDebounceTimer = null;
      }, 100);
    };
    
    this.resizeObserver = new ResizeObserver(handleResize);
    const container = this.shadowRoot?.querySelector('.chart-container');
    if (container) {
      this.resizeObserver.observe(container);
    }
    
    window.addEventListener('resize', handleResize);
    
    this.addEventListener('disconnected', () => {
      window.removeEventListener('resize', handleResize);
    });
  }

  private applyTheme() {
    if (!this.chart) return;

    try {
      const container = this.shadowRoot?.querySelector('.chart-container') as Nullable<HTMLElement>;
      if (!container) return;
      
      this.chart.dispose();
      this.chart = echarts.init(container, this._theme);

      if (this._options) {
        this.chart.setOption(this._options, true);
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }

  private updateOptions() {
    const optionsAttr = this.getAttribute('options');
    if (!optionsAttr || !this.chart) return;

    try {
      const newOptions = JSON.parse(optionsAttr) as echarts.EChartsOption;
      this._options = newOptions;
      this.chart.setOption(newOptions, true);
    } catch (e) {
      console.error('Error parsing options:', e);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'theme':
        this._theme = newValue;
        this.applyTheme();
        break;
      case 'options':
        this.updateOptions();
        break;
      case 'loading':
        this.toggleLoading(newValue);
        break;
    }
  }

  private toggleLoading(loading: string) {
    if (!this.chart) return;
    
    if (loading === 'true') {
      this.chart.showLoading();
    } else {
      this.chart.hideLoading();
    }
  }

  public getInstance(): Nullable<echarts.ECharts> {
    return this.chart;
  }
}

if (!customElements.get('echarts-wc')) {
  customElements.define('echarts-wc', EChartsElement);
}
