#!/usr/bin/env python3
import typer
import os
from pathlib import Path
import sys
from jinja2 import Template
import lorem
import random


app = typer.Typer()
HEXAGRAMS = [
    "Creative (Heaven)",
    "Receptive (Earth)",
    "Difficulty at the Beginning",
    "Youthful Folly",
    "Waiting",
    "Conflict",
    "Army",
    "Holding Together",
    "Taming Power of the Small",
    "Treading",
    "Peace",
    "Standstill",
    "Fellowship with Men",
    "Possession in Great Measure",
    "Modesty",
    "Enthusiasm",
    "Following",
    "Work on What Has Been Spoiled",
    "Approach",
    "Contemplation",
    "Biting Through",
    "Grace",
    "Splitting Apart",
    "Return",
    "Innocence",
    "Taming Power of the Great",
    "Mouth Corners",
    "Preponderance of the Great",
    "Preponderance of the Small",
    "Vigilance",
    "Retreat",
    "Great Power",
    "Duration",
    "Retreat",
    "Great Harvest",
    "Progress",
    "Darkening of the Light",
    "The Family",
    "Opposition",
    "Obstruction",
    "Deliverance",
    "Decrease",
    "Increase",
    "Breakthrough",
    "Coming to Meet",
    "Gathering Together",
    "Pushing Upward",
    "Oppression",
    "The Well",
    "Revolution",
    "The Caldron",
    "The Arousing (Shock, Thunder)",
    "The Keeping Still (Mountain)",
    "Development",
    "Marrying Maiden",
    "Abundance",
    "The Wanderer",
    "The Gentle (Wind, Wood)",
    "The Joyous (Lake)",
    "Dispersion",
    "Limitation",
    "Inner Truth",
    "Preponderance of the Small",
    "After Completion",
    "Before Completion",
]

GATE_NAMES = [
    "Self-Expression",
    "Higher Knowing",
    "Ordering",
    "Formulization",
    "Universal Love",
    "Friction",
    "Self Direction",
    "Holding Together",
    "Focus",
    "Behavior",
    "Ideas",
    "Caution",
    "Listening",
    "Power Skills",
    "Extremes",
    "Enthusiasm",
    "Following",
    "Correction",
    "Approach",
    "Contemplation",
    "Biting Through",
    "Grace",
    "Splitting Apart",
    "Assimilation",
    "Innocence",
    "Surrender",
    "Nourishment",
    "The Great",
    "The Small",
    "Vigilance",
    "Retreat",
    "Recognition",
    "Duration",
    "The Abyss",
    "Progress",
    "Easy Progress",
    "Brightness Hiding",
    "The Family",
    "Opposition",
    "Obstruction",
    "Deliverance",
    "Decrease",
    "Increase",
    "Breakthrough",
    "Meeting",
    "Gathering",
    "Pushing Upward",
    "Limitation",
    "The Well",
    "Revolution",
    "The Caldron",
    "Thunder",
    "Stillness",
    "Cyclic Beginnings",
    "Youthful Folly",
    "Abundance",
    "The Wanderer",
    "The Gentle Wind",
    "The Joyous Lake",
    "Dispersion",
    "Limitation",
    "Inner Truth",
    "After Completion",
    "Harmony",
    "Before Completion",
]


def get_hexagram_name(number: int) -> str:
    return HEXAGRAMS[number - 1]


def get_gate_name(number: int) -> str:
    return GATE_NAMES[number - 1]

planets = [
    "sun", "moon", "northNode", "southNode", "mercury", "venus", "mars", "jupiter",
    "saturn", "uranus", "neptune", "pluto", "chiron",
]

@app.command()
def main(input_file: str, output_dir: str):
    if input_file == "-":
        template_str = sys.stdin.read()
    else:
        with open(input_file, "r") as f:
            template_str = f.read()

    template = Template(template_str)

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    gatesPath = Path(output_dir) / "gates"
    gatesPath.mkdir(exist_ok=True)

    for gate in range(1, 65):
        output_path = gatesPath / f"{gate:02}.md"
        hexagram = get_hexagram_name(gate)
        name = get_gate_name(gate)
        rendered = template.render(
            gate=gate,
            hexagram=hexagram,
            name=name,
            title=lorem.get_sentence(word_range=(3, 5)),
            slogan=lorem.get_sentence(word_range=(6, 9)),
            text=lorem.get_paragraph(),
            lines=[{
                "line": lorem.get_sentence(word_range=(6, 9)),
                "exalted": {
                    "planet": planets[random.randint(0, len(planets) - 1)],
                    "text": lorem.get_sentence(word_range=(6, 9)),
                },
                "diminished": {
                    "planet": planets[random.randint(0, len(planets) - 1)],
                    "text": lorem.get_sentence(word_range=(6, 9)),
                }
            } for i in range(1, 7)]
        )

        with open(output_path, "w") as f:
            f.write(rendered)


if __name__ == "__main__":
    app()
