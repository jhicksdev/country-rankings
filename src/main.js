const reportTable = document.getElementById("report-table");
const reportTableHeads = document.getElementById("report-table-heads");

function processData(data) {
  const countries = data.countries;
  const reportTitles = data.reportTitles;

  for (const title of reportTitles) {
    reportTableHeads.innerHTML += `<th>${title}</th>`;
  }

  for (const country of countries) {
    const row = document.createElement("tr");
    row.innerHTML += `<td style="font-size: 24px; text-align: center;">${country.flag}</td>`;
    row.innerHTML += `<td>${country.name}</td>`;
    for (const report of country.reports) {
      row.innerHTML += `<td style="text-align: right;">${report.score.toFixed(
        3
      )}<span style="opacity: 50%">(${report.rank})</span></td>`;
    }
    reportTable.appendChild(row);
  }
}

fetch("resources/data.json")
  .then((response) => response.json())
  .then((data) => processData(data));
