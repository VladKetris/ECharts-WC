# **ECharts Web Component (React-based)**  

🚀 **A Web Component wrapped in a React component** for easy use of the [Apache ECharts](https://echarts.apache.org/) library with theme support, reactive updates, and extended capabilities.  

## **Features**  
✅ **Reactive updates** – the chart automatically re-renders when data changes.  
✅ **Theme support** (light/dark) – easily switch visual styles.  
✅ **Web Component** – works in any framework (React, Angular, Vue, Vanilla JS).  
✅ **Easy integration** – just add `<echarts-wc>` to your HTML.  
✅ **Flexible options** – full support for ECharts configuration.  

## **Web Component Advantages**  
🔹 **Style and logic encapsulation** – Shadow DOM isolates the component from global styles.  
🔹 **Cross-framework compatibility** – works anywhere Custom Elements are supported.  
🔹 **Reusability** – can be published to npm and used as a standard HTML tag.  
🔹 **Standards-based** – built on [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components).  

## **Usage**  
### **1. Usage in React**  
```jsx
import "echarts-wc";

function App() {
  const options = {
    xAxis: { type: "category", data: ["A", "B", "C"] },
    yAxis: { type: "value" },
    series: [{ data: [10, 20, 30], type: "bar" }],
  };

  return <echarts-wc options={options} theme="dark" />;
}
```
### **2. Usage in HTML (Vanilla JS)**  
```html
<script src="https://unpkg.com/echarts-wc@latest/dist/echarts-wc.js"></script>
<echarts-wc id="chart"></echarts-wc>

<script>
  document.getElementById("chart").options = {
    xAxis: { data: ["Jan", "Feb", "Mar"] },
    series: [{ type: "line", data: [100, 200, 150] }],
  };
</script>
```

## **Demo**  
<img width="748" height="640" alt="image" src="https://github.com/user-attachments/assets/3e91cd78-89bc-4d62-8e61-a6cab457093c" />
<img width="768" height="649" alt="image" src="https://github.com/user-attachments/assets/4233e9a5-9d85-4643-954b-4950b3d4b877" />
<img width="771" height="634" alt="image" src="https://github.com/user-attachments/assets/37bcbf05-2358-4f25-9fdb-528a83cafd5c" />
<img width="744" height="633" alt="image" src="https://github.com/user-attachments/assets/96bdb31c-abf1-47ee-8cdf-d23ce2daa28f" />

📹 **Video Demo**:  
![ezgif-8db5338a051b27](https://github.com/user-attachments/assets/44b4a363-0af2-40fa-b794-f87e7a3d986f)


## **Future Improvements**  
📌 **Dynamic ECharts import** – reduce bundle size.  
📌 **Custom events** (e.g., `chart-click`, `data-zoom`).  
📌 **Publish to npm** for easy consumption.  
📌 **SVG/PNG export** – save charts as files.  

## **Development**  
```bash
git clone https://github.com/ECharts-WC.git
npm install
npm run dev  # start demo server
```

**Links**:  
- [Apache ECharts](https://echarts.apache.org/)  
- [Web Components Docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components)  

--- 
