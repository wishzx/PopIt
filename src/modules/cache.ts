import NodeCache from "node-cache";

// redis in production
const localCache = new NodeCache({ stdTTL: 25 });

export default localCache;
