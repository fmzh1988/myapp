/**
 * module2 call Sequence gen id 
 * @author fmzh@sina.cn
 */
require('../utils/sequence')

module.exports = function module2() {
	const sequence2 = new window.Sequence()
	for (let i = 0; i < 2; i++) {
		console.log(sequence2.next())
	}
}