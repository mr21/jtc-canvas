declare const React: any;
import {
	jtcu_data_readJSONFile,
	jtcu_data_downloadText,
} from'../../utils/index.js';

const {
	useRef,
	useState,
	useCallback,
	createElement: cE,
} = React;

import { JtcPanel } from '../JtcPanel/JtcPanel.js';
import { JtcCanvas } from '../JtcCanvas/JtcCanvas.js';

export function Jtc( p: object ) {
	const canvasRef = useRef();

	const [ playing, setPlaying ] = useState( false ); 

	const onAnimationEnded = useCallback( () => setPlaying( false ), [] );
	const onCallAction = useCallback( ( act: string, arg0: any ) => {
		const cnv = canvasRef.current;

		switch ( act ) {
			case 'addRect': cnv.addRect(); break;
			case 'play': setPlaying( true ); cnv.playAnim( arg0 ); break;
			case 'stop': cnv.stopAnim(); break;
			case 'load': jtcu_data_readJSONFile( arg0 ).then( obj => cnv.loadScene( obj ), () => alert( 'JSON corrupted' ) ); break;
			case 'save': jtcu_data_downloadText( 'jtc-data.json', cnv.stringifyScene() ); break;
		}
	}, [] );

	return cE( 'div', { ...p, id: 'jtc' },
		cE( JtcCanvas, { onAnimationEnded, ref: canvasRef } ),
		cE( JtcPanel, { playing, onCallAction } ),
	);
};
