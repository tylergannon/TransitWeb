export type Point = [number, number];
type Rotation = (p: Point) => Point;

const _rotateZero: Rotation = (p) => p;
const rnd = (a: number) => Math.round(a);
const cos30 = 0.8660254;

const makeRotator = (Θ: number): Rotation => {
	if (Θ === 0) {
		return _rotateZero;
	}
	const cos = Math.cos((Θ * Math.PI) / 180);
	const sin = Math.sin((Θ * Math.PI) / 180);
	return ([x, y]) => [x * cos - y * sin, x * sin + y * cos];
};

export class SvgPath {
	private _path: string[] = [];
	private _rotation: Rotation = _rotateZero;

	add(cmd: string, ...args: number[]) {
		this._path.push(`${cmd}${args.map(rnd).join(',')}`);
		return this;
	}

	move(p: Point, cmd: 'M' | 'm' = 'm') {
		return this.add(cmd, ...this._rotation(p));
	}
	line(p: Point, cmd: 'L' | 'l' = 'l') {
		return this.add(cmd, ...this._rotation(p));
	}
	/**
	 * Add a bezier curve to the path. Big C for absolute units,
	 * units for small c are relative to the cursor location.
	 * @param p1 First control point
	 * @param p2 Second control point
	 * @param p3 End point
	 * @param cmd big C for absolute, small c for relative units
	 */
	cubic(p1: Point, p2: Point, p3: Point, cmd: 'C' | 'c' = 'c') {
		return this.add(cmd, ...this._rotation(p1), ...this._rotation(p2), ...this._rotation(p3));
	}

	quadratic(p1: Point, p2: Point, cmd: 'Q' | 'q' = 'q') {
		return this.add(cmd, ...this._rotation(p1), ...this._rotation(p2));
	}
	close() {
		return this.add('Z');
	}

	arc(
		p: Point,
		r1: number,
		r2?: number,
		large = 0,
		sweep = 0,
		cmd: 'A' | 'a' = 'a'
	) {
		return this.add(cmd, r1, r2 || r1, 0, large, sweep, ...this._rotation(p));
	}

	squareCorner(p: Point) {
		const r = Math.abs(p[0]);
		return this.add('a', r, r, 0, 0, 1, ...this._rotation(p));
	}

	rotate(Θ: number) {
		this._rotation = makeRotator(Θ);
		return this;
	}

	roundedTriangle(size: number, r = 0.6) {
		const k = size / (1 + 2 * r);
		const radius = r * k;
		const height = k * cos30 + radius * 2;
		return this.move([-radius * cos30, (radius - height) / 2])
			.arc([2 * radius * cos30, 0], radius, radius, 0, 1, 'a')
			.line([k / 2, k * cos30])
			.arc([-radius * cos30, radius * 1.5], radius, radius, 0, 1, 'a')
			.line([-k, 0])
			.arc([-radius * cos30, -radius * 1.5], radius, radius, 0, 1, 'a')
			.close();
	}

	roundedSquare(size: number, r = 0.7) {
		const k = size / (1 + 2 * r);
		const radius = r * k;
		console.log('k', k, 'radius', radius);

		return this.move([size / 2, size / 2 - radius])
			.squareCorner([-radius, radius])
			.line([-k, 0])
			.squareCorner([-radius, -radius])
			.line([0, -k])
			.squareCorner([radius, -radius])
			.line([k, 0])
			.squareCorner([radius, radius])
			.close();
	}

	toString() {
		return this._path.join(' ');
	}
}
