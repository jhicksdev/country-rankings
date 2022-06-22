import json
import os


countries, titles = [], []


def map_range(value, start1, stop1, start2, stop2) -> float:
    return (((value - start1) * (stop2 - start2)) /
            (stop1 - start1)) + start2


def get_country_by_name(name):
    for country in countries:
        if country["name"] == name:
            return country


with open("resources/names.txt") as file:
    names = file.read().split("\n")
    for name in names:
        countries.append(
            {"rank": 0, "flag": "", "name": name, "overallScore": 0, "reports": []})
    file.close()

with open("resources/json/flags.json") as file:
    flags = json.load(file)
    for name in flags:
        get_country_by_name(name)["flag"] = flags[name]
    file.close()

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
                country["reports"].append(
                    {"title": title, "rank": int(tokens[0]), "score": float(tokens[2])})
        file.close()

with open("resources/json/evals.json") as file:
    evals = json.load(file)
    for title in evals:
        for country in countries:
            for report in country["reports"]:
                if title == report["title"]:
                    country["overallScore"] += eval(
                        str(evals[title]).replace("value", str(report["rank"])))
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
