#!/usr/bin/env python3
import typer
import os
from pathlib import Path
from operator import itemgetter

from jinja2 import Template
import lorem
import random

# - [x] gates
# - [ ] centers
# - [ ] profiles
# - [ ] types
# - [ ] channels
# - [ ] planets


app = typer.Typer()

CENTERS = ['head', 'throat', 'sacral', 'g', 'spleen', 'root', 'will', 'esp', 'ajna']
gates_by_center = {c: [] for c in CENTERS}
centers_by_gate = {}
channels_by_center = {c: [] for c in CENTERS}

gates_by_gate = {str(g): [] for g in range(1, 65)}
channels_by_gate = {str(g): [] for g in range(1, 65)}

@app.command()
def main(
    input_dir: Path = typer.Argument(..., file_okay=False, exists=True),
    output_dir: Path = typer.Argument(..., file_okay=False)
):


    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    template = Template((input_dir / "gate.md.jinja2").read_text())

    gatesPath = Path(output_dir) / "gates"
    gatesPath.mkdir(exist_ok=True)
    for gate in range(1, 65):
        output_path = gatesPath / f"{gate:02}.md"

        with open(output_path, "w") as f:
            f.write(render_gate(gate, template))

def render_gate(gate: int, template: Template) -> str:
    hexagram = get_hexagram_name(gate)
    name = get_gate_name(gate)
    gate_name = str(gate)
    paired = gates_by_gate[gate_name]
    channels = channels_by_gate[gate_name]


    return template.render(
        gate=gate,
        hexagram=hexagram,
        name=name,
        title=lorem.get_sentence(word_range=(3, 5)),
        slogan=lorem.get_sentence(word_range=(6, 9)),
        text=lorem.get_paragraph(),
        center=centers_by_gate[str(gate)],
        paired=paired,
        channels=channels,
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



CHANNELS = {
    '1_8': ['1', '8', 'g', 'throat'],
    '11_56': ['11', '56', 'ajna', 'throat'],
    '12_22': ['12', '22', 'throat', 'esp'],
    '13_33': ['13', '33', 'g', 'throat'],
    '16_48': ['16', '48', 'throat', 'spleen'],
    '17_62': ['17', '62', 'ajna', 'throat'],
    '18_58': ['18', '58', 'spleen', 'root'],
    '30_41': ['30', '41', 'esp', 'root'],
    '39_55': ['39', '55', 'root', 'esp'],
    '28_38': ['28', '38', 'spleen', 'root'],
    '32_54': ['32', '54', 'spleen', 'root'],
    '19_49': ['19', '49', 'root', 'esp'],
    '2_14': ['2', '14', 'g', 'sacral'],
    '21_45': ['21', '45', 'will', 'throat'],
    '23_43': ['23', '43', 'throat', 'ajna'],
    '24_61': ['24', '61', 'ajna', 'head'],
    '25_51': ['25', '51', 'g', 'will'],
    '26_44': ['26', '44', 'will', 'spleen'],
    '6_59': ['6', '59', 'esp', 'sacral'],
    '27_50': ['27', '50', 'sacral', 'spleen'],
    '29_46': ['29', '46', 'sacral', 'g'],
    '3_60': ['3', '60', 'sacral', 'root'],
    '35_36': ['35', '36', 'throat', 'esp'],
    '37_40': ['37', '40', 'esp', 'will'],
    '4_63': ['4', '63', 'ajna', 'head'],
    '42_53': ['42', '53', 'sacral', 'root'],
    '47_64': ['47', '64', 'ajna', 'head'],
    '5_15': ['5', '15', 'sacral', 'g'],
    '7_31': ['7', '31', 'g', 'throat'],
    '9_52': ['9', '52', 'sacral', 'root'],
    '10_34': ['10', '34', 'g', 'sacral'],
    '20_57': ['20', '57', 'throat', 'spleen'],
    '34_57': ['34', '57', 'sacral', 'spleen'],
    '10_20': ['10', '20', 'g', 'throat'],
    '20_34': ['20', '34', 'throat', 'sacral'],
    '10_57': ['10', '57', 'g', 'spleen'],
}


for channel, [g1, g2, c1, c2] in CHANNELS.items():
    gates_by_center[c1].append(g1)
    gates_by_center[c2].append(g2)
    centers_by_gate[g1] = c1
    centers_by_gate[g2] = c2
    gates_by_gate[g1].append(g2)
    gates_by_gate[g2].append(g1)
    channels_by_gate[g1].append(channel)
    channels_by_gate[g2].append(channel)
    channels_by_center[c1].append(channel)
    channels_by_center[c2].append(channel)

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

if __name__ == "__main__":
    app()
