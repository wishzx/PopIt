import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
// configuration flexible
// we decouple stages and environments, this allow you to have a production env in your local machine
// STAGE=production npm run dev
const stage = process.env.STAGE || "local";

let envConfig;
if (stage === "production") {
    envConfig = require("./prod").default; //.default to interop with non es6 modules
} else if (stage === "testing") {
    envConfig = require("./testing").default;
} else if (stage === "staging") {
    envConfig = require("./staging").default;
} else {
    envConfig = require("./local").default;
}

const defaultConfig = {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    jwtSecret: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
    logging: false,
};

export default merge(defaultConfig, envConfig);
