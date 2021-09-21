var assert = require('assert')
let { limitToFields,
    nonAvailableFields,
    getFieldsFromModel,
    getQueriableFieldsFromModel,
    hasQuery,
    isArrayOfInts,
} = require('../src/helpers')



describe('Helper functions', function () {
    describe('isArrayOfInts()', function () {
        it("Should return true when given an array of numbers", function () {
            let arr = [1, 2, 3, 4]
            let result = isArrayOfInts(arr)
            assert.equal(result, true)
        })
        it("Should return false when there is a single element not castable into a number", function () {
            let arr = [1, 2, 3, 'Four']
            let result = isArrayOfInts(arr)
            assert.equal(result, false)
        })
        it("Should return false when it is not an array", function (){
            let arr = 'Array'
            let result = isArrayOfInts(arr)
            assert.equal(result, false)
        })
    })
})
