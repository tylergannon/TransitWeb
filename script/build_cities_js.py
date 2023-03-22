#!/usr/bin/env python3
import typer
import requests
import zipfile
import io
import csv
import json
from pathlib import Path
from rich.progress import Progress

StrDict = dict[str, str]

app = typer.Typer()

BASE_URL = "http://download.geonames.org/export/dump/"


def not_a_comment(line: str) -> bool:
    return line[0] != "#"


def download_file(url: str) -> str:
    response = requests.get(url, stream=True)
    file_size = int(response.headers.get("Content-Length", 0))
    data = io.BytesIO()
    with Progress() as progress:
        task = progress.add_task("Downloading...", total=file_size)
        for chunk in response.iter_content(chunk_size=1024):
            progress.advance(task, len(chunk))
            data.write(chunk)

    data.seek(0)
    return data.read().decode()

def download_and_unzip(url: str) -> str:
    response = requests.get(url, stream=True)
    file_size = int(response.headers.get("Content-Length", 0))

    data = io.BytesIO()
    with Progress() as progress:
        task = progress.add_task("Downloading...", total=file_size)
        for chunk in response.iter_content(chunk_size=1024):
            progress.advance(task, len(chunk))
            data.write(chunk)

    data.seek(0)

    with zipfile.ZipFile(io.BytesIO(data.read())) as z:
        return z.read(z.namelist()[0]).decode()


# Keep the other functions unchanged


def parse_countries(data: str) -> dict[str, StrDict]:
    reader = csv.reader(filter(not_a_comment, data.splitlines()), delimiter="\t")
    return {row[0]: {"ISO3": row[1], "name": row[4]} for row in reader}


def parse_admin_regions(data: str) -> dict[str, StrDict]:
    reader = csv.reader(data.splitlines(), delimiter="\t")
    admin_regions = {}
    for row in reader:
        admin_regions[row[0]] = row[1]
    return admin_regions


def parse_cities(
    data: str,
    countries: dict[str, StrDict],
    admin1: dict[str, StrDict],
    admin2: dict[str, StrDict],
) -> list[StrDict]:
    reader = csv.reader(data.splitlines(), delimiter="\t")
    cities = []
    for row in reader:
        names = [row[2], *filter(lambda x: bool(x), row[3].split(","))]
        place = [
            countries[row[8]]["ISO3"],
            countries[row[8]]["name"],
            admin1.get(f"{row[8]}.{row[10]}", None),
            admin2.get(f"{row[8]}.{row[10]}.{row[11]}", None)
        ]
        if not row[8] or row[8] not in countries:
            continue

        city = {
            "_id": int(row[0]),
            "name": row[1],
            "names": [*map(str.lower, names)],
            "place": [*filter(None, place)],
            "tz": row[17],
        }
        cities.append(city)

    return cities


@app.command(name="build_cities.js")
def main(
    output: Path = typer.Option("-", help="Output file name", allow_dash=True),
    indent: int = typer.Option(4, help="Indentation for JSON output"),
):
    country_data = download_file(BASE_URL + "countryInfo.txt")
    countries = parse_countries(country_data)

    admin1_data = download_file(BASE_URL + "admin1CodesASCII.txt")
    admin1 = parse_admin_regions(admin1_data)

    admin2_data = download_file(BASE_URL + "admin2Codes.txt")
    admin2 = parse_admin_regions(admin2_data)

    city_data = download_and_unzip(BASE_URL + "cities500.zip")
    cities = parse_cities(city_data, countries, admin1, admin2)
    data = "rs.initiate();\n" + \
        "db.geoNamesCities.insertMany(\n" + \
            json.dumps(cities, indent=indent, ensure_ascii=False) + "\n);\n"

    if output == "-":
        typer.echo(data)
    else:
        output.absolute().touch(exist_ok=True)
        with output.absolute().open("w") as f:
            f.write(data)


if __name__ == "__main__":
    app()
