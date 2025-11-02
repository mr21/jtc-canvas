# JtcCanvas

`JtcCanvas` is a React component, instantiable by with:
* `React.createElement( JtcCanvas, { ref, onAnimationEnded } )` or
* `<JtcCanvas ref={} onAnimationEnded={}/>` in JSX.

This component is a singleton **not intented to be instantiated more than one time at the moment.**

The root HTML element has the unique id: `'jtc-canvas'`.

Use a `ref` to access these 5 methodes:
* `addRect()`: Add a random rectangle to the scene.
* `playAnim( sec )`: Play the animation, `sec` is a `Number` representing the duration of the animation.
* `stopAnim()`: Stop the animation.
* `loadScene( obj )`: Load a scene, `obj` is an `Object` containing the different rectangles.
* `stringifyScene()`: Returns a `String` being the serialized data of the scene.

Use the `onAnimationEnded` prop to be noticed when the animation is finished.
This callback is not trigger if the animation is restarted while playing.
