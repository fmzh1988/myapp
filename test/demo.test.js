const assert = require('assert')
const Mock = require('mockjs')

const onlineCoding = require('../src/online-coding.js')

const strData = /[a-z][A-Z]/
const extTypeData = ['DigitalUser', 'VirtualUser', 'FaxUser', 'Dept', 'AO']
const mockData = Mock.mock({
	'extensions|10': [{
		'firstName|1-3': strData,
		'lastName|0-2': strData,
		'ext|0-2': strData,
		'extType|1': extTypeData
	}],
	'saleItems|10': [{
		'month|1-12': 0,
		'date|1-31': 0,
		'transationId|+1': 1,
		'salePrice|0-100.0-3': 0
	}]
})
const allKeys = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const usedKeys = [ 2, 3, 4 ]
const unUsedKeys = [ 0, 1, 5, 6, 7, 8, 9 ]

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(-1, [1, 2, 3].indexOf(4))
		})
	})
})
describe('Data', function() {
	describe('#extensions.length()', function() {
		it('should return length is 10', function() {
			console.log(mockData.extensions)
			assert.equal(10, mockData.extensions.length)
		})
	})
	describe('#saleItems.length()', function() {
		it('should return length is 10', function() {
			console.log(mockData.saleItems)
			assert.equal(10, mockData.saleItems.length)
		})
	})
})
describe('online-coding', function() {
	describe('#sortExtensionsByName', function() {
		it('sortExtensionsByName end', function() {
			// var ss = [
			// 	{ firstName: 'fmz', lastName: 'ming', ext: 'ext2', extType: 'DigitalUser'},
			// 	{ firstName: 'fmz', lastName: 'misd', ext: 'ext54', extType: 'VirtualUser'},
			// 	{ firstName: 'fmz', lastName: 'misd', ext: 'ext44', extType: 'FaxUser'},
			// 	{ firstName: 'fmmz', lastName: 'ming', ext: 'ext3', extType: 'Dept'},

			// 	{ firstName: 'fmz', lastName: 'ming', ext: 'exx1', extType: 'DigitalUser'},
			// 	{ firstName: 'ffmz', lastName: 'misd', ext: 'ext1', extType: 'VirtualUser'},
			// 	{ firstName: 'fmz', lastName: 'mifmd', ext: 'ext44', extType: 'FaxUser'},
			// 	{ firstName: 'fmmz', lastName: 'migg', ext: 'ext2', extType: 'AO'},

			// 	{ firstName: 'fmz', lastName: 'ming', ext: 'ext1', extType: 'DigitalUser'},
			// 	{ firstName: 'fsfmz', lastName: 'misd', ext: 'ext1', extType: 'VirtualUser'},
			// 	{ firstName: 'fmz', lastName: 'misdd', ext: 'ext44', extType: 'FaxUser'},
			// 	{ firstName: 'fmmz', lastName: 'ming', ext: 'ext1', extType: 'DigitalUser'}
			// ]

			// onlineCoding.sortExtensionsByName(ss)
			// console.log(ss)
			
			onlineCoding.sortExtensionsByName(mockData.extensions)
			console.log(mockData.extensions)
			assert.ok(true)
		})
	})
	describe('#sortExtensionsByExtType', function() {
		it('sortExtensionsByExtType end', function() {
			onlineCoding.sortExtensionsByExtType(mockData.extensions)
			console.log(mockData.extensions)
			assert.ok(true)
		})
	})
	describe('#sumByQuarter', function() {
		it('sumByQuarter success', function() {
			const result = onlineCoding.sumByQuarter(mockData.saleItems)
			console.log(result)
			assert.equal(4, result.length)
		})
	})
	describe('#averageByQuarter', function() {
		it('averageByQuarter success', function() {
			const result = onlineCoding.averageByQuarter(mockData.saleItems)
			console.log(result)
			assert.equal(4, result.length)
		})
	})
	describe('#module1', function() {
		it('module1 success', function() {
			onlineCoding.module1()
			assert.ok(true)
		})
	})
	describe('#module2', function() {
		it('module2 success', function() {
			onlineCoding.module2()
			assert.ok(true)
		})
	})
	describe('#getUnUsedKeys', function() {
		it('getUnUsedKeys success', function() {
			const result = onlineCoding.getUnUsedKeys(allKeys, usedKeys)
			console.log(result)
			assert.equal(JSON.stringify(unUsedKeys), JSON.stringify(result))
		})
	})
})