type ObsFun = ( w: number, h: number ) => void;

const map = new Map();
const obs = new ResizeObserver( entries => {
	entries.forEach( e => {
		map.get( e.target )
			.forEach( ( fn: ObsFun ) => fn( e.contentRect.width, e.contentRect.height ) );
	} );
} );

export function jtcu_dom_observeSize( el: HTMLElement, fn: ObsFun ) {
	if ( map.has( el ) ) {
		map.get( el ).push( fn );
	} else {
		map.set( el, [ fn ] );
	}
	obs.observe( el );
};

export function jtcu_dom_unobserveSize( el: HTMLElement, fn: ObsFun ) {
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
