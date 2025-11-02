"use strict";

function Jtc() {
	const rootRef = useRef();

	const onCallAction = useCallback( ( act, arg0 ) => {
		const cnv = rootRef.current.querySelector( 'canvas' );

		switch ( act ) {
			case 'addRect': cnv.addRect(); break;
			// case 'addRect': for ( let i = 0; i < 10; ++i ) cnv.addRect(); break;
			case 'play': cnv.playAnim( arg0 ); break;
			case 'stop': cnv.stopAnim(); break;
			case 'load': jtcu_data_readJSONFile( arg0 ).then( obj => cnv.loadScene( obj ), () => alert( 'JSON corrupted' ) ); break;
			case 'save': jtcu_data_downloadText( 'jtc-data.json', cnv.stringifyScene() ); break;
		}
	}, [] );

	return cE( 'div', { id: 'jtc', ref: rootRef },
		cE( JtcCanvas ),
		cE( JtcPanel, { onCallAction } ),
	);
}
