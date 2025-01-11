import express, { Request, Response } from "express"
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import { errorHandler } from "./utils/errorHandler";


dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());


app.use("/api/users", userRouter);

app.use("/", (req: Request, res: Response) => {
    res.send("what")
})
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})