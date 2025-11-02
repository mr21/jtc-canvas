"use strict";

const JtcCanvas = React.forwardRef( ( p, ref ) => {
	const cnvRef = useRef();
	const store = useRef( {} ).current;

	store.rects ||= {};
	store.animId ||= null;
	store.nbRects ||= 0;
	store.animDur ||= 1;
	store.animStarted ??= false;
	store.animProgress ??= 0;
	store.animStartTime ||= 0;

	const loadScene = useCallback( obj => {
		store.rects = jtcu_data_jsonCopy( obj );
		store.nbRects = Object.keys( store.rects ).length;
		redraw();
	}, [] );

	const stringifyScene = useCallback( () => {
		return JSON.stringify( store.rects );
	}, [] );

	const addRect = useCallback( () => {
		store.rects[ jtcu_data_getNextId( store.rects ) ] = {
			x: 5 + jtcu_math_randomInt( 90 ),
			y: 5 + jtcu_math_randomInt( 90 ),
			z: store.nbRects,
			w: 5 + jtcu_math_randomInt( 25 ),
			h: 5 + jtcu_math_randomInt( 25 ),
			rad: jtcu_math_randomFloat( Math.PI ),
			col: jtcu_math_randomRGB(),
		};
		++store.nbRects;
		redraw();
	}, [] );

	const stopAnim = useCallback( () => {
		jtcu_fun_clearInterval( store.animId );
		store.animId = null;
		store.animStarted = false;
		store.animProgress = 0;
		redraw();
	}, [] );

	const frameAnim = useCallback( () => {
		store.animProgress = Math.min( ( jtcu_fun_getNow() - store.animStartTime ) / store.animDur, 1 );
		store.animProgress < 1 ? redraw() : stopAnim();
	}, [] );

	const playAnim = useCallback( dur => {
		stopAnim();
		store.animDur = dur;
		store.animStarted = true;
		store.animStartTime = jtcu_fun_getNow();
		store.animId = jtcu_fun_setInterval( frameAnim, 0 );
	}, [] );

	const onResize = useCallback( ( w, h ) => {
		cnvRef.current.width = w;
		cnvRef.current.height = h;
		redraw();
	}, [] );

	const redraw = useCallback( () => {
		const cnv = cnvRef.current;
		const ctx = cnv.getContext( '2d' );
		const w = cnv.width;
		const h = cnv.height;
		const animRad = store.animProgress * 2 * Math.PI;
		const arrRects = Object.values( store.rects ).sort( ( a, b ) => a.z - b.z );

		ctx.clearRect( 0, 0, w, h );
		arrRects.forEach( r => {
			const rx = r.x / 100 * w;
			const ry = r.y / 100 * h;
			const rw = r.w / 100 * w;
			const rh = r.h / 100 * h;

			ctx.save();
				ctx.beginPath();
					ctx.translate( rx, ry );
						ctx.rotate( r.rad + animRad );
							ctx.rect( -rw / 2, -rh / 2, rw, rh );
				ctx.fillStyle = r.col;
				ctx.fill();
			ctx.restore();
		} );
	}, [] );

	const onClickCanvas = useCallback( e => {
		const cnv = e.target;
		const bcr = cnv.getBoundingClientRect();
		const mx = e.clientX - bcr.x;
		const my = e.clientY - bcr.y;
		const w = cnv.width;
		const h = cnv.height;
		const animRad = store.animProgress * 2 * Math.PI;
		const rect = Object.entries( store.rects )
			.sort( ( a, b ) => b[ 1 ].z - a[ 1 ].z )
			.find( ( [ id, r ] ) => (
				jtcu_math_clickRect( mx, my, {
					x: r.x / 100 * w,
					y: r.y / 100 * h,
					w: r.w / 100 * w,
					h: r.h / 100 * h,
					rad: r.rad + animRad,
				} )
			) );

		if ( rect ) {
			store.rects[ rect[ 0 ] ].col = jtcu_math_randomRGB();
			redraw();
		}
	}, [] );

	useEffect( () => {
		const cnv = cnvRef.current;
		const root = cnv.parentNode;

		root.addRect = addRect;
		root.playAnim = playAnim;
		root.stopAnim = stopAnim;
		root.loadScene = loadScene;
		root.stringifyScene = stringifyScene;
		jtcu_dom_observeSize( cnv, onResize );
		return () => {
			jtcu_dom_unobserveSize( cnv, onResize );
			jtcu_fun_clearInterval( store.animId );
		};
	}, [] );

	return cE( 'div', { ...p, id: 'jtc-canvas', ref },
		cE( 'canvas', { ref: cnvRef, onClick: onClickCanvas } ),
		// cE( 'div', { id: 'jtc-canvas-cross-center' } ),
	);
} );
