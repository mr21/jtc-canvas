import { jtcu_data_newArray } from './jtcuData.js';

export type jtcu_math_rect = {
	x: number,
	y: number,
	z: number,
	w: number,
	h: number,
	rad: number,
	col?: string,
};

export function jtcu_math_inRange( x: number, a: number, b: number ) {
	return a < b
		? a <= x && x <= b
		: b <= x && x <= a;
};

export function jtcu_math_clickRect( mx: number, my: number, r: jtcu_math_rect ) {
	const xax = Math.cos( -r.rad );
	const xay = Math.sin( -r.rad );
	const x = mx - r.x;
	const y = my - r.y;
	const x2 = ( xax * x - xay * y ) / r.w + .5;
	const y2 = ( xay * x + xax * y ) / r.h + .5;

	return (
		jtcu_math_inRange( x2, 0, 1 ) &&
		jtcu_math_inRange( y2, 0, 1 )
	);
};

export function jtcu_math_randomFloat( rng = 2 ** 32 ) {
	return Math.random() * rng;
};

export function jtcu_math_randomInt( rng: number ) {
	return Math.floor( jtcu_math_randomFloat( rng ) );
};

export function jtcu_math_randomPick( arr: Array<any> | string ) {
	return arr[ jtcu_math_randomInt( arr.length ) ];
};

export function jtcu_math_randomRGB() {
	return `#${ jtcu_data_newArray( 6, () => jtcu_math_randomPick( '0123456789abcdef' ) ).join( '' ) }`;
};
