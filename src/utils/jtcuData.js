function jtcu_data_newArray( l, fn ) {
	return fn === undefined
		? new Array( l )
		: typeof fn === 'function'
			? Array.from( { length: l }, ( _, i ) => fn( i ) )
			: Array.from( { length: l } ).fill( fn );
}

function jtcu_data_getNextId( obj ) {
	let i = 0;

	for ( ; i in obj; ++i ) {}
	return `${ i }`;
}
