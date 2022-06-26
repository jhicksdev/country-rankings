# Country Rankings

## Overview

A table of countries and their rankings regarding quality of life, safety, democracy, etc. The data being used in this project has been copied from the following Wikipedia pages below.

| Title | Year | Source |
| --- | --- | --- |
| Corruption Perceptions Index (CPI) | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Corruption_Perceptions_Index#2012%E2%80%932021) |
| Democracy Index | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Democracy_Index#By_country) |
| Fragile States Index (FSI) | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_Fragile_States_Index#Fragile_States_Index_2021) |
| Freedom in the World | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Freedom_in_the_World#World) |
| Gay Travel Index | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Gay-friendly#World) |
| Global Gender Gap Report | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Global_Gender_Gap_Report#WEF_Global_Gender_Gap_Index_rankings) |
| Global Peace Index (GPI) | 2022 | [Wikipedia](https://en.wikipedia.org/wiki/Global_Peace_Index#Global_Peace_Index_2022_ranking) |
| Global Terrorism Index (GTI) | 2022 | [Wikipedia](https://en.wikipedia.org/wiki/Global_Terrorism_Index#By_country) |
| Human Development Index (HDI) | 2019 | [Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index#Nations) |
| Legatum Prosperity Index | 2021 | [Wikipedia](https://en.wikipedia.org/wiki/Legatum_Prosperity_Index#2021[2]) |
| Social Progress Index (SPI) | 2020 | [Wikipedia](https://en.wikipedia.org/wiki/Social_Progress_Index#2020_rankings_and_scores_by_country) |
| World Happiness Report | 2020 | [Wikipedia](https://en.wikipedia.org/wiki/World_Happiness_Report#2020_report) |
| World Risk Index | 2016 | [Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_natural_disaster_risk#Rankings) |

## Adding new data

The desired country names are stored in the `resources/names.txt` file. Add a valid country name to the file in order for the table to list it. You might also need to browse through the CSV files to check if the name matches in all of them.

New data that is added to this project must be in CSV format. The order of the columns must be `rank,name,score`, no additional columns are accepted. `rank` and `score` must have a number data type and `name` must have a string data type. The CSV file then must be placed in the `resources/csv` directory.

Issue the following command to complete the process. The data should be written to the `resources/json/data.json` file.

```
python3 scripts/gen.py
```

## Deploying local testing server

To deploy a local testing server, we are going to be using the _http.server_ Python module. In the command line, navigate to this project and issue the following command.

```
python3 -m http.server
```

Go to the URL `http://0.0.0.0:8000/` in your web browser to view the page.
