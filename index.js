import connectToMongo from "./Database/db.js";
import express from "express"
import auth from "./routes/auth.js"
import notes from "./routes/notes.js"
import cors from "cors"


connectToMongo();
const app = express();
const PORT = 4000;
app.use(cors());

//midlle ware
app.use(express.json())

//Available Route
app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.get("/", (req, res) => {
        res.send('bao singh')
})

app.get('/api/login', (req, res) =>{
    res.send('Hello login')
})

app.get('api/signup', (req, res) => {
    res.send('hello signup')
})

app.listen(PORT, () => {
    console.log(`Example app listening at localhost:${PORT}`)
})

