# Country Rankings

## Overview

A table of countries and their rankings regarding quality of life, safety, democracy, etc. The data being used in this project has been copied the following Wikipedia pages:

- https://en.wikipedia.org/wiki/Democracy_Index
- https://en.wikipedia.org/wiki/Global_Peace_Index
- https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index
- https://en.wikipedia.org/wiki/Social_Progress_Index
- https://en.wikipedia.org/wiki/World_Happiness_Report

## Adding new data

The desired country names are stored in the `resources/names.txt` file. Add a valid country name to the file in order for the table to list it. You might also need to browse through the CSV files to check if the name matches in all of them.

New data that is added to this project must be in CSV format. The order of the columns must be `rank,name,score`, no additional columns are accepted. `rank` and `score` must have a number data type and `name` must have a string data type. The CSV file then must be placed in the `resources` directory.

Issue the following command to complete the process. The data should be written to the `resources/data.json` file.

```
python3 generate_data.py
```

## Deploying local testing server

To deploy a local testing server, we are going to be using the _http.server_ Python module. In the command line, navigate to this project and issue the following command.

```
python3 -m http.server
```

Go to the URL `http://0.0.0.0:8000/` in your web browser to view the page.
