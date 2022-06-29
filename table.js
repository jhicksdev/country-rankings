const wrapper = document.getElementById("table-wrapper");
const element = document.getElementById("report-table");
const headerRow = element.children[0].children[0];
const body = element.children[1];

const wrapperY = wrapper.getBoundingClientRect().y;

function resizeWrapper() {
  wrapper.style.height = `calc(${window.innerHeight - wrapperY}px - 1em)`;
}
resizeWrapper();

window.addEventListener("resize", resizeWrapper);

fetch("resources/json/data.json")
  .then((res) => res.json())
  .then((data) => {
    const countries = data.countries;
    const titles = data.titles;

    for (const title of titles) {
      headerRow.innerHTML += `<th class="frozen-header">${title}</th>`;
    }

    for (const country of countries) {
      const row = document.createElement("tr");
      row.innerHTML += `<th scope="row" style="text-align: center;">${country.rank}</td>`;
      row.innerHTML += `<td style="font-size: 24px; text-align: center;">${country.flag}</td>`;
      row.innerHTML += `<td>${country.name}</td>`;
      row.innerHTML += `<td style="text-align: right;">${country.overallScore.toFixed(3)}</td>`;
      for (const report of country.reports) {
        row.innerHTML += `<td style="text-align: right;">${report.score.toFixed(3)}&nbsp;<span style="opacity: 50%">(${report.rank})</span></td>`;
      }
      body.appendChild(row);
    }
  });
