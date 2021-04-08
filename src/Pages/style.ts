import styled from 'styled-components'
export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: -webkit-linear-gradient(left top, #67c8b7, #3577cd);
`
export const ContentScroll = styled.div`
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	height: calc(100% - 70px);
	border-bottom: 1px #f1f2f3 solid;
	padding: 5px;
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: #1bb2b7;
	}
	&::-webkit-scrollbar-track {
		border-radius: 10px;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: #c2eeed;
	}
`
export const Tags = styled.span`
	margin-bottom: 5px;
	display: inline-block;
	min-width: 40px;
	max-width: 70px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background-color: #dddcdd;
	margin-right: 10px;
	border-radius: 5px;
`

export const UserName = styled.h1``
export const Grades = styled.div``
export const InfoItem = styled.div``

export const UserInfo = styled.span`
	border-bottom: 1px solid gray;
`
export const ICON = styled.img`
	border: 1px solid rgb(209 210 214);
	width: 100px;
	margin-left: 20%;
	height: 100px;
	border-radius: 50%;
	margin-top: 30px;
`
