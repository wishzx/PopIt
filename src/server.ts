import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { adminOnly, protect } from './modules/auth'
import { createNewUser, signIn} from './handlers/user'
import { errorHandler } from './modules/middleware'

const app = express()
/*
idea of what to add next : grpc, trpc, graphql
more testing 
maybe some background jobs, maybe do nest mvc 
*/


/*
how to create your middleware
const customLogger = (message) => (req,res,next) = {
    console.log(`Hello from ${message}`)
    next()
    }
*/
// app.use('/example', customLogger);


app.use(cors()) //control access to API (block IPs, methods, specific headers) - preflight check before making the actual request

//json web token vs sessions 
// you don't need to keep open a session, the client store the token on a cookie

app.use(morgan('dev'))//logger - datadog - sentry - segments
app.use(express.json()) // allow to receive json
app.use(express.urlencoded({extended: true})) // google.com?something=value&somethingelse=value -> {something :value, somethingelse:value}

app.post('/user', createNewUser) //TODO validate 
app.post('/signin', signIn) //TODO validate

app.use('/api/', protect, router);

app.get('/', (req, res) => {
    console.log("hello from express")
    res.status(200)
    res.json({ message: 'hello' })
})

//PLEASE DO NOT PUT ROUTES BELOW THIS ERROR HANDLER 
app.use(errorHandler)
// this only catches error in the main router, not in subrouters like routers.js
// this only catches sync errors if you dont belive me try to run this code
// 
/* app.get('/asyncError', (req,res)=>{
    setTimeout(()=>{
        throw new Error("oops")
    },1)
}) */
// the fix is to add next and do next(new Error("oops"))
// so every time you await on something you try catch(e) that and next(e)
// so that the handler belows can handle the error
/*TODO add some tools in error handler
    prometheus,newrelic,jaeger,zipkin,node.js core metric
    @sentry/node,rollbar,airbrake.js,bugsnag,newrelic
    google analytics,mixpanel,piwik,segment.io,aplitude
*/


export default app
