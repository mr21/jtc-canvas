function jtcu_fun_getNow() {
	return Date.now() / 1000;
}

function jtcu_fun_setInterval( fn, sec ) {
	const ms = Math.max( 0, sec * 1000 | 0 );

	if ( ms ) {
		return setInterval( fn, ms );
	}

	const obj = Object.seal( { id: null } );
	const fn2 = () => {
		fn();
		if ( obj.id !== false ) {
			obj.id = requestAnimationFrame( fn2 );
		}
	};

	fn2();
	return obj;
}

function jtcu_fun_clearInterval( id ) {
	if ( id && typeof id === 'object' ) {
		cancelAnimationFrame( id.id );
		id.id = false;
	} else {
		clearInterval( id );
	}
}
