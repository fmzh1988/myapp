const constant = require('./constant.js')

/**
 * compare
 *
 * @keyHandler method of key-format 
 * @equalHandler handler of equal when there are more than one to sort
 */
function compareBase(keyHandler, equalHandler) {
	return function(o, p) {
		let a, b
		a = keyHandler(o)
		b = keyHandler(p)

		if (a === b) {
			if (equalHandler) return equalHandler(o, p)
			return 0
		}
	 	if (typeof a === typeof b) return a < b ? -1 : 1
	 	return typeof a < typeof b ? -1 : 1
	}
}

/**
 * compare by columns
 *
 * @name is array of order names 
 */
function compare(name) {

	if (!name || !name instanceof Array) throw('the type of in-param is not array ')

	const keyHandler = function(data) {
		if (data && typeof data === 'object') {
			return data[name[0]]
		} else {
			throw('key is null or is not object, please check !')
		}
	}

	const equalHandler = function(o, p) {
		let tmp = []
		Object.assign(tmp, name)
		return tmp.length>1 ? compare(tmp.splice(1))(o, p) : 0
	}

	return compareBase(keyHandler, equalHandler)
}

/**
 * compare by extType
 */
function compareByExtType() {

	const keyHandler = function(data) {
		if (data && typeof data === 'object') {
			return constant.enumExtType[data.extType]
		} else {
			throw('key is null or is not object, please check !')
		}
	}

	return compareBase(keyHandler)
}

/**
 * padding bits
 */
function padStart(a){
	return a && a < 10 ? '0' + a : a + '' 
}

/**
 * utils method
 *
 * compare
 * compareByExtType
 * padStart
 *
 * @author fmzh@sina.cn
 */
module.exports = {
	compare,
	compareByExtType,
	padStart
}