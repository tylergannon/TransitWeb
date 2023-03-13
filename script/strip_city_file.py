#!/usr/bin/env python3
from operator import itemgetter
from pathlib import Path
from sys import stdout
import typer

app = typer.Typer()

@app.command()
def filter_tsv_columns(
    columns: list[int],
    input: typer.FileText,
    output: Path = typer.Option("-", allow_dash=True, dir_okay=False),
):
    line_filter = itemgetter(*(i-1 for i in columns))

    output_file = stdout if output.name == "-" else output.open("w")

    for line in input:
        if line[0] == "#":
            continue

        data = line.split("\t")
        output_file.write("\t".join(line_filter(data)))
        output_file.write("\n")
    if output.name != "-":
        output_file.close()
if __name__ == "__main__":
    app()

