import { Students } from '../types/index'
import faker from 'faker'

export const createData = () => {
	const arr: Array<Students> = []
	for (let idx = 1; idx <= 35; idx++) {
		const tempData = {
			id: idx.toString(),
			city: faker.address.city(),
			company: faker.company.companyName(),
			email: faker.internet.email(),
			firstName: faker.name.firstName(),
			grades: new Array(8).fill(0).map((val) => {
				return (Math.floor(Math.random() * 40) + 60).toString()
			}),
			lastName: faker.name.lastName(),
			pic: faker.image.avatar(),
			skill: faker.name.jobTitle(),
		}
		arr.push(tempData)
	}
	return {
		students: arr,
	}
}
