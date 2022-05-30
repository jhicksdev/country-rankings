const fs = require("fs");
const Country = require("../modules/country");
const Report = require("../modules/report");

const countries = [];
const reportTitles = [];

function getCountryByName(name) {
  for (const country of countries) {
    if (country instanceof Country) {
      if (country.name == name) return country;
    }
  }
}

const names = fs
  .readFileSync("resources/data/names.txt")
  .toString()
  .split("\n");
names.forEach((name) => countries.push(new Country(name)));

const flagImageUrls = JSON.parse(
  fs.readFileSync("resources/data/flag-img-urls.json").toString()
);
for (const name in flagImageUrls) {
  getCountryByName(name).flagImageUrl = flagImageUrls[name];
}

fs.readdirSync("resources/data")
  .sort()
  .forEach((filename) => {
    if (filename.endsWith(".csv")) {
      const title = filename.slice(0, -4).split("_").join(" ");
      if (!reportTitles.includes(title)) {
        reportTitles.push(title);
      }
      const file = fs.readFileSync(`resources/data/${filename}`);
      const rows = file.toString().split("\n");
      rows.shift();
      rows.forEach((row) => {
        const tokens = row.split(",");
        const country = getCountryByName(tokens[1]);
        if (country !== undefined) {
          country.reports.push(
            new Report(title, parseInt(tokens[0]), parseFloat(tokens[2]))
          );
        }
      });
    }
  });

fs.writeFileSync(
  "resources/data/data.json",
  JSON.stringify({ countries: countries, reportTitles: reportTitles }, null, 2)
);
