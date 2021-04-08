import { Reducer, Dispatch } from 'redux'
import { storage } from '../../utils/index'
import { Students } from '../../types/index'
import { message } from 'antd'

interface SingleReducer {
	main: Array<Students>
}

export let initialState = []

export enum RECORD_ACTION {
	UPDATE_DATA = 'UPDATE_DATA',
	FIND_TAGS = 'FIND_TAGS',
	ADDD_TAGS = 'ADDD_TAGS',
}
export interface UpdateDataAction {
	type: typeof RECORD_ACTION.UPDATE_DATA
	data: Array<Students>
}
export interface AddTagsAction {
	type: typeof RECORD_ACTION.ADDD_TAGS
	data: Array<Students>
}
export interface FindTagsAction {
	type: typeof RECORD_ACTION.FIND_TAGS
	data: Array<Students>
}
export interface DataFilter {
	name: string
	tags: string
}
const lowerCase = (str: string) => {
	return str.toLocaleLowerCase()
}

export const updateDataAction = (rawData: string) => {
	const data: DataFilter = JSON.parse(rawData)
	let { name, tags } = data
	name = lowerCase(name)
	tags = lowerCase(tags)
	return (dispatch: Dispatch, getState: () => SingleReducer) => {
		let Data = storage.get().filter((item: Students) => {
			return lowerCase(item.firstName).includes(name) || lowerCase(item.lastName).includes(name)
		})
		if (data.tags !== '') {
			// 1. Fuzzy search
			Data = Data.filter((item: Students) => {
				if (item.tags) {
					let flag = false
					for (let val of item.tags) {
						if (lowerCase(val).includes(tags)) {
							flag = true
							break
						}
					}
					return flag
				}
			})
			// 2. Precise search (filter)
			const tempData = Data.filter((item: Students) => {
				let flag = false
				if (item.tags)
					for (let val of item.tags) {
						if (lowerCase(val) === tags) {
							flag = true
							break
						}
					}
				return flag
			})
			if (tempData.length !== 0) {
				/*
				Note:
					Normally tag1 can match all the tag10 search,
					but when we searching tag1, we may prefer to possess the exact data,
					thereby the precise search could be more efficient. 
					If it is not required, tempData can be simply commented out.
				*/
				Data = tempData
			}
		}
		if (Data.length === 0) message.error('User not found', 1)
		return dispatch({
			type: RECORD_ACTION.UPDATE_DATA,
			data: Data,
		})
	}
}

export const addTagsAction = (data: string) => {
	return (dispatch: Dispatch, getState: () => SingleReducer) => {
		const info = JSON.parse(data)
		const Data: Array<Students> = []
		storage.get().map((item: Students) => {
			if (item.id === info.id) {
				if (item.tags) {
					item.tags.push(info.tags)
				} else {
					item.tags = [info.tags]
				}
				Data.push(item)
			} else {
				Data.push(item)
			}
		})
		storage.set(Data)
		return dispatch({
			type: RECORD_ACTION.ADDD_TAGS,
			data: Data,
		})
	}
}

const reducer: Reducer<Array<Students>, UpdateDataAction | AddTagsAction | FindTagsAction> = (state = storage.get() || initialState, action) => {
	switch (action.type) {
		case RECORD_ACTION.UPDATE_DATA:
			return action.data
		case RECORD_ACTION.FIND_TAGS:
			return action.data
		case RECORD_ACTION.ADDD_TAGS:
			return action.data
		default:
			return state
	}
}
export { reducer as recordReducer }
