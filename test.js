const process = require('process')
const qe = require('./index')

console.log('Testing quick-enum')

const stats = {
  passed: 0,
  failed: 0,
  total: 0,
}

const tests = [
  {
    name: "Create Enum",
    test() { const MY_ENUM = qe({ FOO: "bar" }) }
  },
  {
    name: "Read value",
    test() {
      const MY_ENUM = qe({ FOO: "bar" })
      if(MY_ENUM.FOO !== 'bar') throw new Error(`Expected MY_ENUM.FOO to equal "bar"; instead got: ${MY_ENUM.FOO}`)
    }
  },
  {
    name: "Set value",
    test() {
      const MY_ENUM = qe({ FOO: "bar" })
      MY_ENUM.FOO = 'sjallot'
      if(MY_ENUM.FOO !== 'bar') throw new Error(`Expected MY_ENUM.FOO to equal "bar"; instead got: ${MY_ENUM.FOO}`)
    }
  },
  {
    name: "Check if value exists (positive assertion)",
    test() {
      const MY_ENUM = qe({ FOO: "bar" })
      if(!MY_ENUM('bar')) throw new Error(`Expected MY_ENUM to contain value "bar"`)
    }
  },
  {
    name: "Check if value doesn't exist (negative assertion)",
    test() {
      const MY_ENUM = qe({ FOO: "bar" })
      MY_ENUM.FOO = 'sjallot'
      if(MY_ENUM('sjallot')) throw new Error(`Expected MY_ENUM not to contain value "sjallot"`)
    }
  },
]

tests.forEach(test => {
  try {
    test.test()
    stats.passed ++
    console.log(`Test: ${test.name} :: PASS`)
  } catch(e) {
    stats.failed ++
    console.log(`Test: ${test.name} :: FAIL`)
    console.log(`=== Error info start ===`)
    console.log(e)
    console.log(`=== Error info end ===`)
  }
  stats.total ++
})

console.log(`Finished testing quick-enum.`)
console.log(`Of ${stats.total} tests, ${stats.passed} passed and ${stats.failed} failed.`)

if(stats.failed > 0) {
  console.log(`Some tests failed. Exitiing with error code 1.`)
  process.exit(1)
} else {
  console.log(`All tests passed. Exiting with code zero.`)
  process.exit()
}