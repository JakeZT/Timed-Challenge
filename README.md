# Student Information Management Web App

> ### This is a five hours challenge

### Short Description

> This is a  front end responsive web application challenge, built by **Typescript, React, Redux, etc.**



### Features

- Used functional Components.
- Supports real-time enquiries.
- Supports both fuzzy queries and precise queries.
- Responsive web design pattern.
- Message Alerts.
- Local storage mechanism



### Stack

+ Language: [Typescript](https://www.typescriptlang.org/)

- Front End Framework: [React](https://reactjs.org/)
- UI Components:  [Ant Design](https://ant.design/components/overview/)
- Styling: [styled-components](https://styled-components.com/) & [SASS](https://sass-lang.com/)
- Code Formatting: [Prettier](https://prettier.io/)
- Unit Test: [Mocha](https://mochajs.org/)



### Install & Run

1. **Install the dependencies**

   ```js
   > yarn
   ```

2. **Run**

   ```js
   > npm run start
   ```

3.  Listening Post is : 3000



## Unit Test

1. command

   ```js
   >npm run test   // host is not supported currently
   ```





## Data Model & Dispatch Actions

+ Created some fake data

  + ```tsx
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
    ```

+ student Model

  + ```js
    interface Students {
    	city: string
    	company: string
    	email: string
    	firstName: string
    	grades: Array<string>
    	id: string
    	lastName: string
    	pic: string
    	skill: string
    	tags: Array<string>
    }
    ```

+ Redux Actions

  + ```tsx
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
    ```



## Screen-shots

### Responsive Interface

+ **Full Size**
  
  + ![Snipaste_2021-04-08_18-16-03](README.assets/Snipaste_2021-04-08_18-16-03.png)
  
+ **Medium Size**
  
  + ![Snipaste_2021-04-08_18-17-00](README.assets/Snipaste_2021-04-08_18-17-00.png)
  
+ **iPad Size**

  + ![Snipaste_2021-04-08_18-17-28](README.assets/Snipaste_2021-04-08_18-17-28.png)

  

+ **Mobile Size**
  
  + ![Snipaste_2021-04-08_18-17-16](README.assets/Snipaste_2021-04-08_18-17-16-1617920276727.png)