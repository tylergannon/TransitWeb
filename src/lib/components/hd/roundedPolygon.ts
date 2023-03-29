const ratio = 0.6;
const cos30 = Math.sqrt(3) / 2;

function move(dX: number, dY: number) {
	return `m${rnd(dX)},${rnd(dY)}`;
}
function line(dX: number, dY: number) {
	return `l${rnd(dX)},${rnd(dY)}`;
}
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
export const roundedTriangle = (size: number, r = ratio) => {
	const k = size / (1 + 2 * r);
	const radius = r * k;
	const height = k * cos30 + radius * 2;
	const _arc = (dX: number, dY: number) =>
		`a${rnd(radius)},${rnd(radius)},0,0,1,${rnd(dX)},${rnd(dY)}`;
	return [
		move(-radius * cos30, (radius - height) / 2),
		_arc(2 * radius * cos30, 0),
		line(k / 2, k * cos30),
		_arc(-radius * cos30, radius * 1.5),
		line(-k, 0),
		_arc(-radius * cos30, -radius * 1.5),
		'Z'
	].join(' ');
};

export const roundedSquare = (size: number, r = ratio) => {
	const k = size / (1 + 2 * r);
	const radius = r * k;
	const _arc = (dX: number, dY: number) =>
		`a${rnd(radius)},${rnd(radius)},0,0,1,${rnd(dX)},${rnd(dY)}`;
	return [
		move(size / 2, size / 2 - radius),
		_arc(-radius, radius),
		line(-k, 0),
		_arc(-radius, -radius),
		line(0, -k),
		_arc(radius, -radius),
		line(k, 0),
		_arc(radius, radius),
		'Z'
	].join(' ');
};
