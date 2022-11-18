import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes";

const app = express()

app.use(cors)


app.use('/api', authRoutes)

app.listen(8080);

