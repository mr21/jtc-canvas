const map = new Map();
const obs = new ResizeObserver( entries => {
	entries.forEach( e => {
		map.get( e.target )
			.forEach( fn => fn( e.contentRect.width, e.contentRect.height ) );
	} );
} );

export function jtcu_dom_observeSize( el, fn ) {
	if ( map.has( el ) ) {
		map.get( el ).push( fn );
	} else {
		map.set( el, [ fn ] );
	}
	obs.observe( el );
};

export function jtcu_dom_unobserveSize( el, fn ) {
	const fns = map.get( el );
	const fnInd = fns?.indexOf( fn );

	if ( fnInd > -1 ) {
		obs.unobserve( el );
		fns.splice( fnInd, 1 );
		if ( fns.length === 0 ) {
			map.delete( el );
		}
	}
};
