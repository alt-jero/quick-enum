/**
 * Make an object immutable, and allow it to be called as a function
 * @author Jeremy Rumble <jero.rumble@gmail.com>
 * @param {Object} object A normal object to turn into an immutable enum
 * @returns {Function} A function (object) with properties, which will check
 * if any of its properties are equal to the passed value.
 * 
 * const MY_ENUM = createEnum({ FOO: "bar" })
 * MY_ENUM.FOO              // => "bar"
 * MY_ENUM.FOO = "sjallot" //
 * MY_ENUM.FOO            // => "bar" (Still)
 * MY_ENUM("bar")        // => true
 * MY_ENUM("sjallot")   // => false
 */
function createEnum(object) {
  /**
   * An object using the keys of the passed-in object as values, and the values as keys.
   */
  const inversion = Object
    // Get keys of passed object
    .keys(object)
    // Convert array of keys to another object, inverted.
    // Arrow-function implicitly returns an object...      :: ({ this: "notation" })
      /// including all previous iterations                :: ...prev
      /// And using object[key] (so, the value) as the key :: [variableAsKeyname]
      /// and the (original) key itself as the value       :: : value
    .reduce( (prev, key) => ({ ...prev, [object[key]]: key }), {})
  
  /**
   * Check if value is present in enum
   * @param {*} value the value to check
   */
  const checker = (value) => inversion[value] ? true : false

  // Compile the passed-in object as getters on the checker function
  Object.keys(object).forEach( key => {
    Object.defineProperty(
      checker,
      key,
      { 
        // This creates a getter-function
        get: () => object[key]
        // With no setter-function, this cannot be easily/accidentally overridden
      }
    )
  })
  
  // And return the checker - A function that funcions as an immutable object.
  return checker
}

module.exports = createEnum