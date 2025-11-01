function jtcu_math_inRange( x, a, b ) {
	return a < b
		? a <= x && x <= b
		: b <= x && x <= a;
}

function jtcu_math_clickRect( mx, my, r ) {
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
}

function jtcu_math_randomFloat( rng = 2 ** 32 ) {
	return Math.random() * rng;
}

function jtcu_math_randomInt( rng ) {
	return Math.floor( jtcu_math_randomFloat( rng ) );
}

function jtcu_math_randomPick( arr ) {
	return arr[ jtcu_math_randomInt( arr.length ) ];
}

function jtcu_math_randomRGB() {
	return `#${ jtcu_data_newArray( 6, () => jtcu_math_randomPick( '0123456789abcdef' ) ).join( '' ) }`;
}
