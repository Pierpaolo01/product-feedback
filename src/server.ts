import express from "express"
import "module-alias/register"
import {routes} from "@src/routes";

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(routes)

app.listen(8080, () => {
    console.log("listening on port 8080")
});
