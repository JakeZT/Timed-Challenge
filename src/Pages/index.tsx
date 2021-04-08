import React, { useEffect, useState } from 'react'
import '../assets/index.scss'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { Students } from '../types/index'
import { storage, fetchData } from '../utils/index'
import { Input, message, Button, Spin } from 'antd'
import { UserOutlined, TagOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { updateDataAction, addTagsAction } from '../store/reducer/index'
import { Container, ContentScroll, Tags, ICON, UserName, UserInfo, InfoItem, Grades } from './style'

interface Props {
	main: Array<Students>
	updateData: (data: string) => Promise<unknown>
	addTagsData: (data: string) => Promise<unknown>
}

const averageNum = (arr: Array<string>) => {
	if (!arr) return 0
	const arrCopy = arr.map((item) => Number(item))
	const total = arrCopy.reduce((prev, cur) => {
		return prev + cur
	}, 0)
	return total / arrCopy.length
}

const _User = function (props: Props) {
	const { main, updateData, addTagsData } = props
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(storage.has() ? storage.get() : [])
	const [tempInfo, setTempInfo] = useState([])
	const [tagInfo, setTagInfo] = useState('')
	const [tagInput, setTagInput] = useState('')
	const [tempTagInput, setTempTagInput] = useState('')
	const [inputVal, setInputVal] = useState('')
	const [shown, setShown] = useState(false)

	useEffect(() => {
		if (data.length === 0 && !storage.get()) {
			fetchData().then((res) => {
				console.log(res?.students)
				storage.set(res?.students as Array<Students>)
				setData(res?.students)
				setLoading(false)
			})
		}
	}, [data])

	const infoHasId = (id: string) => {
		const res = tempInfo.filter((item: Students) => item.id === id)
		return res.length !== 0
	}

	useEffect(() => {
		main.length && setData(main)
		setLoading(false)
	})

	const findUser = (e: React.ChangeEvent<HTMLInputElement>) => {
		const info = e.target.value
		setInputVal(info)
		const rawData = JSON.stringify({ name: info, tags: tagInfo })
		updateData(rawData)
	}

	const showInfo = (index: string) => {
		const tempData = data.filter((item: Students, idx: number) => item.id === index)
		setTempInfo(tempData)
	}

	const selectTag = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setTagInfo(val)
		const rawData = JSON.stringify({ name: inputVal, tags: val })
		updateData(rawData)
	}

	const changeTagInput = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const val = e.target.value
		setTempTagInput(id)
		setTagInput(val)
	}

	const addTags = (id: string) => {
		if (tagInput.length >= 10) {
			message.error('Tags up to 10 characters')
			setTagInput('')
			return
		}
		const data = JSON.stringify({ id, tags: tagInput })
		addTagsData(data)
		message.success('Added successfully', 1)
		setTagInput('')
		const rawData = JSON.stringify({ name: inputVal, tags: tagInfo })
		updateData(rawData)
	}

	return (
		<Container>
			<div className='content_body'>
				<div className='content_body_room'>
					<div style={{ height: '35px' }}>
						<Input value={inputVal} style={{ height: '35px' }} placeholder='Search by name' onChange={findUser} prefix={<UserOutlined />} />
					</div>
					<div style={{ height: '35px' }}>
						<Input value={tagInfo} style={{ height: '35px' }} placeholder='Search by tags' onChange={selectTag} prefix={<TagOutlined />} />
					</div>
					<ContentScroll>
						<Spin tip='Loading...' spinning={loading}>
							{data.length !== 0
								? data?.map((item: Students, index: number) => {
										return (
											<UserInfo key={item.id ? item.id : index} className='clearfix'>
												<div style={{ float: 'left', width: '25%' }}>
													<ICON className='icon' src={item.pic} alt=''></ICON>
												</div>
												<div style={{ float: 'right', width: '75%' }}>
													<UserName>
														<Button
															ghost
															type='primary'
															onClick={() => {
																setShown(!shown)
																showInfo(item.id)
															}}
															style={{
																float: 'right',
																top: 'right',
																right: '10px',
																fontSize: '19px',
															}}
														>
															{shown && infoHasId(item.id) ? <MinusOutlined /> : <PlusOutlined />}
														</Button>
														{item.lastName} {item.firstName}
													</UserName>
													<div style={{ marginLeft: '20px' }}>
														<InfoItem>Email : {item.email}</InfoItem>
														<InfoItem>Company : {item.company}</InfoItem>
														<InfoItem>Skill : {item.skill}</InfoItem>
														<InfoItem>Average : {averageNum(item.grades) + '%'}</InfoItem>
														{shown && tempInfo && infoHasId(item.id) ? (
															<InfoItem>
																{item.grades?.map((item: string, index: number) => {
																	return (
																		<Grades key={item + String(index)}>
																			Test {index + 1} : {item + '%'}
																		</Grades>
																	)
																})}
															</InfoItem>
														) : (
															<div style={{ display: 'none' }}></div>
														)}
														<div>
															{item.tags?.map((content, idx) => {
																return <Tags key={item.id + idx}>{content}</Tags>
															})}
														</div>

														{!shown ? (
															<Input
																value={tempTagInput === item.id ? tagInput : ''}
																placeholder='Add a tag'
																onPressEnter={() => {
																	addTags(item.id)
																}}
																onChange={(e) => {
																	changeTagInput(e, item.id)
																}}
																style={{ backgroundColor: 'rgb(241 241 241)', width: '160px', marginBottom: '20px' }}
															/>
														) : infoHasId(item.id) ? null : (
															<Input
																style={{ backgroundColor: 'rgb(241 241 241)', width: '160px', marginBottom: '20px' }}
																value={tempTagInput === item.id ? tagInput : ''}
																placeholder='Add a tag'
																onPressEnter={() => {
																	addTags(item.id)
																}}
																onChange={(e) => {
																	changeTagInput(e, item.id)
																}}
															/>
														)}
													</div>
												</div>
											</UserInfo>
										)
								  })
								: null}
						</Spin>
					</ContentScroll>
				</div>
			</div>
		</Container>
	)
}

interface CombinedReducer {
	main: {
		data: Array<Students>
	}
}
function mapStateToProps(state: CombinedReducer) {
	return {
		main: state.main,
	}
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		updateData: (data: string) => dispatch(updateDataAction(data)),
		addTagsData: (data: string) => dispatch(addTagsAction(data)),
	}
}
export const User = connect(mapStateToProps, mapDispatchToProps)(_User as React.FC)
