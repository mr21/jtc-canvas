const jtcu_dom_resizeMap = new Map();
const jtcu_dom_resizeObs = new ResizeObserver( entries => {
	entries.forEach( e => {
		jtcu_dom_resizeMap.get( e.target )
			.forEach( fn => fn( e.contentRect.width, e.contentRect.height ) );
	} );
} );

function jtcu_dom_observeSize( el, fn ) {
	if ( jtcu_dom_resizeMap.has( el ) ) {
		jtcu_dom_resizeMap.get( el ).push( fn );
	} else {
		jtcu_dom_resizeMap.set( el, [ fn ] );
	}
	jtcu_dom_resizeObs.observe( el );
}

function jtcu_dom_unobserveSize( el, fn ) {
	const fns = jtcu_dom_resizeMap.get( el );
	const fnInd = fns?.indexOf( fn );

	if ( fnInd > -1 ) {
		jtcu_dom_resizeObs.unobserve( el );
		fns.splice( fnInd, 1 );
		if ( fns.length === 0 ) {
			jtcu_dom_resizeMap.delete( el );
		}
	}
}
