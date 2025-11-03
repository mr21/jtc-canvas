export function jtcu_fun_noop() {};

export function jtcu_fun_getNow() {
	return Date.now() / 1000;
};

type ObjInterv = number | {
	id: any,
};

export function jtcu_fun_setInterval( fn: () => void, sec: number ) {
	const ms = Math.max( 0, sec * 1000 | 0 );

	if ( ms ) {
		return setInterval( fn, ms );
	}

	const obj: ObjInterv = { id: null };
	const objLock = Object.seal( obj );
	const fn2 = () => {
		fn();
		if ( objLock.id !== false ) {
			objLock.id = requestAnimationFrame( fn2 );
		}
	};

	fn2();
	return objLock;
};

export function jtcu_fun_clearInterval( id: ObjInterv ) {
	if ( typeof id === 'number' ) {
		clearInterval( id );
	} else if ( id ) {
		cancelAnimationFrame( id.id );
		id.id = false;
	}
};
