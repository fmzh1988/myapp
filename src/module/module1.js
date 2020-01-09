/**
 * module1 call Sequence gen id 
 * @author fmzh@sina.cn
 */
require('../utils/sequence')

module.exports = function module1() {
	const sequence1 = new window.Sequence()
	for (let i = 0; i < 2; i++) {
		console.log(sequence1.next())
	}
}