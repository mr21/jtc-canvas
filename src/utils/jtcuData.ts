export function jtcu_data_newArray( l: number, fn: Function ) {
	return fn === undefined
		? new Array( l )
		: typeof fn === 'function'
			? Array.from( { length: l }, ( _, i ) => fn( i ) )
			: Array.from( { length: l } ).fill( fn );
};

export function jtcu_data_getNextId( obj: Object ) {
	let i = 0;

	for ( ; i in obj; ++i ) {}
	return `${ i }`;
};

export function jtcu_data_jsonCopy( obj: any ) {
	return JSON.parse( JSON.stringify( obj ) );
};

export function jtcu_data_downloadURL( name: string, url: string ) {
	const a = document.createElement( 'a' );

	a.setAttribute( 'href', url );
	a.setAttribute( 'download', name );
	a.setAttribute( 'target', '_blank' );
	document.body.append( a );
	a.click();
	a.remove();
};

export function jtcu_data_downloadText( name: string, txt: string ) {
	jtcu_data_downloadURL( name, URL.createObjectURL( new Blob( [ txt ] ) ) );
};

export function jtcu_data_loadFile() {
	return new Promise( ( res, rej ) => {
		const inp = document.createElement( 'input' );

		inp.setAttribute( 'type', 'file' );
		inp.onchange = e => res( inp.files?.[ 0 ] );
		inp.click();
	} );
};

export function jtcu_data_readFile( file: File ) {
	return new Promise( ( res, rej ) => {
		const fr = new FileReader();

		fr.onload = () => res( fr.result );
		fr.onerror = () => rej( 'Error reading the file. Please try again.' );
		fr.readAsText( file );
	} );
};

export function jtcu_data_readJSONFile( file: File ) {
	return jtcu_data_readFile( file ).then( s => JSON.parse );
};
