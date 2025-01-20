import express, { Request, Response } from "express"
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import { errorHandler } from "./utils/errorHandler";
import postRouter from "./routes/post.route";
var cors = require('cors')
import passport from "passport";
import passportMiddleware from "./middlewares/passport";


dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json());

passportMiddleware(passport)

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


app.use("/", (req: Request, res: Response) => {
    res.send("what")
})
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})