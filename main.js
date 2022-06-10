const table = document.getElementById("report-table");
const heads = document.getElementById("report-table-heads");

function processData(data) {
  const countries = data.countries;
  const titles = data.titles;

  for (const title of titles) {
    heads.innerHTML += `<th>${title}</th>`;
  }

  for (const country of countries) {
    const row = document.createElement("tr");
    row.innerHTML += `<th scope="row" style="text-align: center;">${country.rank}</td>`;
    row.innerHTML += `<td style="font-size: 24px; text-align: center;">${country.flag}</td>`;
    row.innerHTML += `<td>${country.name}</td>`;
    row.innerHTML += `<td style="text-align: right;">${country.overallScore.toFixed(
      3
    )}</td>`;
    for (const report of country.reports) {
      row.innerHTML += `<td style="text-align: right;">${report.score.toFixed(
        3
      )}<span style="opacity: 50%">(${report.rank})</span></td>`;
    }
    table.appendChild(row);
  }
}

fetch("resources/data.json")
  .then((response) => response.json())
  .then((data) => processData(data));
