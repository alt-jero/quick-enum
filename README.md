# quick-enum
Make an object immutable, and allow it to be called as a function to check if it contains a specific value.

* Input: A normal object to turn into an immutable enum
* Output: A function with immutably set properties

## Installation
`npm i quick-enum`

## Usage
```javascript
// Require the function
const quickEnum = require('quick-enum')

// Call with an object to create a quick-enum
const MY_ENUM = quickEnum({ FOO: "bar" })

// Check the value of one of the properties...
console.log(MY_ENUM.FOO)              // => "bar"

// Try to set a new value...
console.log(MY_ENUM.FOO = "sjallot") //

// Realize it doesn't work, because enum.
console.log(MY_ENUM.FOO)            // => "bar" (Still)

// Check if "bar" is one of the values...
console.log(MY_ENUM("bar"))        // => true

// Check if "sjallot" is one of the values...
console.log(MY_ENUM("sjallot"))   // => false
```

## Caveat
*Setting a value after instantiation*, will set the value, and it won't be immutable. This could be solvable with Proxy Objects as shown here: https://gist.github.com/jansabbe/fc91b6d9f44770783112 however according to a benchmark here: http://thecodebarbarian.com/thoughts-on-es6-proxies-performance that would be quite a bit slower.


## The Story
After being asked a question about Enums in Javascript, I took it as a challenge to create a simple, elegant and quick way to create an Enum-like thing which would
* work like an object in terms of reading property values
* be easy to setup
* be easily queriable as to check if a value existed within it (The original question)

After being told to nevermind, I didn't want to let go of the challenge that easily... And so, after a few minutes this was born. The quick-enum. :D