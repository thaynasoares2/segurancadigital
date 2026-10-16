"use strict";
(() => {
  const source = document.getElementById("dashboard-dados");
  if (!source) return;
  const charts = JSON.parse(source.textContent);
  const colors = ["#147d79", "#3268ac", "#719447", "#bb8b2d", "#ac6462", "#705994"];
  charts.forEach((data, index) => {
    const canvas = document.getElementById(`dashboard-grafico-${index}`);
    if (data.sem_dados || data.valores.every(value => value === null) || typeof Chart === "undefined") {
      canvas.hidden = true;
      const message = canvas.parentElement.querySelector(".chart-empty");
      message.hidden = false;
      if (typeof Chart === "undefined") message.textContent = "Gráfico indisponível. Consulte os valores na tabela.";
      return;
    }
    const radar = data.tipo === "radar";
    const scale = {beginAtZero: true, min: 0, max: data.contagem ? undefined : data.percentual ? 100 : 4,
      ticks: {precision: data.contagem ? 0 : undefined}, grid: {color: "#e4ecf0"}};
    new Chart(canvas, {
      type: data.tipo,
      data: {labels: data.labels, datasets: [{label: data.titulo, data: data.valores,
        backgroundColor: radar ? "#147d7925" : colors, borderColor: radar ? "#147d79" : colors,
        borderWidth: radar ? 2 : 1, pointRadius: radar ? 4 : 0, spanGaps: false}]},
      options: {responsive: true, maintainAspectRatio: false, animation: false,
        plugins: {legend: {display: false}}, scales: radar ? {r: scale} : {y: scale}}
    });
  });
})();
