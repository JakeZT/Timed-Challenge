const assert = require('assert')
const { fetch } = require('cross-fetch')
const host = 'XXXXXXXXXXX'

describe('Test whether the data can be successfully obtained', () => {
	it('Res should not be empty', (done) => {
		fetch(host)
			.then((res) => {
				const studentList = res.json()
				if (typeof studentList === 'object') {
					assert(!!studentList)
					assert(res.status === 200)
					done()
				}
			})
			.catch((err) => {
				console.log(err)
				done(err)
			})
	})
})
