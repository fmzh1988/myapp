/**
 * Sequence to generate id
 *
 * @author fmzh@sina.cn
 */
(function(win) {
	const Sequence = function(){}

	function* genId(){
	    let current = 0
	    while (true) {
	        current++
	        yield current
	    }
	}

	let g = genId()

	Sequence.prototype.next = function() {
		return g.next().value
	}

	if (!win.Sequence) win.Sequence = Sequence
})(window)

module.exports = window.Sequence