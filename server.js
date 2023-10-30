import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

//app config
dotenv.config()
const app = express()
// const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);
app.use(express.static('public'))
//middlewares
app.use(express.json())
app.use(cors())
const port = 3069;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//db config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("DB Connected")
    }
})

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)
// app.use('/*')

app.get('*', (req, res) => {
    res,sendFile(__dirname + '/public/index.html')
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//listen
app.listen(process.env.PORT || port, () => console.log(`Listening on localhost:${port}`))