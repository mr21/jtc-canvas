"use strict";

function JtcPanel( p ) {
	const store = useRef( {} ).current;
	const [ dur, setDur ] = useState( 1 );

	store.dur = dur;

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
			case 'addRect': p.onCallAction( act ); break;
			case 'play': p.onCallAction( act, store.dur ); break;
		}
	}, [] );

	return cE( 'div', { id: 'jtc-panel', onClick: onClickPanel },
		cE( 'button', { 'data-action': 'addRect' }, 'Add rectangle' ),
		cE( 'hr', null ),
		cE( 'label', null,
			cE( 'span', null, 'Duration (sec)' ),
			cE( 'input', { type: 'number', min: .1, step: .1, value: dur, onChange: onChangeDuration, onFocus: onFocusDuration, onBlur: onBlurDuration } ),
		),
		cE( 'button', { 'data-action': 'play' }, 'Play' ),
		cE( 'hr', null ),
		cE( 'button', { 'data-action': 'save' }, 'Download .json' ),
	);
}
