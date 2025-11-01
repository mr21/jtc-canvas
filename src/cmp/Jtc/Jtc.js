"use strict";

function Jtc() {
	const rootRef = useRef();

	const onCallAction = useCallback( ( act, ...args ) => {
		const cnv = rootRef.current.querySelector( 'canvas' );

		switch ( act ) {
			case 'addRect': cnv.addRect(); break;
			// case 'addRect': for ( let i = 0; i < 10; ++i ) cnv.addRect(); break;
			case 'play': cnv.playAnim( args[ 0 ] ); break;
			case 'save': break;
		}
	}, [] );

	return cE( 'div', { id: 'jtc', ref: rootRef },
		cE( JtcCanvas ),
		cE( JtcPanel, { onCallAction } ),
	);
}
