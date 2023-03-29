const ratio = 0.6;
const cos30 = Math.sqrt(3) / 2;
type Point = [number, number];
type Rotation = (p: Point) => Point;
const _rotateZero: Rotation = (p) => p;

export const moveAbs = ([x, y]: Point) => {
	return `M${rnd(x)},${rnd(y)}`;
};

const move = ([dX, dY]: Point) => `m${rnd(dX)},${rnd(dY)}`;
const line = ([dX, dY]: Point) => `l${rnd(dX)},${rnd(dY)}`;

const makeRotator = (Θ: number): Rotation => {
	if (Θ === 0) {
		return _rotateZero;
	}
	const cos = Math.cos((Θ * Math.PI) / 180);
	const sin = Math.sin((Θ * Math.PI) / 180);
	return ([x, y]) => [x * cos - y * sin, x * sin + y * cos];
};

/**
 *
 * @param size
 * @param r
 * @returns
 */
export const roundedTriangleHeight = (size: number, r = ratio) => {
	/**
	 * Returns the height of a rounded triangle with the given size and ratio.
	 * Turns out to be directly proportional to the size.
	 * size = k * (1 + 2 * r)
	 * radius = r * size / (1 + 2 * r)
	 * height = r * k (1 + cos60) + k * cos30 = k * (r * (1 + cos60) + cos30)
	 *        = (size / (1 + 2 * r)) * (r * (1 + cos60) + cos30)
	 */
	const k = size / (1 + 2 * r);
	const radius = r * k;
	return k * cos30 + radius * 2;
};
const rnd = (a: number) => Math.round(a);
/**
 * Make the rounded triangle centered at the current cursor position.
 * @param size Side length of the square containing the rounded triangle
 * @param r Ratio of corner radius to the length of the straight portion of the side
 * @returns a value to insert into an SVG path's d attribute
 */
export const roundedTriangle = (size: number, Θ = 0, r = ratio) => {
	const k = size / (1 + 2 * r);
	const radius = r * k;
	const height = k * cos30 + radius * 2;
	const rotate = makeRotator(Θ);
	const _arc = ([dX, dY]: Point) => `a${rnd(radius)},${rnd(radius)},0,0,1,${rnd(dX)},${rnd(dY)}`;
	return [
		move(rotate([-radius * cos30, (radius - height) / 2])),
		_arc(rotate([2 * radius * cos30, 0])),
		line(rotate([k / 2, k * cos30])),
		_arc(rotate([-radius * cos30, radius * 1.5])),
		line(rotate([-k, 0])),
		_arc(rotate([-radius * cos30, -radius * 1.5])),
		'Z'
	].join(' ');
};

export const roundedSquare = (size: number, Θ = 0, r = 0.7) => {
	const k = size / (1 + 2 * r);
	const radius = r * k;
	const rotate = makeRotator(Θ);
	const _arc = ([dX, dY]: Point) => `a${rnd(radius)},${rnd(radius)},0,0,1,${rnd(dX)},${rnd(dY)}`;
	return [
		move(rotate([size / 2, size / 2 - radius])),
		_arc(rotate([-radius, radius])),
		line(rotate([-k, 0])),
		_arc(rotate([-radius, -radius])),
		line(rotate([0, -k])),
		_arc(rotate([radius, -radius])),
		line(rotate([k, 0])),
		_arc(rotate([radius, radius])),
		'Z'
	].join(' ');
};
