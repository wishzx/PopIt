import { validationResult } from "express-validator";
/*
how to create custom middleware
const customLogger = (message) => (req,res,next) = {
    console.log(`Hello from ${message}`)
    next()
    }
*/
// app.use('/example', customLogger);

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("validation error: " + errors.array);
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next();
    }
};

enum ApiTypeError {
    auth = "auth",
    input = "input",
    email = "email",
    server = "server",
}
export type ApiError = Error & { type: ApiTypeError };

/*TODO add some tools in error handler
    prometheus,newrelic,jaeger,zipkin,node.js core metric
    @sentry/node,rollbar,airbrake.js,bugsnag,newrelic
    google analytics,mixpanel,piwik,segment.io,aplitude
*/
export const errorHandler = (err: ApiError, req, res, next) => {
    if (err.type === "auth") {
        res.status(401).json({ message: "unauthorized", type: err.type });
    } else if (err.type === "input") {
        res.status(400).json({ message: "invalid input", type: err.type });
    } else if (err.type === "email") {
        res.status(409).json({ message: "duplicate email", type: err.type });
    } else {
        res.status(500).json({ message: "server error", type: err.type });
    }
};
