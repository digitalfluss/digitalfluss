document.getElementById("toStep2").addEventListener("click", () => {
  document.getElementById("step2").classList.remove("hidden");
  document.getElementById("toStep2").disabled = true;
});

document.getElementById("calculate").addEventListener("click", () => {
  const tasksPerWeek = parseFloat(document.getElementById("tasksPerWeek").value);
  const minutesPerTask = parseFloat(document.getElementById("minutesPerTask").value);
  const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
  const automationCost = parseFloat(document.getElementById("automationCost").value);

  const manualHoursPerYear = (tasksPerWeek * minutesPerTask / 60) * 52;
  const manualCost = Math.round(manualHoursPerYear * hourlyRate);
  const savings = Math.round(manualCost - automationCost);

  document.getElementById("manualCost").textContent = manualCost.toLocaleString("de-DE");
  document.getElementById("autoCost").textContent = automationCost.toLocaleString("de-DE");
  document.getElementById("savings").textContent = savings.toLocaleString("de-DE");

  document.getElementById("explanation").innerHTML = `
    Wenn du <strong>${tasksPerWeek}</strong> Aufgaben pro Woche mit je 
    <strong>${minutesPerTask}</strong> Minuten automatisierst, sparst du jährlich 
    <span style="color:green;"><strong>${savings.toLocaleString("de-DE")} €</strong></span> 
    im Vergleich zu deiner bisherigen Arbeitsweise.
  `;

  renderChart(manualCost, automationCost, savings);
  document.getElementById("result").classList.remove("hidden");
});

function renderChart(manual, automation, saving) {
  const ctx = document.getElementById("costChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Manuell", "Automatisiert"],
      datasets: [
        {
          label: "Manuelle Kosten",
          data: [manual, 0],
          backgroundColor: "#f44336"
        },
        {
          label: "Automatisierung",
          data: [0, automation],
          backgroundColor: "#2196f3"
        },
        {
          label: "Ersparnis",
          data: [0, saving],
          backgroundColor: "#4caf50"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `${value.toLocaleString("de-DE")} €`
          }
        }
      }
    }
  });
}
