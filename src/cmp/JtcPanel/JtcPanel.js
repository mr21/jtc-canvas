"use strict";

function JtcPanel( p ) {
	const {
		playing = false,
		onCallAction = jtcu_fun_noop,
		...props
	} = p;

	const store = useRef( {} ).current;
	const [ dur, setDur ] = useState( 1 );

	store.dur = dur;
	store.onCallAction = onCallAction;

	const onChangeDuration = useCallback( e => {
		setDur( e.target.value );
	}, [] );

	const onFocusDuration = useCallback( e => {
		e.target.select();
	}, [] );

	const onBlurDuration = useCallback( e => {
		const tar = e.target;

		if ( +tar.value < +tar.min ) {
			setDur( +tar.min );
		}
	}, [] );

	const onClickPanel = useCallback( e => {
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
}
