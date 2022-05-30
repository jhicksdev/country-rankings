const reportTable = document.getElementById("report-table");
const reportTableHeadRow = document.getElementById("report-table-head-row");

function processData(data) {
  const countries = data.countries;
  const reportTitles = data.reportTitles;

  for (const title of reportTitles) {
    const head = document.createElement("th");
    head.scope = "col";
    head.innerHTML = title;
    reportTableHeadRow.appendChild(head);
  }

  for (const country of countries) {
    const row = document.createElement("tr");

    // const rankCell = document.createElement("th");
    // rankCell.scope = "row";
    // rankCell.style.textAlign = "center";
    // rankCell.innerHTML = country.rank || "";
    // row.appendChild(rankCell);

    const flagCell = document.createElement("td");
    const flagImage = document.createElement("img");
    flagImage.className = "flag";
    flagImage.src = country.flagImageUrl;
    flagCell.appendChild(flagImage);
    row.appendChild(flagCell);

    const nameCell = document.createElement("td");
    nameCell.innerHTML = country.name;
    row.appendChild(nameCell);

    // const overallScore = document.createElement("td");
    // overallScore.style.textAlign = "right";
    // overallScore.innerHTML = country.overallScore || "";
    // row.appendChild(overallScore);

    for (const report of country.reports) {
      const cell = document.createElement("td");
      cell.style.textAlign = "right";
      cell.innerHTML = `${parseFloat(report.score).toFixed(3)}<span style="opacity: 50%">(${report.rank})</span>`;
      row.appendChild(cell);
    }

    reportTable.appendChild(row);
  }
}

fetch("resources/data/data.json")
  .then((response) => response.json())
  .then((data) => processData(data));
