# utils

## jtcu_fun_xxx

* `jtcu_fun_noop()`: A no-operation function.
* `jtcu_fun_getNow()`: A function to get the current time in seconds.
* `jtcu_fun_setInterval( fn, sec )`: Like the native `setInterval` but in seconds instead of ms + if the seconds is `0` then `requestAnimationFrame` is used to be as fast as possible.
* `jtcu_fun_clearInterval( obj )`: Like the native `clearInterval` except that it could call `cancelAnimationFrame` depending of the situation.

## jtcu_math_xxx

* `jtcu_math_inRange( x, a, b )`: Returns `true` if `x` is between `a` and `b` (inclusive), `a` and `b` don't need to be in the correct order.
* `jtcu_math_clickRect( mx, my, r )`: Return a `true` if the point (`mx`, `my`) is inside the rotated rectangle (`r`).
* `jtcu_math_randomFloat( rng )`: Get a random `Float` between `0` and `rng` (default `2^32`).
* `jtcu_math_randomInt( rng )`: Get a random `Int` between `0` and `rng` (default `2^32`).
* `jtcu_math_randomPick( arr )`: Get a random item from an `Array`.
* `jtcu_math_randomRGB()`: Get a random RGB color like `#21ab89`.

## jtcu_dom_xxx

* `jtcu_dom_observeSize( el, fn )`: Get notified when the element `el` is resized.
* `jtcu_dom_unobserveSize( el, fn )`: Free the observation.

## jtcu_data_xxx

* `jtcu_data_newArray( l, fn )`: A shortcut to easely create and fill an Array. The optional function `fn` can be used to fill the array one by one. If `fn` is not a `Function` and different of `undefined` then the array will be filled with this value.
* `jtcu_data_getNextId( obj )`: Get the next free key from an object, the key will be a string containing an int.
* `jtcu_data_jsonCopy( obj )`: Copy an object by using the JSON api.
* `jtcu_data_downloadURL( name, url )`: Download from an URL.
* `jtcu_data_downloadText( name, txt )`: Download from a text file.
* `jtcu_data_loadFile()`: Open the native fileFinder popup, returns a `Promise` with the selected file.
* `jtcu_data_readFile( file )`: Read a file, returns a `Promise` with the text data.
* `jtcu_data_readJSONFile( file )`: Read a JSON file, returns a `Promise` with the parsed data.
