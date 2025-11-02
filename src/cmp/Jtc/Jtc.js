"use strict";

function Jtc() {
	const [ playing, setPlaying ] = useState( false ); 

	const canvasRef = useRef();

	const onAnimationEnded = useCallback( () => setPlaying( false ), [] );
	const onCallAction = useCallback( ( act, arg0 ) => {
		const cnv = canvasRef.current;

		switch ( act ) {
			case 'addRect': cnv.addRect(); break;
			case 'play': setPlaying( true ); cnv.playAnim( arg0 ); break;
			case 'stop': cnv.stopAnim(); break;
			case 'load': jtcu_data_readJSONFile( arg0 ).then( obj => cnv.loadScene( obj ), () => alert( 'JSON corrupted' ) ); break;
			case 'save': jtcu_data_downloadText( 'jtc-data.json', cnv.stringifyScene() ); break;
		}
	}, [] );

	return cE( 'div', { id: 'jtc' },
		cE( JtcCanvas, { onAnimationEnded, ref: canvasRef } ),
		cE( JtcPanel, { playing, onCallAction } ),
	);
}
