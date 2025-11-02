# JtcPanel

`JtcPanel` is a React component, instantiable by with:
* `React.createElement( JtcPanel, { onCallAction, playing } )` or
* `<JtcPanel onCallAction={} playing={}/>` in JSX.

This component is a singleton **not intented to be instantiated more than one time at the moment.**

The root HTML element has the unique id: `'jtc-panel'`.

This component accepts 2 props:
* `playing`: A boolean (default: `false`), should be synchronized with the animation status.
* `onCallAction`: A callback to receive all the user actions:
	* `onCallAction( 'save' )`
	* `onCallAction( 'stop' )`
	* `onCallAction( 'addRect' )`
	* `onCallAction( 'play', dur )`: `dur` anim's duration in seconds (`Number`).
	* `onCallAction( 'load', file )`: `file` is a native `File` object received after by the FileFinder popup.
