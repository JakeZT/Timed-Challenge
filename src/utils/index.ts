import { Students } from '../types/index'
import { fetch } from 'cross-fetch'
import { createData } from './data'
import { _studentList } from '../types/index'
class _Storage {
	set = (content: Array<Students>) => {
		let name = 'studentList'
		let newData: string = ''
		if (!name) return
		if (typeof content !== 'string') {
			newData = JSON.stringify(content)
		}
		localStorage.setItem(name, newData)
	}
	get = (name = 'studentList') => {
		if (!name) return
		const rawData = localStorage.getItem(name) as string
		return JSON.parse(rawData)
	}
	has = (name = 'studentList') => {
		return !!localStorage.getItem(name)
	}
	del = (name = 'studentList') => {
		if (!name) return
		localStorage.removeItem(name)
	}
}

export const storage = new _Storage()

const Test = false
export const fetchData = async () => {
	try {
		if (Test) {
			const res = await fetch('XXXXXXXXX')
			const studentList = res.json() as unknown
			if (typeof studentList === 'object') {
				return studentList as _studentList
			}
		}
		return createData() as _studentList
	} catch (err) {
		console.log(err)
	}
}
