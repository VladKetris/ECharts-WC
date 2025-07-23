# **ECharts Web Component (React-based)**  

🚀 **React-компонент, обёрнутый в Web Component**, для удобного использования библиотеки [Apache ECharts](https://echarts.apache.org/) с поддержкой тем, реактивным обновлением и расширенными возможностями.  

## **Особенности**  
✅ **Реактивное обновление** – график автоматически перерисовывается при изменении данных.  
✅ **Поддержка тем** (light/dark) – легко переключать визуальный стиль.  
✅ **Web Component** – работает в любом фреймворке (React, Angular, Vue, Vanilla JS).  
✅ **Лёгкая интеграция** – просто добавьте `<echarts-wc>` в HTML.  
✅ **Гибкие опции** – полная поддержка конфигурации ECharts.  

## **Преимущества Web Component**  
🔹 **Инкапсуляция стилей и логики** – Shadow DOM изолирует компонент от глобальных стилей.  
🔹 **Кросс-фреймворковая совместимость** – работает везде, где поддерживаются Custom Elements.  
🔹 **Переиспользуемость** – можно публиковать в npm и использовать как обычный HTML-тег.  
🔹 **Стандартность** – основано на [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components).  

## **Использование**  
### **1. Использование в React**  
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
### **2. Использование в HTML (Vanilla JS)**  
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

## **Демонстрация**  
📹 **Видео-демо** (будет добавлено позже):  
<!-- Можно вставить YouTube-ролик или GIF -->  

## **Планы по улучшению**  
📌 **Динамический импорт ECharts** – уменьшение размера бандла.  
📌 **Кастомные события** (например, `chart-click`, `data-zoom`).  
📌 **Публикация в npm** для удобного использования.  
📌 **Экспорт в SVG/PNG** – сохранение графика в файл.  

## **Разработка**  
```bash
git clone https://github.com/ECharts-WC.git
npm install
npm run dev  # запуск демо-сервера
```

**Ссылки**:  
- [Apache ECharts](https://echarts.apache.org/)  
- [Web Components Docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components)  

---

💡 **Идеи и предложения?** Открывайте **Issues** или **Pull Requests**! 🚀