import json
import os
import requests

countries, titles = [], []

def map_range(value, start1, stop1, start2, stop2) -> float:
    return (((value - start1) * (stop2 - start2)) /
            (stop1 - start1)) + start2

def get_country_by_name(name):
    for country in countries:
        if country["name"] == name:
            return country

ignored_names = None
with open("resources/json/ignored-names.json") as file:
    ignored_names = json.load(file)
    file.close()

with requests.get("https://restcountries.com/v3.1/all") as response:
    for country in response.json():
        if country["name"]["common"] not in ignored_names:
            countries.append({ "rank": 0, "flag": country["flag"], "name": country["name"]["common"], "overallScore": 0, "reports": [] })

for filename in sorted(os.listdir("resources/csv")):
    title = filename[:-4].replace("_", " ")
    if title not in titles:
        titles.append(title)
    with open("resources/csv/" + filename) as file:
        next(file)
        rows = file.read().split("\n")
        rows.pop()
        for row in rows:
            tokens = row.split(",")
            country = get_country_by_name(tokens[1])
            if country != None:
                country["reports"].append({ "title": title, "rank": int(tokens[0]), "score": float(tokens[2]) })
        file.close()

with open("resources/json/ranges.json") as file:
    ranges = json.load(file)
    for range in ranges:
        for country in countries:
            for report in country["reports"]:
                if range["title"] == report["title"]:
                    country["overallScore"] += map_range(report["rank"], range["ranks"]["worst"], range["ranks"]["best"], 0, 1)
    file.close()

for country in countries:
    country["overallScore"] /= len(titles)

countries.sort(key=lambda x: x["overallScore"], reverse=True)

rank = 0
for country in countries:
    rank += 1
    country["rank"] = rank

with open("resources/json/data.json", "w") as file:
    json.dump({"countries": countries, "titles": titles}, file)
    file.close()
