declare const React: any;
import {
	jtcu_fun_noop,
	jtcu_data_loadFile,
} from '../../utils/index.js';

const {
	useRef,
	useState,
	useCallback,
	createElement: cE,
} = React;

type props = {
	playing: boolean,
	onCallAction: ( act: string, arg0: any ) => void,
};

export function JtcPanel( p: props ) {
	const {
		playing,
		onCallAction,
		...props
	} = p;

	const store = useRef( {} ).current;
	const [ dur, setDur ] = useState( 1 );

	store.dur = dur;
	store.onCallAction = onCallAction;

	const onChangeDuration = useCallback( ( e: any ) => {
		setDur( e.target.value );
	}, [] );

	const onFocusDuration = useCallback( ( e: any ) => {
		e.target.select();
	}, [] );

	const onBlurDuration = useCallback( ( e: any ) => {
		const tar = e.target;

		if ( +tar.value < +tar.min ) {
			setDur( +tar.min );
		}
	}, [] );

	const onClickPanel = useCallback( ( e: any ) => {
		const act = e.target.dataset.action;

		switch ( act ) {
			case 'save':
			case 'stop':
			case 'addRect': store.onCallAction( act ); break;
			case 'play': store.onCallAction( act, store.dur ); break;
			case 'load': jtcu_data_loadFile().then( file => store.onCallAction( act, file ) ); break;
		}
	}, [] );

	return cE( 'div', { ...props, id: 'jtc-panel', onClick: onClickPanel },
		cE( 'button', { 'data-action': 'addRect' }, 'Add rectangle' ),
		cE( 'hr', null ),
		cE( 'label', null,
			cE( 'span', null, 'Duration (sec)' ),
			cE( 'input', { type: 'number', min: .1, step: .1, value: dur, onChange: onChangeDuration, onFocus: onFocusDuration, onBlur: onBlurDuration } ),
		),
		cE( 'button', { 'data-action': 'play' }, playing ? 'Restart' : 'Start' ),
		cE( 'button', { 'data-action': 'stop', disabled: !playing }, 'Stop' ),
		cE( 'hr', null ),
		cE( 'button', { 'data-action': 'load' }, 'Load' ),
		cE( 'button', { 'data-action': 'save' }, 'Save (json)' ),
	);
};
