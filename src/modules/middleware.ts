import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
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

export const errorHandler = (err: ApiError, req, res, next) => {
    console.error(err);
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
