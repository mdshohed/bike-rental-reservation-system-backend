
## Project Description
This a bike rental system where users could easily rent bikes online. User would be able to handle user registrations, bike availability, and booking management efficiently.

## Technology Stack:
- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Zod, Mongoose for MongoDB

## npm package
- dotenv
- cors(dependencies/devDependencies)
- express(dependencies/devDependencies)
- mongoose
- cookie-parser(dependencies/devDependencies)
- Zod
- eslint
- prettier
- http-status
- jsonwebtoken(dependencies/devDependencies)
- bcrypt(dependencies/devDependencies)


## how to run this project

- first of all clone this project from github. Then go to project path and install npm package.

```
git clone 
cd e-commerce-backend-api
npm install
```

- Next, You will need to setup .env file where you have to setup this process config file: 

```
NODE_ENV=development 
PORT=5000
DATABASE_URL=database url
BCRYPT_SALT_ROUNDS=10
DEFAULT_PASS=usingYourPassword
JWT_ACCESS_SECRET=67e21288464ac4664704098d0ed1f4fa5f26d2027233e613af7b933b772148a9
JWT_REFRESH_SECRET=0f137fa6214d9ff5e01b201402e6170f1af5b6f17a7607e4dbe49016a31817f02e1677aca8738f22a5e048f43dbfa9b94d29d3605eb55e48525a068aa371ac2f
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
```


- To Start this project. you have run npm command: `npm run start:dev`