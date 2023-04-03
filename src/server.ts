import express from "express";

const app = express();

/*
idea of what to add next : grpc, trpc, graphql
more testing 
maybe some background jobs
*/

import morgan from "morgan";
import cors from "cors";
//GLOBAL MIDDLEWARES
app.use(cors()); //control access to API (block IPs, methods, specific headers) - preflight check before making the actual request
app.use(morgan("dev")); //logger - datadog - sentry - segments
app.use(express.json()); // allow to receive json
app.use(express.urlencoded({ extended: true })); // google.com?something=value&somethingelse=value -> {something :value, somethingelse:value}

// hello message
app.get("/", (req, res) => {
    console.log("hello from express");
    res.status(200);
    res.json({ message: "hello" });
});
// docs
import swaggerUi from "swagger-ui-express";
const swaggerFile = require("./modules/docs/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//custom middlewares
import { adminOnly, protect } from "./modules/auth";
//custom errorhandler
import { errorHandler } from "./modules/middleware";

// public routes
import { publicRouter } from "./routes/public";
app.use("/", publicRouter);

// protected routes
import { protectedRouter } from "./routes/protected";
app.use("/", protect, protectedRouter);

// admin routes
import { adminRouter } from "./routes/admin";
app.use("/admin", protect, adminOnly, adminRouter);

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER
app.use(errorHandler);
// this only catches error in the main router, not in subrouters
// this only catches sync errors if you dont belive me try to run this code
//
/* app.get('/asyncError', (req,res)=>{
    setTimeout(()=>{
        throw new Error("oops")
    },1) //the fix is to add next and do next(new Error("oops"))
}) */

// so every time you await on something you must try catch(e) that and next(e)
// so that the next handler can handle the error

export default app;
