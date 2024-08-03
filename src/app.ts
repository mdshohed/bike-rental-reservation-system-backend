import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import cookieParser from "cookie-parser";
import router from './app/routes';

const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5000']}))

// application routes 
app.use('/api/v1', router); 

const test = async(req: Request, res: Response) => {
  Promise.reject();
}

app.get('/', test); 



export default app
