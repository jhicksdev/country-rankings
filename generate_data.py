import json
import os


countries, report_titles = [], []


def get_country_by_name(name):
    for country in countries:
        if country["name"] == name:
            return country


with open("resources/names.txt") as file:
    names = file.read().split("\n")
    for name in names:
        countries.append({"name": name, "flag": "", "reports": []})
    file.close()

with open("resources/flags.json") as file:
    flags = json.load(file)
    for name in flags:
        get_country_by_name(name)["flag"] = flags[name]
    file.close()

for filename in sorted(os.listdir("resources")):
    if filename.endswith(".csv"):
        title = filename[:-4].replace("_", " ")
        if title not in report_titles:
            report_titles.append(title)
        with open("resources/" + filename) as file:
            next(file)
            rows = file.read().split("\n")
            rows.pop()
            for row in rows:
                tokens = row.split(",")
                country = get_country_by_name(tokens[1])
                if country != None:
                    country["reports"].append(
                        {"title": title, "rank": int(tokens[0]), "score": float(tokens[2])})
            file.close()

with open("resources/data.json", "w") as file:
    json.dump({"countries": countries, "reportTitles": report_titles}, file)
    file.close()
