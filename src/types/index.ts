export interface Students {
	city: string
	company: string
	email: string
	firstName: string
	grades: Array<string>
	id: string
	lastName: string
	pic: string
	skill: string
	tags?: Array<string>
}

export interface _studentList {
	students: Array<Students>
}
