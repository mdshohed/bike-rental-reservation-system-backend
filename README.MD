
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
JWT_ACCESS_SECRET=yourSecretKey
JWT_REFRESH_SECRET=yourSecretKey
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
```


- To Start this project. you have run npm command: `npm run start:dev`

## How to live this project in vercel:
```
npm i -g vercel
vercel -v
vercel login
vercel --prod
-  setup and deploy: - y
-  which scope do you want to deploy to: projects
-  link to existing project: no
-  what's your project's name: bike-rental-reservation-system-server
-  In which directory is your code located: ./
```