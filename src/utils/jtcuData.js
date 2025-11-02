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

function jtcu_data_jsonCopy( obj ) {
	return JSON.parse( JSON.stringify( obj ) );
}

function jtcu_data_downloadURL( name, url ) {
	const a = document.createElement( 'a' );

	a.setAttribute( 'href', url );
	a.setAttribute( 'download', name );
	a.setAttribute( 'target', '_blank' );
	document.body.append( a );
	a.click();
	a.remove();
}

function jtcu_data_downloadText( name, txt ) {
	jtcu_data_downloadURL( name, URL.createObjectURL( new Blob( [ txt ] ) ) );
}

function jtcu_data_loadFile() {
	return new Promise( ( res, rej ) => {
		const inp = document.createElement( 'input' );

		inp.setAttribute( 'type', 'file' );
		inp.onchange = e => res( inp.files[ 0 ] );
		inp.click();
	} );
}

function jtcu_data_readFile( file ) {
	return new Promise( ( res, rej ) => {
		const fr = new FileReader();

		fr.onload = () => res( fr.result );
		fr.onerror = () => rej( 'Error reading the file. Please try again.', 'error' );
		fr.readAsText( file );
	} );
}

function jtcu_data_readJSONFile( file ) {
	return jtcu_data_readFile( file ).then( s => JSON.parse( s ) );
}
